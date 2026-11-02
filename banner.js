const fs = require('node:fs');
const { version } = require('./package.json');
const path = 'assets/js/main.min.js';
const banner = `/*!
 * Minimal Mistakes Jekyll Theme ${version} by Michael Rose
 * Copyright 2013-2021 Michael Rose - mademistakes.com | @mmistakes
 * Licensed under MIT
 */\n`;

fs.writeFileSync(path, banner + fs.readFileSync(path, 'utf8'));
