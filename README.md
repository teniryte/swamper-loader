[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/teniryte/swamper-loader/graphs/commit-activity) [![Maintaner](https://img.shields.io/badge/Maintainer-teniryte-blue)](https://img.shields.io/badge/maintainer-teniryte-blue) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://swamper-loader.sencort.com/) [![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![GitHub license](https://img.shields.io/github/license/teniryte/swamper-loader.svg)](https://github.com/teniryte/swamper-loader/blob/master/LICENSE) [![Profile views](https://gpvc.arturio.dev/teniryte)](https://gpvc.arturio.dev/teniryte) [![GitHub contributors](https://img.shields.io/github/contributors/teniryte/swamper-loader.svg)](https://GitHub.com/teniryte/swamper-loader/graphs/contributors/) [![GitHub issues](https://img.shields.io/github/issues/teniryte/swamper-loader.svg)](https://GitHub.com/teniryte/swamper-loader/issues/)

[![GitHub forks](https://img.shields.io/github/forks/teniryte/swamper-loader.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/teniryte/swamper-loader/network/) [![GitHub stars](https://img.shields.io/github/stars/teniryte/swamper-loader.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/teniryte/swamper-loader/stargazers/) [![GitHub watchers](https://img.shields.io/github/watchers/teniryte/swamper-loader.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/teniryte/swamper-loader/watchers/) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)

# swamper-loader

[**Swamper**](https://github.com/teniryte/swamper) Webpack Loader

[**Swamper**](https://github.com/teniryte/swamper) is a webpack loader and wrapper around [**worker-loader**](https://github.com/webpack-contrib/worker-loader) web workers loader.

## Webpack Loader

```sh
yarn add swamper-loader
```

```js
// ...
{
  test: /\.worker\.(c|m)?js$/i,
  use: [
    {
      loader: 'worker-loader',
      options: {
        publicPath: '/scripts/workers/',
        esModule: false,
      },
    },
    {
      loader: 'swamper-loader',
    },
  ],
},
// ...
```
