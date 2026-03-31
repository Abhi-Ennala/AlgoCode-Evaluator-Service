import Docker from 'dockerode';

const docker = new Docker();

export async function ensureImage(image: string) {
  try {
    await docker.getImage(image).inspect();
  } catch (error) {
    console.log('Pulling image:', image);

    const stream = await docker.pull(image);

    await new Promise((resolve, reject) => {
      docker.modem.followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    });
  }
}