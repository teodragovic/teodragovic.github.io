
const fs = require('fs');

const title = process.argv[ 2 ];

const passedDate = process.argv[ 3 ] || new Date();

if (!title) {
    throw Error('Missing title');
}

const slugify = string => string.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
const date = new Date(passedDate).toISOString().split('T')[ 0 ];
const meta =
`---
title: ${ title }
date: ${ date }
tags:
  -
---`;

fs.writeFile(`posts/${ date }-${ slugify(title) }.md`, meta, (err) => {
    if (err) {
        throw err;
    }

    console.log('Post created!');
});
