# expo-aes-vetkeys

An Expo library for managing AES encryption keys with vetkeys integration.

## Features

- AES key generation and management with Identity-Based Encryption (IBE)
- Secure storage integration using `expo-storage-universal`
- Crypto operations using `expo-crypto-universal`
- Vetkeys integration for asymmetric encryption
- React hook for easy AES key management
- Loading component for encryption processing state
- Performance monitoring for cryptographic operations
- Comprehensive TypeScript types and JSDoc documentation

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

# For vetkeys functionality
npm install vetkeys-client-utils
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
    aesRawKeyStorage: yourStorage, // Required: Uint8ArrayValueStorageWrapper
    identity: yourIdentity, // Optional: @dfinity/agent Identity
    backend, // Required: AesBackend implementation
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

The `AesProcessingView` component provides a user-friendly loading state during AES key processing operations. It's designed to be used with the `useAesKey` hook to display the processing state.

```typescript
import { AesProcessingView } from 'expo-aes-vetkeys';

// Basic usage
const YourComponent = () => {
  return <AesProcessingView />;
};

// With useAesKey hook
const YourComponent = () => {
  const { isProcessingAes } = useAesKey({
    // ... hook configuration
  });

  if (isProcessingAes) {
    return <AesProcessingView />;
  }

  return <Text>Ready!</Text>;
};
```

The component displays:

- A centered loading spinner in iOS-style blue (#007AFF)
- "Preparing Encryption..." status message
- "This may take a moment..." hint text
- Clean white background with proper padding
- Responsive layout that works on both mobile and web

## API

### useAesKey

A React hook for managing AES key initialization and encryption.

#### Props

- `cryptoModule`: Required `expo-crypto-universal` CryptoModule instance for cryptographic operations
- `aesRawKeyStorage`: Required `Uint8ArrayValueStorageWrapper` instance for key persistence
- `identity`: Optional `@dfinity/agent` Identity instance for authenticated operations
- `backend`: Required object implementing the `AesBackend` interface

#### Returns

- `isProcessingAes`: Boolean indicating if AES key processing is in progress
- `aesError`: Any error that occurred during processing

### AesProcessingView

A React Native component that displays a loading state during AES key processing.

#### Features

- Centered loading indicator with iOS-style blue color (#007AFF)
- Informative status message "Preparing Encryption..."
- Hint text "This may take a moment..."
- Responsive layout with max-width container (400px)
- Clean white background with proper padding
- Vertically centered content with -80px top margin for visual balance

### AesRawKeyStorage

A specialized storage wrapper for AES raw keys.

#### Features

- Extends `Uint8ArrayValueStorageWrapper` for type-safe storage
- Uses 'aesRawKey' as the default storage key
- Provides specific functionality for AES key storage

### Utility Functions

#### asymmetricKeys

- Generates asymmetric keys using the provided backend
- Measures and logs performance of key generation
- Returns `AsymmetricKeysResult` with public key and encrypted keys

#### decryptAesKey

- Decrypts AES keys using Identity-Based Encryption (IBE)
- Measures and logs performance of decryption
- Requires principal, encrypted key, public key, and transport secret key

#### encryptAesKey

- Encrypts AES keys using Identity-Based Encryption (IBE)
- Measures and logs performance of encryption
- Requires raw AES key, principal, public key, and seed

#### prepareAesKey

- Prepares AES key for encryption/decryption
- Creates transport secret key from seed
- Retrieves asymmetric keys from backend

#### saveEncryptedAesKeyToBackend

- Saves encrypted AES key to backend
- Measures and logs performance of save operation

## Dependencies

### Main Dependencies

- `@dfinity/agent`: ^0.20.0
- `expo-crypto-universal`: ^0.1.0
- `expo-storage-universal`: ^0.1.0
- `react`: ^18.3.1
- `react-native`: ^0.76.7

### Peer Dependencies

#### Storage

- `@react-native-async-storage/async-storage`
- `expo-secure-store`

#### Crypto

- `expo-crypto`

#### Vetkeys

- `vetkeys-client-utils`: ^0.1.1

## License

MIT
