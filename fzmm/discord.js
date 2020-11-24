// https://github.com/OdarArmy/EasyDiscordPresence/

module.exports = inject;
const Discord = require("discord-rpc")

function inject(ID, time) {
    const startTimestamp = new Date()

    const LargeImage = 'fzmm'
    const LargeText = 'FraZaMaMe'
    //const SI = settings.SmallImage
    //const ST = settings.SmallText
    const Details = 'Un bot de Minecraft'
    //const ste = settings.State

    Discord.register(ID)

    const rpc = new Discord.Client({
        transport: "ipc"
    });

    rpc.on("ready", () => {
        if (time === true) {
            rpc.setActivity({
                details: Details,
                //state: ste,
                startTimestamp,
                largeImageKey: LargeImage,
                //smallImageKey: SI,
                largeImageText: LargeText,
                //smallImageText: ST,
                instance: false
            })
        } else {
            rpc.setActivity({
                details: Details,
                //state: ste,
                largeImageKey: LargeImage,
                //smallImageKey: SI,
                largeImageText: LargeText,
                //smallImageText: ST,
                instance: false
            })
        }
    })

    rpc.login({clientId: ID}).catch('[Discord]: ' + console.error)

}