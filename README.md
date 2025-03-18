# expo-aes-vetkeys

An Expo library for managing AES encryption keys with vetkeys integration.

## Features

- AES key generation and management
- Secure storage integration using `expo-storage-universal`
- Crypto operations using `expo-crypto-universal`
- Vetkeys integration for asymmetric encryption
- React hook for easy AES key management
- Loading component for encryption processing state
- Performance monitoring for cryptographic operations

## Installation

```bash
npm install expo-aes-vetkeys
```

### Required Peer Dependencies

This package requires the following peer dependencies:

```bash
# For storage functionality
npx expo install @react-native-async-storage/async-storage
npx expo install expo-secure-store

# For crypto functionality
npx expo install expo-crypto
```

## Usage

### Hook Usage

```typescript
import { useAesKey } from 'expo-aes-vetkeys';

// Define your backend implementation
const backend = {
  asymmetricKeys: async (transportPublicKey: Uint8Array) => {
    // Implement your backend logic
    return {
      publicKey: new Uint8Array(),
      encryptedAesKey: undefined,
      encryptedKey: undefined,
    };
  },
  asymmetricSaveEncryptedAesKey: async (encryptedAesKey: Uint8Array) => {
    // Implement your backend logic
  },
};

// Use the hook in your component
const YourComponent = () => {
  const { isProcessingAes, aesError } = useAesKey({
    cryptoModule: yourCryptoModule, // Required: expo-crypto-universal CryptoModule
    storage: yourStorage, // Required: expo-storage-universal Storage
    identity: yourIdentity, // Optional: @dfinity/agent Identity
    backend, // Required: AesBackend implementation
    aesRawKeyName: 'customKeyName', // Optional: defaults to 'aesRawKey'
  });

  if (isProcessingAes) {
    return <AesProcessingView />;
  }

  if (aesError) {
    return <Text>Error: {aesError.message}</Text>;
  }

  return <Text>Ready!</Text>;
};
```

### Loading Component

```typescript
import { AesProcessingView } from 'expo-aes-vetkeys';

const YourComponent = () => {
  return <AesProcessingView />;
};
```

## API

### useAesKey

A React hook for managing AES key initialization and encryption.

#### Props

- `cryptoModule`: Required `expo-crypto-universal` CryptoModule instance
- `storage`: Required `expo-storage-universal` Storage instance
- `identity`: Optional `@dfinity/agent` Identity instance
- `backend`: Required object implementing the `AesBackend` interface
- `aesRawKeyName`: Optional string for customizing the storage key name

#### Returns

- `isProcessingAes`: Boolean indicating if AES key processing is in progress
- `aesError`: Any error that occurred during processing

### AesProcessingView

A React Native component that displays a loading state during AES key processing.

#### Features

- Centered loading indicator
- Informative status message
- Hint text for user feedback
- Responsive layout with max-width container
- iOS-style design with system colors

## Dependencies

### Main Dependencies

- `@dfinity/agent`: ^0.20.0
- `expo-crypto-universal`: ^0.1.0
- `expo-storage-universal`: ^0.1.0
- `vetkeys-client-utils`: ^0.1.1
- `react`: ^18.3.1
- `react-native`: ^0.76.7

### Peer Dependencies

#### Storage

- `@react-native-async-storage/async-storage`
- `expo-secure-store`

#### Crypto

- `expo-crypto`

## License

MIT
