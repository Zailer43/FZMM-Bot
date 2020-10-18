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
            bot.inventory.items().find(item => {
                const swords = [608, 603, 598, 593, 588, 583]
                if (swords.includes(item.type)) bot.equip(item, 'hand')
            })
        }, 150)
        
        setTimeout(() => {
            bot.inventory.items().find(item => {
                const shield = 897
                if (item.type === shield) bot.equip(item, 'off-hand')
            })
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

    /*bot.on('physicTick', () => {
      if (bot.pvp.target) return
      if (bot.pathfinder.isMoving()) return

      const entity = bot.nearestEntity()
      if (entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
    })*/

    bot.on('physicTick', () => {
        if (!guardPos) return

        const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
            e.mobType !== 'Armor Stand' // Mojang classifies armor stands as mobs for some reason?

        const entity = bot.nearestEntity(filter)
        if (entity) {
            bot.pvp.attack(entity)
        }
    })

    bot.on('chat2', (username, message) => {
        //console.log(bot.inventory)
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