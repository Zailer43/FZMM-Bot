"use strict";
// https://github.com/OdarArmy/EasyDiscordPresence/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = inject;
var discord_rpc_1 = __importDefault(require("discord-rpc"));
function inject(ID, time) {
    var startTimestamp = undefined;
    if (time)
        startTimestamp = new Date();
    var LargeImage = 'fzmm';
    var LargeText = 'FraZaMaMe';
    //const SI = settings.SmallImage
    //const ST = settings.SmallText
    var Details = 'Un bot de Minecraft';
    //const ste = settings.State
    discord_rpc_1.default.register(ID);
    var rpc = new discord_rpc_1.default.Client({
        transport: "ipc"
    });
    rpc.on("ready", function () {
        rpc.setActivity({
            details: Details,
            //state: ste,
            startTimestamp: startTimestamp,
            largeImageKey: LargeImage,
            //smallImageKey: SI,
            largeImageText: LargeText,
            //smallImageText: ST,
            instance: false
        });
    });
    rpc.login({ clientId: ID }).catch(function (e) { return '[Discord]: ' + e; });
}
