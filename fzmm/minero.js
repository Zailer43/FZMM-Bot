module.exports = inject;

const {
    pathfinder,
    Movements
} = require('mineflayer-pathfinder')

const {
    GoalBlock
} = require('mineflayer-pathfinder').goals

const fzmm = require('./fzmm.js');

function inject(bot, lang, prefix, admin) {
    bot.loadPlugin(pathfinder)

    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)
    bot.pathfinder.setMovements(defaultMove);

    let target, max, direccionx, direccionz;
    let blockcount = 0,
        totalpicado = 0;

    bot.on('comando', function (username, message) {
        if (username === bot.username) return
        if (message.startsWith('minar ')) {
            const cmd = message.split(' ');
            max = parseInt(cmd[1]);
            switch (cmd[2]) {
                case 'norte':
                    direccionx = 0;
                    direccionz = -1;
                    break;
                case 'sur':
                    direccionx = 0;
                    direccionz = 1;
                    break;
                case 'oeste':
                    direccionx = -1;
                    direccionz = 0;
                    break;
                case 'este':
                    direccionx = 1;
                    direccionz = 0;
                    break;
                default:
                    bot.chat(lang.direccioninvalida)
            }
            picar();
        }
    })

    function complete(e) {
        if (e) console.log(e);
        blockcount++;
        totalpicado++;
        if (totalpicado === max) {
            bot.chat(lang.termine);
            totalpicado = 0;
            blockcount = 0;
            return;
        } else if (blockcount === 2) {
            blockcount = 0;
            bot.pathfinder.setGoal(new GoalBlock(bot.entity.position.x + direccionx, bot.entity.position.y, bot.entity.position.z + direccionz));
            fzmm.sleep(200);
        }
        setTimeout(() => {
            picar();
        }, 300);
    }

    function picar() {
        target = bot.blockAt(bot.entity.position.offset(direccionx, 1, direccionz));
        switch (blockcount) {
            case 0:
                target = bot.blockAt(bot.entity.position.offset(direccionx, 1, direccionz));
                break;
            case 1:
                target = bot.blockAt(bot.entity.position.offset(direccionx, 0, direccionz));
                break;
        }
        if (bot.canDigBlock(target) && target.name !== 'air') {
            bot.dig(target, complete);
        } else complete();
    }
}