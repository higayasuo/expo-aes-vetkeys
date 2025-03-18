import { describe, it, expect, vi, beforeEach } from 'vitest';
import { encryptAesKey } from '../encryptAesKey';
import { ibeEncrypt } from 'vetkeys-client-utils';

// Mock dependencies
vi.mock('vetkeys-client-utils', () => ({
  ibeEncrypt: vi.fn(),
}));

describe('encryptAesKey', () => {
  let mockAesRawKey: Uint8Array;
  let mockPrincipal: Uint8Array;
  let mockPublicKey: Uint8Array;
  let mockSeed: Uint8Array;
  let mockEncryptedKey: Uint8Array;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(performance, 'now').mockImplementation(() => 1000);

    // Setup test data with 32-byte arrays
    mockAesRawKey = new Uint8Array(Array(32).fill(1));
    mockPrincipal = new Uint8Array(Array(32).fill(2));
    mockPublicKey = new Uint8Array(Array(32).fill(3));
    mockSeed = new Uint8Array(Array(32).fill(4));
    mockEncryptedKey = new Uint8Array(Array(32).fill(5));

    // Mock ibeEncrypt response
    vi.mocked(ibeEncrypt).mockResolvedValue(mockEncryptedKey);
  });

  it('should encrypt AES key and log performance', async () => {
    // Act
    const result = await encryptAesKey({
      aesRawKey: mockAesRawKey,
      principal: mockPrincipal,
      publicKey: mockPublicKey,
      seed: mockSeed,
    });

    // Assert
    expect(ibeEncrypt).toHaveBeenCalledWith({
      data: mockAesRawKey,
      principal: mockPrincipal,
      publicKey: mockPublicKey,
      seed: mockSeed,
    });
    expect(result).toEqual(mockEncryptedKey);
    expect(console.log).toHaveBeenCalledWith('Encrypting AES key');
    expect(console.log).toHaveBeenCalledWith('Encrypting AES key took: 0ms');
  });

  it('should propagate errors from ibeEncrypt', async () => {
    // Arrange
    const mockError = new Error('Failed to encrypt AES key');
    vi.mocked(ibeEncrypt).mockRejectedValue(mockError);

    // Act & Assert
    await expect(
      encryptAesKey({
        aesRawKey: mockAesRawKey,
        principal: mockPrincipal,
        publicKey: mockPublicKey,
        seed: mockSeed,
      }),
    ).rejects.toThrow('Failed to encrypt AES key');
  });
});
