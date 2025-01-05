import dotenv from 'dotenv';
export function getEnvs() {
  const parsedConfig = {};
  const envFilePaths = ['.env', `.env.${process.env.NODE_ENV}`];
  envFilePaths.forEach((envFilePath) => {
    try {
      const config = dotenv.config({ path: envFilePath }).parsed;
      Object.assign(parsedConfig, config);
    } catch (error) {
      console.error(`Error loading ${envFilePath} file`);
    }
  });
  return parsedConfig;
}
