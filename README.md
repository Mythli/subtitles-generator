# Subtitles Generator

A node module to generate subtitles by segmenting a list of time-coded text.

Exports to 
- [x] TTML for Premiere as `.xml`
- [x] TTML 
- [x] iTT - for Apple 
- [x] srt
- [x] vtt 
- [x] csv 
- [x] txt - pre-segmented text

It can also provide pre-segmented lines if the input is plain text.

## Setup
<!-- _stack - optional_
_How to build and run the code/app_ -->

git clone, cd into folder, `npm install`


## Usage

```js
import subtitlesGenerator from './src/index.js';
// const sampleWords = // some word json 
const subtitlesJson = subtitlesGenerator({words: sampleWords, type: 'json'})
const ttmlPremiere = subtitlesGenerator({words: sampleWords, type: 'premiere'})
const ittData = subtitlesGenerator({words: sampleWords, type: 'itt'})
const ttmlData = subtitlesGenerator({words: sampleWords, type: 'ttml'})
const srtData = subtitlesGenerator({words: sampleWords, type: 'srt'})
const vttData = subtitlesGenerator({words: sampleWords, type: 'vtt'})
```
see [`example-usage.js`](./example-usage.js) for more comprehensive example.

To try locally
```
node example-usage.js
```

### `words` Input 
- either an array list of words objects    
example
```js
const sampleWords =[ 
      {
        "id": 0,
        "start": 13.02,
        "end": 13.17,
        "text": "There"
      },
      {
        "id": 1,
        "start": 13.17,
        "end": 13.38,
        "text": "is"
      },
      {
        "id": 2,
        "start": 13.38,
        "end": 13.44,
        "text": "a"
      },
      {
        "id": 3,
        "start": 13.44,
        "end": 13.86,
        "text": "day."
      },
...
```
- or a string of text     
Example
```js
const sampleWords = "There is a day. ..."
```

If input `words` is plain text only (and not a list of words with timecodes) then can only use `pre-segment-txt` option. (see [`test-presegment.txt`](./example-output/test-presegment.txt) for example)

## Output: 
see [`example-output`](./example-output) folder for examples.


## System Architecture
<!-- _High level overview of system architecture_ -->

In pseudo code, at a high level 
```
// expecting array list of words OR plain text string

  // if array list of words, convert text into string

  // presegment the text 
     using pre segmentation algorithm to break into line of x char - default 35

// generate subtitles 
   use subtitles generators for various format to convert presegemented json into subtitles

// return trsult
```

This project is a fork of the original BBC Subtitlelizer project. It has been updated with modern dependencies, converted to ESM, and uses Vitest for testing.

The original segmentation algorithm was refactored from [`pietrop/subtitlesComposer`](https://github.com/pietrop/subtitlesComposer) by [@polizoto](https://github.com/polizoto).
Subtitles generation in various formats was originally by [`@laurian`](https://github.com/laurian) and [`@maboa`](https://github.com/maboa).

## Development env
 <!-- _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_ -->

- npm > `6.1.0`
- Node 16+
- [Eslint](https://eslint.org/)

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

## Build
<!-- _How to run build_ -->

```
npm run build
```


## Tests
<!-- _How to carry out tests_ -->

This project uses [Vitest](https://vitest.dev/) for testing.

```
npm test
```

To run tests during development

```
npm run test:watch
```

## Linting
To run linter

```
npm run lint
```

To run and fix
```
npm run lint:fix
```

## Deployment
<!-- _How to deploy the code/app into test/staging/production_ -->

This package is ready to be published to npm.

```
npm run publish:public
```

---

# TODO
- [x] Open source
- [x] use import/export in modules
