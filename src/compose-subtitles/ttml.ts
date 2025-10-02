import escapeText from './util/escape-text.js';
import formatSeconds from './util/format-seconds.js';

interface SubtitleLine {
  start: number;
  end: number;
  text: string;
}

const ttmlGenerator = (vttJSON: SubtitleLine[]): string => {
  let ttmlOut = `<?xml version="1.0" encoding="UTF-8"?>
    <tt xmlns="http://www.w3.org/ns/ttml">
    <head></head>
    <body>
    <div>`;
  vttJSON.forEach((v) => {
    ttmlOut += `<p begin="${ formatSeconds(v.start) }" end="${ formatSeconds(v.end) }">${ escapeText(v.text).replace(/\n/g, '<br />') }</p>\n`;
  });
  ttmlOut += '</div>\n</body>\n</tt>';

  return ttmlOut;
};

export default ttmlGenerator;
