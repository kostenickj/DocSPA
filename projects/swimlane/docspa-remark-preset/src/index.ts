import headings from '@rigor789/remark-autolink-headings';
import frontmatter from 'remark-frontmatter';
import math from 'remark-math';
import katex from 'remark-html-katex';
import gemojiToEmoji from 'remark-gemoji-to-emoji';
import htmlEmojiImage from 'remark-html-emoji-image';
import parseFrontmatter from 'remark-parse-yaml';
import shortcodes from 'remark-shortcodes';
import slug from 'remark-slug';
import remarkAttr from 'remark-attr';
import reporter from 'vfile-reporter';

import customBlocks from './plugins/remark-custom-blocks-plugin';

import { readMatter, getTitle } from './plugins/frontmatter';
import { infoString, infoStringToAttr } from './plugins/misc';
import { customBlocksOptions } from './plugins/remark-custom-blocks';
import { customBlockquotes, customBlockquotesOptions } from './plugins/remark-custom-blockquotes';
import { shortCodeProps } from './plugins/short-codes';
import { prism } from './plugins/prism';

export { customBlocks, customBlockquotes, prism };

export const plugins = [
  frontmatter,
  parseFrontmatter,
  readMatter,
  getTitle,
  infoString,
  [ remarkAttr, { scope: 'permissive' } ],
  slug,
  [ headings, { behaviour: 'append' } ],
  math,
  katex,
  gemojiToEmoji,
  [ htmlEmojiImage, { base: 'https://github.com/images/icons/emoji/' }],
  infoStringToAttr,
  [ customBlocks, customBlocksOptions ],
  [ customBlockquotes, customBlockquotesOptions ],
  shortcodes,
  shortCodeProps,
  prism
];

export const settings = {};

export {
  reporter,
  getTitle
};

export const preset = {
  settings,
  plugins,
  reporter
};

export default preset;
