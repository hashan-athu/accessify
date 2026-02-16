import "dotenv/config";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { QUEUE_NAMES, ScanJobPayload } from "@accessify/types";

const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: null,
  },
);

const worker = new Worker<ScanJobPayload>(
  QUEUE_NAMES.SCAN,
  async (job) => {
    console.log("Processing scan:", job.data.scanId, job.data.url);
  },
  { connection },
);

console.log("Worker started and listening...");
