import { Router } from "express";
import { scanQueue } from "../queue/scanQueue";
import { JOB_NAMES, ScanJobPayload } from "@accessify/types";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const scan = await prisma.scan.create({
    data: {
      url,
      requestedAt: new Date(),
      status: "PENDING",
    },
  });

  const payload: ScanJobPayload = {
    scanId: scan.id,
    url,
    requestedAt: scan.requestedAt.toISOString(),
  };

  const job = await scanQueue.add(JOB_NAMES.SCAN, payload);

  return res.status(202).json({
    message: "Scan job queued",
    jobId: job.id,
  });
});

export default router;
