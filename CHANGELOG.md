# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-03-17

### Added
- Initial release
- `useAesKey` hook for managing AES key initialization and encryption
- `AesProcessingView` component for displaying encryption processing state
- Secure storage integration using `expo-storage-universal`
- Crypto operations using `expo-crypto-universal`
- Vetkeys integration for asymmetric encryption
- AES key generation and management utilities

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
