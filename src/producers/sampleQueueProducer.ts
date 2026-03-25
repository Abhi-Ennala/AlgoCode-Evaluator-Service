import sampleQueue from "../queues/sampleQueue";

export default async function(jobName: string, payload: Record<string, any>){
  setTimeout(async () => {
    await sampleQueue.add(jobName, payload);
    console.log('Job has been added');
  }, 10000);
}