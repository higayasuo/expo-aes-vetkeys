# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-03-17

### Added

- Initial release
- `useAesKey` hook for managing AES key initialization and encryption
  - Support for identity-based encryption with vetkeys
  - Automatic AES key generation and storage
  - Performance monitoring for cryptographic operations
  - Error handling and state management
  - Comprehensive TypeScript types and JSDoc documentation
- `AesProcessingView` component for displaying encryption processing state
  - Centered loading indicator with iOS-style blue color (#007AFF)
  - Informative status message "Preparing Encryption..."
  - Hint text "This may take a moment..."
  - Responsive layout with max-width container (400px)
  - Clean white background with proper padding
  - Vertically centered content with -80px top margin for visual balance
- `AesRawKeyStorage` class for specialized AES key storage
  - Extends `Uint8ArrayValueStorageWrapper` for type-safe storage
  - Uses 'aesRawKey' as the default storage key
  - Provides specific functionality for AES key storage
- Utility functions for AES key operations
  - `asymmetricKeys`: Generates asymmetric keys with performance monitoring
  - `decryptAesKey`: Decrypts AES keys using IBE with performance monitoring
  - `encryptAesKey`: Encrypts AES keys using IBE with performance monitoring
  - `prepareAesKey`: Prepares AES key for encryption/decryption
  - `saveEncryptedAesKeyToBackend`: Saves encrypted AES key with performance monitoring
- Secure storage integration using `expo-storage-universal`
  - Support for custom storage key names
  - Secure storage of AES keys
  - Type-safe storage wrapper implementation
- Crypto operations using `expo-crypto-universal`
  - Random bytes generation
  - Cryptographic operations
  - Performance monitoring for all operations
- Vetkeys integration for asymmetric encryption
  - Support for transport secret keys
  - Identity-based encryption/decryption
  - Performance monitoring for all operations
- Comprehensive TypeScript types and JSDoc documentation
  - Detailed type definitions for all components
  - Function and parameter documentation
  - Return type documentation
  - Performance monitoring documentation

### Dependencies

#### Main Dependencies

- `@dfinity/agent`: ^0.20.0
- `expo-crypto-universal`: ^0.1.0
- `expo-storage-universal`: ^0.1.0
- `vetkeys-client-utils`: ^0.1.1
- `react`: ^18.3.1
- `react-native`: ^0.76.7

#### Peer Dependencies

##### Storage

- `@react-native-async-storage/async-storage`
- `expo-secure-store`

##### Crypto

- `expo-crypto`
