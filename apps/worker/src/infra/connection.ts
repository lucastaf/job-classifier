import amqp from "amqplib";

export async function connectRabbitMQ() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL!
  );

  const channel = await connection.createChannel();

  return { connection, channel };
}