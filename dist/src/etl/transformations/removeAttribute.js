"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Format = exports.removeAttribute = void 0;
var Format;
(function (Format) {
    Format["Json"] = "JSON";
    Format["Csv"] = "CSV";
    Format["PlainText"] = "PLAIN_TEXT";
})(Format = exports.Format || (exports.Format = {}));
function removeAttribute(endpoint, options) {
    const { format } = options;
    console.log(endpoint, options, format);
}
exports.default = removeAttribute;
exports.removeAttribute = removeAttribute;
//# sourceMappingURL=removeAttribute.js.map