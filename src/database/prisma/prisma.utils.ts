export const PROTOCALREGEX = /^(.*?):\/\//;

export function getDBType(url: string) {
  const matches = url.match(PROTOCALREGEX);
  const protocol = matches ? matches[1] : 'file';

  return protocol === 'file' ? 'sqlite' : protocol;
}
