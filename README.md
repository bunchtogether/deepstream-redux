# Deepstream Signed Record

## Usage

```js
import libp2pCrypto from 'libp2p-crypto';
import deepstream from 'deepstream.io-client-js';
import signedRecord from 'deepstream-signed-record';

const client = deepstream("127.0.0.1:6020").login();

const run = async () => {
  const privateKey = await new Promise((resolve, reject) => {
    libp2pCrypto.keys.generateKeyPair('RSA', 1024, (error, key) => {
      if (error) {
        reject(error);
      } else {
        resolve(key);
      }
    });
  });
  // Optional default value
  const defaultValue = {
    example: "example"
  };
  const record = signedRecord(client, "example-record-name", privateKey, defaultValue);
  record.subscribe("example-record-name", (value) => {
    console.log(value);
  });
  await record.set("example-record-name", "example-record-value");
  await record.discard();
}

run();
```

