import { useEffect, useRef, useState, useCallback } from 'react';
import { Identity } from '@dfinity/agent';
import { CryptoModule } from 'expo-crypto-universal';
import { Uint8ArrayValueStorageWrapper } from 'expo-storage-universal';
import { prepareAesKey } from './prepareAesKey';
import { decryptAesKey } from './decryptAesKey';
import { encryptAesKey } from './encryptAesKey';
import { saveEncryptedAesKeyToBackend } from './saveEncryptedAesKeyToBackend';
import { AesBackend } from '../types';

/**
 * Arguments required for the useAesKey hook
 */
type UseAesKeyArgs = {
  /** The crypto module for cryptographic operations */
  cryptoModule: CryptoModule;
  /** Storage wrapper for AES key persistence */
  aesRawKeyStorage: Uint8ArrayValueStorageWrapper;
  /** The user's identity, if authenticated */
  identity: Identity | undefined;
  /** The backend service for key operations */
  backend: AesBackend;
};

/**
 * Hook for managing AES key generation, encryption, and storage
 *
 * This hook handles the lifecycle of AES keys:
 * 1. Generates new AES keys when no identity is present
 * 2. Retrieves and decrypts existing AES keys when an identity is present
 * 3. Encrypts and saves new AES keys when needed
 *
 * @param args - The arguments required for AES key management
 * @returns Object containing processing state and any errors
 */
export const useAesKey = ({
  cryptoModule,
  aesRawKeyStorage,
  identity,
  backend,
}: UseAesKeyArgs) => {
  const [isProcessingAes, setIsProcessingAes] = useState(false);
  const aesErrorRef = useRef<unknown | undefined>(undefined);

  const initAesKey = useCallback(async () => {
    try {
      aesErrorRef.current = undefined;
      setIsProcessingAes(true);

      if (!identity) {
        console.log('Generating an AES key');
        const aesRawKey = cryptoModule.getRandomBytes(32);

        console.log('Saving locally an AES key');
        await aesRawKeyStorage.save(aesRawKey);
        return;
      }

      const principal = identity.getPrincipal().toUint8Array();
      const tskSeed = cryptoModule.getRandomBytes(32);
      const { tsk, publicKey, encryptedAesKey, encryptedKey } =
        await prepareAesKey({
          backend,
          tskSeed,
        });

      if (encryptedAesKey && encryptedKey) {
        const aesRawKey = await decryptAesKey({
          encryptedAesKey,
          principal,
          encryptedKey,
          publicKey,
          tsk,
        });

        console.log('Saving locally existing AES key');
        await aesRawKeyStorage.save(aesRawKey);
        return;
      } else {
        console.log('Generating an AES key');
        const aesRawKey = cryptoModule.getRandomBytes(32);

        console.log('Saving locally an AES key');
        await aesRawKeyStorage.save(aesRawKey);

        const encryptedAesKey = await encryptAesKey({
          aesRawKey,
          principal,
          publicKey,
          seed: tskSeed,
        });

        await saveEncryptedAesKeyToBackend({
          encryptedAesKey,
          backend,
        });
      }
    } catch (err) {
      console.error('Failed to initialize AES key:', err);
      aesErrorRef.current = err;
    } finally {
      setIsProcessingAes(false);
    }
  }, [identity]);

  // Initialize on first load and when identity changes
  useEffect(() => {
    initAesKey();
  }, [identity, initAesKey]);

  return {
    isProcessingAes,
    aesError: aesErrorRef.current,
  };
};
