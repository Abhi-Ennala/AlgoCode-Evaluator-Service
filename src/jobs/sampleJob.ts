import { Job } from "bullmq";
import { Ijob } from "../types/bullMqJobDef";

export default class SampleJob implements Ijob {
  name: string;
  payload: Record<string, any>;

  constructor(payload: Record<string, any>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = (job?: Job) => {
    console.log("Job Handler called");
    if(job){
      console.log(job.name, job.id, job.data);
    }
  };

  failed = (job?: Job) => {
    console.log("Job failed");
    if (job) {
      console.log(job.id);
    }
  };
}
