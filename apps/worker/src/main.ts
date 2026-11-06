import "dotenv/config";

import { connectRabbitMQ } from "./infra/connection.js";
import { startConsumer } from "./infra/consumer.js";

async function bootstrap() {
  const { connection, channel } = await connectRabbitMQ();

  await startConsumer(channel, "<<queue-name>>");

  console.log("Worker iniciado!");

  const shutdown = async () => {
    await channel.close();
    await connection.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch(console.error);