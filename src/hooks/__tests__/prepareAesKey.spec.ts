import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prepareAesKey } from '../prepareAesKey';
import { TransportSecretKey } from 'vetkeys-client-utils';
import { asymmetricKeys } from '../asymmetricKeys';

// Mock dependencies
vi.mock('../asymmetricKeys');

describe('prepareAesKey', () => {
  let mockBackend: {
    asymmetricKeys: ReturnType<typeof vi.fn>;
  };
  let mockTskSeed: Uint8Array;
  let mockTransportPublicKey: Uint8Array;
  let mockPublicKey: Uint8Array;
  let mockEncryptedAesKey: Uint8Array;
  let mockEncryptedKey: Uint8Array;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup test data with 32-byte arrays
    mockTskSeed = new Uint8Array(Array(32).fill(1));
    mockTransportPublicKey = new Uint8Array(Array(32).fill(2));
    mockPublicKey = new Uint8Array(Array(32).fill(3));
    mockEncryptedAesKey = new Uint8Array(Array(32).fill(4));
    mockEncryptedKey = new Uint8Array(Array(32).fill(5));

    // Mock TransportSecretKey
    const mockTsk = {
      public_key: vi.fn().mockReturnValue(mockTransportPublicKey),
    };
    vi.spyOn(TransportSecretKey.prototype, 'public_key').mockImplementation(
      mockTsk.public_key,
    );

    // Setup mock backend
    mockBackend = {
      asymmetricKeys: vi.fn(),
    };

    // Mock asymmetricKeys response
    vi.mocked(asymmetricKeys).mockResolvedValue({
      publicKey: mockPublicKey,
      encryptedAesKey: mockEncryptedAesKey,
      encryptedKey: mockEncryptedKey,
    });
  });

  it('should prepare AES key with all required data', async () => {
    // Act
    const result = await prepareAesKey({
      backend: mockBackend as any,
      tskSeed: mockTskSeed,
    });

    // Assert
    expect(result).toEqual({
      tsk: expect.any(TransportSecretKey),
      publicKey: mockPublicKey,
      encryptedAesKey: mockEncryptedAesKey,
      encryptedKey: mockEncryptedKey,
    });
    expect(TransportSecretKey.prototype.public_key).toHaveBeenCalled();
    expect(asymmetricKeys).toHaveBeenCalledWith({
      backend: mockBackend,
      transportPublicKey: mockTransportPublicKey,
    });
  });

  it('should handle case when encrypted keys are undefined', async () => {
    // Arrange
    vi.mocked(asymmetricKeys).mockResolvedValue({
      publicKey: mockPublicKey,
      encryptedAesKey: undefined,
      encryptedKey: undefined,
    });

    // Act
    const result = await prepareAesKey({
      backend: mockBackend as any,
      tskSeed: mockTskSeed,
    });

    // Assert
    expect(result).toEqual({
      tsk: expect.any(TransportSecretKey),
      publicKey: mockPublicKey,
      encryptedAesKey: undefined,
      encryptedKey: undefined,
    });
  });

  it('should propagate errors from asymmetricKeys', async () => {
    // Arrange
    const mockError = new Error('Failed to generate asymmetric keys');
    vi.mocked(asymmetricKeys).mockRejectedValue(mockError);

    // Act & Assert
    await expect(
      prepareAesKey({
        backend: mockBackend as any,
        tskSeed: mockTskSeed,
      }),
    ).rejects.toThrow('Failed to generate asymmetric keys');
  });
});
