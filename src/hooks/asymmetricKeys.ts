import { AesBackend, AsymmetricKeysResult } from './useAesKey';

/**
 * Arguments for the asymmetricKeys function.
 */
type AsymmetricKeysArgs = {
  /** The AES backend instance to use for asymmetric key operations */
  backend: AesBackend;
  /** The transport public key used for asymmetric key generation */
  transportPublicKey: Uint8Array;
};

/**
 * Generates asymmetric keys using the provided AES backend and transport public key.
 * This function measures and logs the performance of the asymmetric key generation.
 *
 * @param {AsymmetricKeysArgs} args - The arguments for the function
 * @param {AesBackend} args.aesBackend - The AES backend instance to use
 * @param {Uint8Array} args.transportPublicKey - The transport public key
 * @returns {Promise<AsymmetricKeysResult>} A promise that resolves with the asymmetric keys result
 */
export const asymmetricKeys = async ({
  backend,
  transportPublicKey,
}: AsymmetricKeysArgs): Promise<AsymmetricKeysResult> => {
  const startTime = performance.now();
  const result = await backend.asymmetricKeys(transportPublicKey);
  console.log(
    `Getting asymmetric keys took: ${performance.now() - startTime}ms`,
  );

  return result;
};
