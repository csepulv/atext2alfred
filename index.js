var csv = require("fast-csv"),
    fs = require("fs");
var uuid = require("node-uuid");
var AdmZip = require('adm-zip');

var inputFile = process.argv[2]|| "./aText.csv";
var outputFile = process.argv[3] || "./aText.alfredsnippets";
var fieldStart = "【";
var fieldEnd = "】";


console.log("reading " + inputFile);

readCsv(inputFile)
    .then(function (rows) {
        console.log("converting...");
        var zip = new AdmZip();
        rows.forEach(function (row) {
            var snippet = {
                "alfredsnippet": {
                    "snippet": replaceFieldChars(row[1]),
                    "uid": uuid.v4(),
                    "name": row[0],
                    "keyword": row[0]
                }
            };

            zip.addFile(snippet.alfredsnippet.name + "[" + snippet.alfredsnippet.uid + "].json", new Buffer(JSON.stringify(snippet)))
        });
        zip.writeZip(outputFile);
        console.log("finished converting. Wrote " + outputFile);
        process.exit(0);

    })
    .catch(function (error) {
        console.error(error);
        process.exit(1);
    });

function readCsv(filePath) {
    return new Promise(function (resolve, reject) {
        var stream = fs.createReadStream(filePath);
        var rows = [];
        csv
            .fromStream(stream, {headers: false})
            .on("data", function (data) {
                rows.push(data);
            })
            .on("end", function () {
                resolve(rows);
            })
            .on("error", function (error) {
                reject(error);
            });
    });

}
function replaceFieldChars(text) {
    var result = text.replace(fieldStart, "{");
    result = result.replace(fieldEnd, "}");
    return result;
}