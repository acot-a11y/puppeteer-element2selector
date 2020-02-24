# puppeteer-element2selector

[![GitHub Actions Status](https://github.com/wadackel/puppeteer-element2selector/workflows/Continuous%20Integration/badge.svg)](https://github.com/wadackel/puppeteer-element2selector/actions)
[![npm](https://img.shields.io/npm/v/puppeteer-element2selector)](https://www.npmjs.com/package/puppeteer-element2selector)

> A utility to convert puppeteer ElementHandle to CSS Selector.

This library uses [antonmedv/finder][finder] to turn [ElementHandle] into a unique CSS Selector. Allows developers to easily identify elements.

## Getting Started

### Installation

```bash
$ npm install puppeteer-element2selector
```

### Usage

Below is a minimal sample code.

```typescript
import puppeteer from 'puppeteer';
import { element2selector } from 'puppeteer-element2selector';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://google.com');

const element = await page.$('input');
const selector = await element2selector(element!);

console.log(`Result: ${selector}`); // Result: #tophf > input:nth-child(1)
```

## API Document

### `element2selector(element: ElementHandle, options?: Options): string`

- `element` <[ElementHandle]>
- `options` <[Object]>
  - `seedMinLength` <[number]> Minimum length of levels in fining selector. Starts from `1`. For more robust selectors give this param value around 4-5 depending on depth of you DOM tree.
  - `optimizedMinLength` <[number]> Minimum length for optimising selector. Starts from `2`. For example selector `body > div > div > p` can be optimized to body `p`.
  - `threshold` <[number]> Max number of selectors to check before falling into `nth-child` usage. Checking for uniqueness of selector is very costs operation, if you have DOM tree depth of 5, with 5 classes on each level, that gives you more than 3k selectors to check. [finder] uses two step approach so it's reaching this threshold in some cases twice. Default `1000` is good enough in most cases.
- returns: <[string]>

## CHANGELOG

See [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT License @ wadackel](./LICENSE)

[finder]: https://github.com/antonmedv/finder
[finder-configuration]: https://github.com/antonmedv/finder#configuration
[elementhandle]: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-elementhandle
[options]: #options
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type 'String'
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type 'Number'
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object 'Object'
