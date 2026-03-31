// import Docker from 'dockerode';

import { PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';


async function runPython(code: string, inputTestCase: string) {
  const rawLogBugger: Buffer[] = [];

  console.log('Initialising a new python docker container');
  let runCommand = `echo '${code.replace(/'/g, `"\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `"\\"`)}' | python3 test.py`
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    '/bin/sh',
    '-c',
    runCommand
  ]);


  await pythonDockerContainer.start();

  console.log('Started the docker container');

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true //  whether the logs are streamed or returned as a string 
  }); 

  loggerStream.on('data', (chunk) => {
    rawLogBugger.push(chunk);
  });

  await new Promise((res) => {
    loggerStream.on('end', () => {
      console.log(rawLogBugger);
      const completeRawBuffer = Buffer.concat(rawLogBugger);
      const decodedStream = decodeDockerStream(completeRawBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });
  
  await pythonDockerContainer.remove();

}

export default runPython;