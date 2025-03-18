import { ibeEncrypt } from 'vetkeys-client-utils';

/**
 * Arguments for the encryptAesKey function.
 */
type EncryptAesKeyArgs = {
  /** The raw AES key to be encrypted */
  aesRawKey: Uint8Array;
  /** The principal's identifier in bytes */
  principal: Uint8Array;
  /** The public key used in the IBE encryption process */
  publicKey: Uint8Array;
  /** The random seed used for encryption */
  seed: Uint8Array;
};

/**
 * Encrypts an AES key using Identity-Based Encryption (IBE).
 * This function measures and logs the performance of the encryption process.
 *
 * @param {EncryptAesKeyArgs} args - The arguments for the function
 * @param {Uint8Array} args.aesRawKey - The raw AES key to be encrypted
 * @param {Uint8Array} args.principal - The principal's identifier in bytes
 * @param {Uint8Array} args.publicKey - The public key used in the IBE encryption process
 * @param {Uint8Array} args.seed - The random seed used for encryption
 * @returns {Promise<Uint8Array>} A promise that resolves with the encrypted AES key
 */
export const encryptAesKey = async ({
  aesRawKey,
  principal,
  publicKey,
  seed,
}: EncryptAesKeyArgs): Promise<Uint8Array> => {
  console.log('Encrypting AES key');
  const startTime = performance.now();
  const encryptedAesKey = await ibeEncrypt({
    data: aesRawKey,
    principal,
    publicKey,
    seed,
  });
  console.log(`Encrypting AES key took: ${performance.now() - startTime}ms`);
  return encryptedAesKey;
};
