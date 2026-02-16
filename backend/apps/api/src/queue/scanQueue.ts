import { Queue } from "bullmq";
import IORedis from "ioredis";
import { QUEUE_NAMES } from "@accessify/types";

const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

export const scanQueue = new Queue(QUEUE_NAMES.SCAN, {
  connection,
});
