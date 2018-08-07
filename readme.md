# Holy mole

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![CircleCI Build Status](https://circleci.com/gh/in-your-saas/holy-mole.svg?style=shield)](https://circleci.com/gh/in-your-saas/holy-mole)

## How to use

You can use it as a module

```javascript
const mole = require('holy-mole');

mole.fetch().then(console.log);

// [
//   {
//     host: '1.1.1.1',
//     port: '8080',
//     https: true,
//     country: 'FR',
//   },
//   ...
// ]
```
