import { Uint8ArrayValueStorageWrapper, Storage } from 'expo-storage-universal';

/**
 * AesRawKeyStorage is a specialized storage wrapper for AES raw keys.
 * It extends the Uint8ArrayValueStorageWrapper to provide specific functionality
 * for storing AES raw keys.
 */
export class AesRawKeyStorage extends Uint8ArrayValueStorageWrapper {
  /**
   * Creates an instance of AesRawKeyStorage.
   *
   * @param {Storage} storage - The storage instance to be used for storing the AES raw key.
   */
  constructor(storage: Storage) {
    super(storage, 'aesRawKey');
  }
}
