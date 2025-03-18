import { ibeDecrypt, TransportSecretKey } from 'vetkeys-client-utils';

/**
 * Arguments for the decryptAesKey function.
 */
type DecryptAesKeyArgs = {
  /** The encrypted AES key to be decrypted */
  encryptedAesKey: Uint8Array;
  /** The principal's identifier in bytes */
  principal: Uint8Array;
  /** The encrypted key used in the IBE decryption process */
  encryptedKey: Uint8Array;
  /** The public key used in the IBE decryption process */
  publicKey: Uint8Array;
  /** The transport secret key instance */
  tsk: TransportSecretKey;
};

/**
 * Decrypts an AES key using Identity-Based Encryption (IBE).
 * This function measures and logs the performance of the decryption process.
 *
 * @param {DecryptAesKeyArgs} args - The arguments for the function
 * @param {Uint8Array} args.encryptedAesKey - The encrypted AES key to be decrypted
 * @param {Uint8Array} args.principal - The principal's identifier in bytes
 * @param {Uint8Array} args.encryptedKey - The encrypted key used in the IBE decryption process
 * @param {Uint8Array} args.publicKey - The public key used in the IBE decryption process
 * @param {TransportSecretKey} args.tsk - The transport secret key instance
 * @returns {Promise<Uint8Array>} A promise that resolves with the decrypted AES key
 */
export const decryptAesKey = async ({
  encryptedAesKey,
  principal,
  encryptedKey,
  publicKey,
  tsk,
}: DecryptAesKeyArgs) => {
  console.log('Decrypting existing AES key');
  const startTime = performance.now();
  const aesRawKey = await ibeDecrypt({
    ciphertext: encryptedAesKey,
    principal,
    encryptedKey,
    publicKey,
    tsk,
  });
  console.log(
    `Decrypting existing AES key took: ${performance.now() - startTime}ms`,
  );
  return aesRawKey;
};
