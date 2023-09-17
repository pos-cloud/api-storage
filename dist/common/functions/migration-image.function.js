"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const readFile = async (database, collection, filename) => {
    try {
        if (filename.includes('http')) {
            return null;
        }
        const urlFile = (0, path_1.join)(__dirname, '..', '..', database, 'images', collection, filename);
        console.log(urlFile);
        const file = (0, fs_1.readFileSync)(urlFile);
        console.log(file);
        return file;
    }
    catch (err) {
        return null;
    }
};
exports.readFile = readFile;
//# sourceMappingURL=migration-image.function.js.map