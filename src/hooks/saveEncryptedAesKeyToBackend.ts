import { AesBackend } from '../types';

/**
 * Arguments for the saveEncryptedAesKeyToBackend function.
 */
type SaveEncryptedAesKeyToBackendArgs = {
  /** The encrypted AES key to be saved */
  encryptedAesKey: Uint8Array;
  /** The backend instance to save the encrypted AES key */
  backend: AesBackend;
};

/**
 * Saves an encrypted AES key to the backend.
 * This function measures and logs the performance of the save operation.
 *
 * @param {SaveEncryptedAesKeyToBackendArgs} args - The arguments for the function
 * @param {Uint8Array} args.encryptedAesKey - The encrypted AES key to be saved
 * @param {AesBackend} args.backend - The backend instance to save the encrypted AES key
 * @returns {Promise<void>} A promise that resolves when the encrypted AES key is saved
 */
export const saveEncryptedAesKeyToBackend = async ({
  encryptedAesKey,
  backend,
}: SaveEncryptedAesKeyToBackendArgs) => {
  console.log('Saving encrypted AES key to backend');
  const startTime = performance.now();
  await backend.asymmetricSaveEncryptedAesKey(encryptedAesKey);
  console.log(
    `Saving encrypted AES key to backend took: ${
      performance.now() - startTime
    }ms`,
  );
};
