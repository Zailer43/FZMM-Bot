"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.langformat = exports.sleep = void 0;
function sleep(ms) {
    var r = Date.now() + ms;
    while (Date.now() < r) { }
}
exports.sleep = sleep;
function langformat(message, arr) {
    arr.forEach(function (element, index) {
        message = message.replace("%" + index + "$", element);
    });
    return message;
}
exports.langformat = langformat;
