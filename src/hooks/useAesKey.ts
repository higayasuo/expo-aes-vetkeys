import { useEffect, useRef, useState, useCallback } from 'react';
import { Identity } from '@dfinity/agent';
import { CryptoModule } from 'expo-crypto-universal';
import { Storage, Uint8ArrayValueStorageWrapper } from 'expo-storage-universal';
import { prepareAesKey } from './prepareAesKey';
import { decryptAesKey } from './decryptAesKey';
import { encryptAesKey } from './encryptAesKey';
import { saveEncryptedAesKeyToBackend } from './saveEncryptedAesKeyToBackend';

export type AsymmetricKeysResult = {
  publicKey: Uint8Array;
  encryptedAesKey: Uint8Array | undefined;
  encryptedKey: Uint8Array | undefined;
};

export interface AesBackend {
  asymmetricKeys: (
    transportPublicKey: Uint8Array,
  ) => Promise<AsymmetricKeysResult>;

  asymmetricSaveEncryptedAesKey: (encryptedAesKey: Uint8Array) => Promise<void>;
}

type UseAesKeyArgs = {
  cryptoModule: CryptoModule;
  storage: Storage;
  identity: Identity | undefined;
  backend: AesBackend;
  aesRawKeyName?: string;
};

export const useAesKey = ({
  cryptoModule,
  storage,
  identity,
  backend,
  aesRawKeyName = 'aesRawKey',
}: UseAesKeyArgs) => {
  const [isProcessingAes, setIsProcessingAes] = useState(false);
  const aesErrorRef = useRef<unknown | undefined>(undefined);
  const aesRawKeyStorage = new Uint8ArrayValueStorageWrapper(
    storage,
    aesRawKeyName,
  );

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
