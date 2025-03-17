# expo-aes-vetkeys

A React Native/Expo library for managing AES encryption keys with vetkeys integration.

## Features

- AES key generation and management
- Secure storage integration using `expo-storage-universal`
- Crypto operations using `expo-crypto-universal`
- Vetkeys integration for asymmetric encryption
- React hook for easy AES key management
- Loading component for encryption processing state

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
    identity: yourIdentity, // Optional: @dfinity/agent Identity
    backend,
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

- `identity`: Optional `@dfinity/agent` Identity instance
- `backend`: Object implementing the `AesBackend` interface

#### Returns

- `isProcessingAes`: Boolean indicating if AES key processing is in progress
- `aesError`: Any error that occurred during processing

### AesProcessingView

A React Native component that displays a loading state during AES key processing.

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
