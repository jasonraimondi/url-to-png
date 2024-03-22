## Generating an Encryption Key

To enable encryption, first generate a CRYPTO_KEY. You can do this in your browser console using the following JavaScript code:

```js
async function createKey() {
  const cryptoKey = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  const exportedKey = await window.crypto.subtle.exportKey("jwk", cryptoKey);

  return JSON.stringify(exportedKey);
}

createKey().then(console.log);

// {"alg":"A256GCM","ext":true,"k":"3A.......
```

## Setting the Encryption Key

Set the generated key as your server `CRYPTO_KEY`. This key will be used for encryption and decryption. Wrap the `CRYPTO_KEY` environment variable in single quotes `'{}'`.

```env
CRYPTO_KEY='{"alg":"A256GCM","ext":true,"k":"3A.......'
```

## Encrypted Requests

When the `CRYPTO_KEY` is set, the server will only receive encrypted requests. An encrypted request can be created using the following code:

```js
import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";

async function createEncryptedString() {
  const stringEncrypter = await StringEncrypter.fromCryptoString(process.env.CRYPTO_STRING);

  const encryptedString = await stringEncrypter.encrypt(
    JSON.stringify({
      url: "https://jasonraimondi.com",
      isFullHeight: true,
      forceReload: true,
    }),
  );

  return encryptedString;
}

createEncryptedString().then(console.log);
```

## Example

An example of using encryption can be found in the [example-encryption.js](https://github.com/jasonraimondi/url-to-png/blob/main/example-encryption.js) file.

Run the example using the following command:

```bash
node example-encryption.js

// {
//   CRYPTO_KEY: '{"key_ops":["encrypt","decrypt"],"ext":true,"kty":"oct","k":"M8IkabUR_Nhj3B64AXWB2msQsvCj535krL6gR6Z0LEI","alg":"A256GCM"}',
//   exampleUrl: 'http://localhost:3039/?hash=str-enc:DbRfvBa61jg4FU4G75xkvVKS8g/MG2FfKfTTNwVYH4F+DpRBgDFyLyow0yOHgocpSFeFfdgJaet/JwJM+KtmuAcYbSZRJ1ENGNmcyhwZiWfhLdOAyhUlLlu8:sCzLlpiBye9ISIG3',
//   hash: 'str-enc:DbRfvBa61jg4FU4G75xkvVKS8g/MG2FfKfTTNwVYH4F+DpRBgDFyLyow0yOHgocpSFeFfdgJaet/JwJM+KtmuAcYbSZRJ1ENGNmcyhwZiWfhLdOAyhUlLlu8:sCzLlpiBye9ISIG3'
// }
```

This formatted version separates the README into logical sections, making it easier to understand and follow the instructions for generating an encryption key, setting it up, and making encrypted requests.
