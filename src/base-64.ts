import * as md5 from 'md5';

export class Base64 {
  static encode(str) {
    return md5(str);
  }
  
  static decode(str) {
    return Buffer.from(str, 'base64').toString('ascii');
  }
}
