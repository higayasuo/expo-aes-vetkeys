import { TransportSecretKey } from 'vetkeys-client-utils';
import { AesBackend } from './useAesKey';
import { asymmetricKeys } from './asymmetricKeys';

type PrepareAesKeyArgs = {
  backend: AesBackend;
  tskSeed: Uint8Array;
};

type PrepareAesKeyResult = {
  tsk: TransportSecretKey;
  publicKey: Uint8Array;
  encryptedAesKey: Uint8Array | undefined;
  encryptedKey: Uint8Array | undefined;
};

export const prepareAesKey = async ({
  backend,
  tskSeed,
}: PrepareAesKeyArgs): Promise<PrepareAesKeyResult> => {
  const tsk = new TransportSecretKey(tskSeed);
  const transportPublicKey = tsk.public_key();

  const { publicKey, encryptedAesKey, encryptedKey } = await asymmetricKeys({
    backend,
    transportPublicKey,
  });

  return {
    tsk,
    publicKey,
    encryptedAesKey,
    encryptedKey,
  };
};
