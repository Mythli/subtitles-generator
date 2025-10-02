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

## Getting Started

Install from npm:

```bash
npm install @mythli/subtitles-generator2
```

See the package on npm: https://www.npmjs.com/package/@mythli/subtitles-generator2

### For local development

Clone the repository and install dependencies:

```bash
git clone https://github.com/Mythli/subtitles-generator.git
cd subtitles-generator
pnpm install
```


## Usage

```typescript
import subtitlesGenerator, { Word } from '@mythli/subtitles-generator2';

// const sampleWords: Word[] = // some word json 
const subtitlesJson = subtitlesGenerator({words: sampleWords, type: 'json'})
const ttmlPremiere = subtitlesGenerator({words: sampleWords, type: 'premiere'})
const ittData = subtitlesGenerator({words: sampleWords, type: 'itt'})
const ttmlData = subtitlesGenerator({words: sampleWords, type: 'ttml'})
const srtData = subtitlesGenerator({words: sampleWords, type: 'srt'})
const vttData = subtitlesGenerator({words: sampleWords, type: 'vtt'})
```
see [`example-usage.ts`](./example-usage.ts) for a more comprehensive example.

To try locally:
```bash
pnpm start
```

### `words` Input 
- either an array list of words objects (`Word[]`)
example
```typescript
import { Word } from '@mythli/subtitles-generator2';

const sampleWords: Word[] = [ 
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
```typescript
const sampleWords: string = "There is a day. ...";
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

This project is a fork of the original BBC Subtitlelizer project. It has been updated with modern dependencies, converted to TypeScript, and uses Vitest for testing.

The original segmentation algorithm was refactored from [`pietrop/subtitlesComposer`](https://github.com/pietrop/subtitlesComposer) by [@polizoto](https://github.com/polizoto).
Subtitles generation in various formats was originally by [`@laurian`](https://github.com/laurian) and [`@maboa`](https://github.com/maboa).

## Development env
 <!-- _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_ -->

- [pnpm](https://pnpm.io/)
- Node 20+
- [Eslint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)

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


---

# TODO
- [x] Open source
- [x] use import/export in modules
