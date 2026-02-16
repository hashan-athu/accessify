// Queue Names
export const QUEUE_NAMES = {
  SCAN: "scan-queue",
} as const;

// Job Names
export const JOB_NAMES = {
  SCAN: "scan-job",
} as const;

// Scan Job Payload
export interface ScanJobPayload {
  scanId: string;
  url: string;
  requestedAt: string;
}

// Scan Job Result
export interface ScanJobResult {
  url: string;
  score: number;
  issues: number;
  completedAt: string;
}


