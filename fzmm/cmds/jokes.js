"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jokescmd = void 0;
var axios_1 = __importDefault(require("axios"));
function jokescmd(bot) {
    axios_1.default.get('https://icanhazdadjoke.com/slack')
        .then(function (jokesdatos) {
        console.log(jokesdatos.data.attachments[0].text);
        bot.chat(jokesdatos.data.attachments[0].text);
    })
        .catch(function (error) {
        console.log(error);
    });
}
exports.jokescmd = jokescmd;
