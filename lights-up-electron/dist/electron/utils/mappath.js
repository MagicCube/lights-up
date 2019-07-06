"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
function mappath(relativePath) {
    return path_1.resolve(__dirname, '../../..', relativePath);
}
exports.mappath = mappath;
