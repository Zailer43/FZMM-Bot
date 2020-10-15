module.exports = inject;
// https://github.com/TheDudeFromCI/Mineflayer-Youtube-Tutorials/blob/master/pvpBot2/index.js

const pvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')
const {
    pathfinder,
    Movements,
    goals
} = require('mineflayer-pathfinder')

function inject(bot, lang, prefix, admin) {
    bot.loadPlugin(pvp)
    bot.loadPlugin(armorManager)
    bot.loadPlugin(pathfinder)

    bot.on('playerCollect', (collector, itemDrop) => {
        if (collector !== bot.entity) return

        setTimeout(() => {
            const sword = bot.inventory.items().find(item => item.name.includes('Sword'))
            if (sword) bot.equip(sword, 'hand')
        }, 150)
        
    })

    bot.on('playerCollect', (collector, itemDrop) => {
        if (collector !== bot.entity) return

        setTimeout(() => {
            const shield = bot.inventory.items().find(item => item.name.includes('Shield'))
            if (shield) bot.equip(shield, 'off-hand')
        }, 250)
        
    })

    let guardPos = null

    function guardArea(pos) {
        guardPos = pos.clone()

        if (!bot.pvp.target) {
            moveToGuardPos()
        }
    }

    function stopGuarding() {
        guardPos = null
        bot.pvp.stop()
        bot.pathfinder.setGoal(null)
    }

    function moveToGuardPos() {
        const mcData = require('minecraft-data')(bot.version)
        bot.pathfinder.setMovements(new Movements(bot, mcData))
        bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z))
    }

    bot.on('stoppedAttacking', () => {
        if (guardPos) {
            moveToGuardPos()
        }
    })

    bot.on('physicTick', () => {
        if (!guardPos) return

        const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
            e.mobType !== 'Armor Stand' // Mojang classifies armor stands as mobs for some reason?

        const entity = bot.nearestEntity(filter)
        if (entity) {
            bot.pvp.attack(entity)
        }
    })

    bot.on('chat', (username, message) => {
        if (message.startsWith(prefix)) {
            message = message.slice(prefix.length)
            switch (message) {
                case 'guardia':
                    if (username !== admin) return;
                    const player = bot.players[username]

                    if (!player) {
                        bot.chat(lang.noteveo)
                        return
                    }

                    bot.chat(lang.guardia)
                    guardArea(player.entity.position)
                    break;
                case 'guardia stop':
                    if (username !== admin) return;
                    stopGuarding()
                    break;
                case 'combatir':
                    const player2 = bot.players[username]

                    if (!player2) {
                        bot.chat(lang.noteveo)
                        return
                    }

                    bot.chat(lang.preparate)
                    bot.pvp.attack(player2.entity)
                    break;

            }
        }
    })
}