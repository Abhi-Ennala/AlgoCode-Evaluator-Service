import express from "express";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";

// import sampleQueueProducer from "./producers/sampleQueueProducer";
import SampleWorker from "./workers/sampleWorker";
import runPython from "./containers/runPythonDocker";

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

  const code = `
x = input()
y = input()
print("value of x is ", x)
print("value of y is ", y)
  `;


  const inputCase = `100
200
  `
  runPython(code, inputCase);

});
