
var fs = require('fs');

var filename = process.argv[2];
if (filename === '-') {
}


var markdownIt = require('markdown-it')({
        linkify: true,
    })
    //.use(require('./render/markdown_hashtag'))
    //.use(require('./render/markdown_subscript'))
    //.use(require('./render/markdown_wikilink'))
    .use(require('./render/markdown_spanner')())
    .use(require('./render/markdown_spanner_dates')())
    //.use(require('./render/markdown_captioned_list'))
    //.use(require('./render/markdown_captioned_img'))
    //.use(require('./render/markdown_deflist'))
;


var buffer = fs.readFileSync(filename);

console.log(markdownIt.render(buffer.toString()));


