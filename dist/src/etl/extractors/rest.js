"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Format = void 0;
var Format;
(function (Format) {
    Format["Json"] = "JSON";
    Format["Csv"] = "CSV";
    Format["PlainText"] = "PLAIN_TEXT";
})(Format = exports.Format || (exports.Format = {}));
function restExtractor(options) {
    const { endpoint, format } = options;
    console.log(endpoint, options, format);
}
exports.default = restExtractor;
//# sourceMappingURL=rest.js.map