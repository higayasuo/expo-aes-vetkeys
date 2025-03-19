/**
 * Result type for asymmetric key operations
 */
export type AsymmetricKeysResult = {
  /** The public key used for encryption */
  publicKey: Uint8Array;
  /** The encrypted AES key if it exists */
  encryptedAesKey: Uint8Array | undefined;
  /** The encrypted key if it exists */
  encryptedKey: Uint8Array | undefined;
};

/**
 * Interface defining the backend operations required for AES key management
 */
export interface AesBackend {
  /**
   * Retrieves asymmetric keys for encryption/decryption
   * @param transportPublicKey - The public key used for transport
   * @returns Promise resolving to the asymmetric keys result
   */
  asymmetricKeys: (
    transportPublicKey: Uint8Array,
  ) => Promise<AsymmetricKeysResult>;

  /**
   * Saves an encrypted AES key to the backend
   * @param encryptedAesKey - The encrypted AES key to save
   * @returns Promise that resolves when the key is saved
   */
  asymmetricSaveEncryptedAesKey: (encryptedAesKey: Uint8Array) => Promise<void>;
}
