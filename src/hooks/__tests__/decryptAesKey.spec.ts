import { describe, it, expect, vi, beforeEach } from 'vitest';
import { decryptAesKey } from '../decryptAesKey';
import { TransportSecretKey } from 'vetkeys-client-utils';
import { ibeDecrypt } from 'vetkeys-client-utils';

// Mock dependencies
vi.mock('vetkeys-client-utils', () => ({
  ibeDecrypt: vi.fn(),
  TransportSecretKey: vi.fn(),
}));

describe('decryptAesKey', () => {
  let mockEncryptedAesKey: Uint8Array;
  let mockPrincipal: Uint8Array;
  let mockEncryptedKey: Uint8Array;
  let mockPublicKey: Uint8Array;
  let mockTsk: TransportSecretKey;
  let mockDecryptedKey: Uint8Array;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(performance, 'now').mockImplementation(() => 1000);

    // Setup test data with 32-byte arrays
    mockEncryptedAesKey = new Uint8Array(Array(32).fill(1));
    mockPrincipal = new Uint8Array(Array(32).fill(2));
    mockEncryptedKey = new Uint8Array(Array(32).fill(3));
    mockPublicKey = new Uint8Array(Array(32).fill(4));
    mockDecryptedKey = new Uint8Array(Array(32).fill(5));
    mockTsk = new TransportSecretKey(new Uint8Array(Array(32).fill(6)));

    // Mock ibeDecrypt response
    vi.mocked(ibeDecrypt).mockResolvedValue(mockDecryptedKey);
  });

  it('should decrypt AES key and log performance', async () => {
    // Act
    const result = await decryptAesKey({
      encryptedAesKey: mockEncryptedAesKey,
      principal: mockPrincipal,
      encryptedKey: mockEncryptedKey,
      publicKey: mockPublicKey,
      tsk: mockTsk,
    });

    // Assert
    expect(ibeDecrypt).toHaveBeenCalledWith({
      ciphertext: mockEncryptedAesKey,
      principal: mockPrincipal,
      encryptedKey: mockEncryptedKey,
      publicKey: mockPublicKey,
      tsk: mockTsk,
    });
    expect(result).toEqual(mockDecryptedKey);
    expect(console.log).toHaveBeenCalledWith('Decrypting existing AES key');
    expect(console.log).toHaveBeenCalledWith(
      'Decrypting existing AES key took: 0ms',
    );
  });

  it('should propagate errors from ibeDecrypt', async () => {
    // Arrange
    const mockError = new Error('Failed to decrypt AES key');
    vi.mocked(ibeDecrypt).mockRejectedValue(mockError);

    // Act & Assert
    await expect(
      decryptAesKey({
        encryptedAesKey: mockEncryptedAesKey,
        principal: mockPrincipal,
        encryptedKey: mockEncryptedKey,
        publicKey: mockPublicKey,
        tsk: mockTsk,
      }),
    ).rejects.toThrow('Failed to decrypt AES key');
  });
});
