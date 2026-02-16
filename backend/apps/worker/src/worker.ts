import { Worker } from "bullmq";
import IORedis from "ioredis";
import dotenv from "dotenv";
import { QUEUE_NAMES, ScanJobPayload } from "@accessify/types";

dotenv.config();

const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: null,
  },
);

const worker = new Worker<ScanJobPayload>(
  QUEUE_NAMES.SCAN,
  async (job) => {
    console.log("Received job:", job.data);
  },
  { connection },
);

console.log("Worker started and listening...");
