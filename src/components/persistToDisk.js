import fs from 'graceful-fs';
import { dirname } from 'path';

export default function persistToDisk(
  path,
  data,
  type = 'txt',
  method = 'write'
) {
  return new Promise((resolve, reject) => {
    const dir = dirname(path);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (method === 'write') {
      fs.writeFile(
        `${path}.${type}`,
        `${data}\r\n`,
        {
          flags: 'w',
        },
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve('Success');
          }
        }
      );
    } else if (method === 'append') {
      fs.appendFile(
        `${path}.${type}`,
        `${data}\r\n`,
        {
          flags: 'w',
        },
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve('Success');
          }
        }
      );
    }
  });
}
