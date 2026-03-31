import Docker from 'dockerode';
import { ensureImage } from './ensureImage';

async function createContainer(imageName: string, cmdExe: Array<string>){
  const docker = new Docker();

  await ensureImage(imageName);

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExe,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    OpenStdin: true // keep the intput stream open even no interaction is there
  });

  return container;
}

export default createContainer;