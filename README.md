# a-dex-sdk

[![Unit Tests](https://github.com/A-DEX/a-dex-sdk/workflows/Unit%20Tests/badge.svg)](https://github.com/A-DEX/a-dex-sdk/actions?query=workflow%3A%22Unit+Tests%22)
[![Lint](https://github.com/A-DEX/a-dex-sdk/workflows/Lint/badge.svg)](https://github.com/A-DEX/a-dex-sdk/actions?query=workflow%3ALint)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm version](https://img.shields.io/npm/v/@a-dex/a-dex-sdk/latest.svg)](https://www.npmjs.com/package/@a-dex/a-dex-sdk/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@a-dex/a=dex-sdk/latest.svg)](https://bundlephobia.com/result?p=@a-dex/a-dex-sdk@latest)

## Usage

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm install @a-dex/a-dex-sdk
```

### Initialize

Web library can be found in the [dist] folder

```javascript
// standard import
const { SwapActionGenerator, SwapTransactionGenerator, ChainApi, RpcApi } = require("@a-dex/a-dex-sdk");

// ES6 import
import { SwapActionGenerator, SwapTransactionGenerator, ChainApi, RpcApi } from "@a-dex/a-dex-sdk";
```

## Documentation

### ChainApi

Chain API client.

### RpcApi

A-DEX RPC API client.

### SwapActionGenerator

Helper class to construct swap contract actions which can be signed and pushed on chain.

### SwapTransactionGenerator

Helper class to construct swap contract transactions which can be signed and pushed on chain.

### Utils

Helper functions for math calculations and data formating.