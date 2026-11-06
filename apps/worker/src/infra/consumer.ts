import { Channel } from "amqplib";
import { processMessage } from "../worker/index.js";

export async function startConsumer(channel: Channel, queue: string) {

  await channel.assertQueue(queue, {
    durable: true
  });

  channel.prefetch(
    Number(process.env.RABBITMQ_PREFETCH ?? 5)
  );

  await channel.consume(queue, async (message) => {
    if (!message) return;

    try {
      const data = JSON.parse(
        message.content.toString()
      );

      await processMessage(data);

      channel.ack(message);
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);

      channel.nack(message, false, false);
    }
  }, {
    noAck: false
  });
}