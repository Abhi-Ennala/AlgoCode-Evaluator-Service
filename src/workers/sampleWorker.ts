import { Job, Worker } from "bullmq";

import SampleJob from "../jobs/sampleJob";
import { redisConfig } from "../config/redisConfig";

export default function SampleWorker(queueName: string){
  console.log("Worker has been setup");
  new Worker(
    queueName,
    async(job: Job) => {
      if(job.name === 'sampleJob'){
        console.log(`Worker picked up ${job.name} from ${job.queueName}`);
        const sampleJob = new SampleJob(job.data);
        sampleJob.handle(job);
      }
    },
    {
      connection: redisConfig
    }
  );
}
