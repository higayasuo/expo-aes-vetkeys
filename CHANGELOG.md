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
- `AesProcessingView` component for displaying encryption processing state
  - Centered loading indicator
  - Informative status message
  - Hint text for user feedback
  - Responsive layout with max-width container
  - iOS-style design with system colors
- Secure storage integration using `expo-storage-universal`
  - Support for custom storage key names
  - Secure storage of AES keys
- Crypto operations using `expo-crypto-universal`
  - Random bytes generation
  - Cryptographic operations
- Vetkeys integration for asymmetric encryption
  - Support for transport secret keys
  - Identity-based encryption/decryption
- AES key generation and management utilities
  - Key generation
  - Key encryption/decryption
  - Backend integration

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
