import { Job } from "bullmq";

export interface Ijob {
  name: string;
  payload?: Record<string, any>;
  handle: (job?: Job) => void;
  failed: (job?: Job) => void;
}
 