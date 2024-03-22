import crypto from "crypto";
import { StringEncrypter } from "@jmondi/string-encrypt-decrypt";

async function createKey() {
  const cryptoKey = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  const exportedKey = await crypto.subtle.exportKey("jwk", cryptoKey);

  return JSON.stringify(exportedKey);
}

async function createEncryptedString(cryptoString) {
  const stringEncrypter = await StringEncrypter.fromCryptoString(cryptoString);

  const encryptedString = await stringEncrypter.encrypt(
    JSON.stringify({
      url: "https://jasonraimondi.com",
      isFullHeight: true,
      forceReload: true,
    }),
  );

  return encryptedString;
}

async function main() {
  const CRYPTO_KEY = await createKey();
  const hash = await createEncryptedString(CRYPTO_KEY);

  return {
    CRYPTO_KEY,
    exampleUrl: `http://localhost:3039/?hash=${hash}`,
    hash,
  };
}

main().then(console.log);
