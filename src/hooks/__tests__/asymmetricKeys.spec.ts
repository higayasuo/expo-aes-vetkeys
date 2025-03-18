import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asymmetricKeys } from '../asymmetricKeys';
import { AsymmetricKeysResult } from '../useAesKey';

describe('asymmetricKeys', () => {
  let mockAesBackend: {
    asymmetricKeys: ReturnType<typeof vi.fn>;
  };
  let mockTransportPublicKey: Uint8Array;
  let mockResult: AsymmetricKeysResult;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(performance, 'now').mockImplementation(() => 1000);

    // Setup test data
    mockTransportPublicKey = new Uint8Array([1, 2, 3]);
    mockResult = {
      publicKey: new Uint8Array([4, 5, 6]),
      encryptedAesKey: new Uint8Array([7, 8, 9]),
      encryptedKey: new Uint8Array([10, 11, 12]),
    };

    // Setup mock backend
    mockAesBackend = {
      asymmetricKeys: vi.fn().mockResolvedValue(mockResult),
    };
  });

  it('should generate asymmetric keys and log performance', async () => {
    // Act
    const result = await asymmetricKeys({
      backend: mockAesBackend as any,
      transportPublicKey: mockTransportPublicKey,
    });

    // Assert
    expect(mockAesBackend.asymmetricKeys).toHaveBeenCalledWith(
      mockTransportPublicKey,
    );
    expect(result).toEqual(mockResult);
    expect(console.log).toHaveBeenCalledWith(
      'Getting asymmetric keys took: 0ms',
    );
  });

  it('should propagate errors from the backend', async () => {
    // Arrange
    const mockError = new Error('Failed to generate asymmetric keys');
    mockAesBackend.asymmetricKeys.mockRejectedValue(mockError);

    // Act & Assert
    await expect(
      asymmetricKeys({
        backend: mockAesBackend as any,
        transportPublicKey: mockTransportPublicKey,
      }),
    ).rejects.toThrow('Failed to generate asymmetric keys');
  });
});
