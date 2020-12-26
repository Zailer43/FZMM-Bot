// https://github.com/OdarArmy/EasyDiscordPresence/

module.exports = inject;
import Discord from 'discord-rpc';

function inject(ID: string, time: boolean) {
    let startTimestamp: Date | undefined = undefined;
    if (time) startTimestamp = new Date();

    const LargeImage: string = 'fzmm';
    const LargeText: string = 'FraZaMaMe';
    //const SI = settings.SmallImage
    //const ST = settings.SmallText
    const Details: string = 'Un bot de Minecraft';
    //const ste = settings.State

    Discord.register(ID);

    const rpc = new Discord.Client({
        transport: "ipc"
    });

    rpc.on("ready", () => {
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
    })

    rpc.login({ clientId: ID }).catch(e => '[Discord]: ' + e)

}