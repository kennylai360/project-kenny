import packageJson from '../../package.json';

export const environment = {
  appVersion: packageJson.version,
  coinCapApi: 'https://m2lkcntk23.execute-api.eu-west-2.amazonaws.com/test',
  production: false
};
 