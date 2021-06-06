"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
const rest_1 = __importDefault(require("etl/extractors/rest"));
class Pipeline {
    result;
    constructor() {
        this.result = {};
    }
    get finish() {
        return this.result;
    }
    restExtractor = (...args) => rest_1.default(args[0]);
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=index.js.map