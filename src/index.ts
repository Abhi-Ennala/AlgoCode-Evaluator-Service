import express from "express";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";

// import sampleQueueProducer from "./producers/sampleQueueProducer";
import SampleWorker from "./workers/sampleWorker";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.text());

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at :${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  // sampleQueueProducer('sampleJob',
  //   {
  //     name: 'Abhinav',
  //     company: 'Google',
  //     role: 'SDE 1'
  //   }
  // );

});
