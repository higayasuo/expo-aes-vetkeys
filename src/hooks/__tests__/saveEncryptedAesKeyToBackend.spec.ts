import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveEncryptedAesKeyToBackend } from '../saveEncryptedAesKeyToBackend';

describe('saveEncryptedAesKeyToBackend', () => {
  let mockBackend: {
    asymmetricSaveEncryptedAesKey: ReturnType<typeof vi.fn>;
  };
  let mockEncryptedAesKey: Uint8Array;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(performance, 'now').mockImplementation(() => 1000);

    // Setup test data with 32-byte array
    mockEncryptedAesKey = new Uint8Array(Array(32).fill(1));

    // Setup mock backend
    mockBackend = {
      asymmetricSaveEncryptedAesKey: vi.fn(),
    };
  });

  it('should save encrypted AES key to backend and log performance', async () => {
    // Act
    await saveEncryptedAesKeyToBackend({
      encryptedAesKey: mockEncryptedAesKey,
      backend: mockBackend as any,
    });

    // Assert
    expect(mockBackend.asymmetricSaveEncryptedAesKey).toHaveBeenCalledWith(
      mockEncryptedAesKey,
    );
    expect(console.log).toHaveBeenCalledWith(
      'Saving encrypted AES key to backend',
    );
    expect(console.log).toHaveBeenCalledWith(
      'Saving encrypted AES key to backend took: 0ms',
    );
  });

  it('should propagate errors from backend', async () => {
    // Arrange
    const mockError = new Error('Failed to save encrypted AES key');
    mockBackend.asymmetricSaveEncryptedAesKey.mockRejectedValue(mockError);

    // Act & Assert
    await expect(
      saveEncryptedAesKeyToBackend({
        encryptedAesKey: mockEncryptedAesKey,
        backend: mockBackend as any,
      }),
    ).rejects.toThrow('Failed to save encrypted AES key');
  });
});
