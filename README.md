# aText to Alfred Snippets
Simple script to convert aText snippets to Alfred snippets

To use:
npm install
From aText, export your snippets to a CSV file.

On the command line,
node index.js [path to atext csv] [output file for Alfred snippets]

If you don't specify input and output file, it assumes aText.csv and aText.alfredsnippets, located in same directory. (either specify both or neither)

NOTE: aText expressions are simply wrapped with {}, i.e simple attempt to make them dynamic placeholders. So if you are using fields, for example, in your aText scripts, you'll lose functionality in the Alfred snippet.