// English theme text, keyed by id in src/data/themes.js. Same fields as
// src/i18n/vi/themes.js.

export const THEME_TEXT = {
  endless_night: {
    name: 'Endless Night',
    description:
      'The sun barely rises: after each day come two nights in a row, and the Werewolves attack on both nights before the village meets again.',
  },
  distant_howl: {
    name: 'Distant Howl',
    description:
      'The Werewolves can smell power: on night 1 the moderator shows the Werewolves which players have a night ability, but not which roles they are.',
    steps: {
      distant_howl_reveal: {
        name: 'Distant Howl — the wolves sniff out power',
        script:
          'Werewolves, open your eyes once more. I will point out the players who have a night ability.',
        moderatorNote:
          'Call at the end of night 1, after every other role has gone back to sleep. Point to each player with a night ability in turn — do NOT say which role it is.',
      },
    },
  },
  mole: {
    name: 'The Mole',
    description:
      "The pack plants a spy in the village: on night 1 the Werewolves agree on 1 Village-team player to be the mole. The mole now wins with the Werewolf team and wakes with the pack but cannot kill anyone. They keep their original role's ability, and the Seer still sees the mole as human.",
    steps: {
      mole_pick: {
        name: 'The Mole — the wolves pick a mole',
        script: 'Werewolves, agree on who will be the mole.',
        moderatorNote:
          "Night 1 only, right after the Werewolves' attack while the pack still has their eyes open. Write down who the mole is.",
      },
      mole_wake: {
        name: 'The Mole — wakes with the pack',
        script: 'Mole, wake up with the Werewolves.',
        moderatorNote:
          'Night 1: tap the player just chosen so they open their eyes and see the pack. From night 2 on, the mole opens their eyes with the pack but cannot attack; their original role is still called as usual. Read this line every night, even after the mole has died.',
      },
    },
  },
  thick_fog: {
    name: 'Thick Fog',
    description:
      "The fog hides everyone's true nature: investigating roles only learn whether their target HAS a night ability or NOT, never their team.",
  },
  blood_moon: {
    name: 'Blood Moon',
    description:
      'On the first night a red moon hangs low: the Werewolves kill 2 players on night 1. From night 2 on, everything returns to normal.',
  },
  mob_rule: {
    name: 'Mob Rule',
    description:
      'The village fears convicting the innocent: a lynch needs more than half of the living players voting for the same person; otherwise nobody dies that day.',
  },
  alpha_curse: {
    name: "Alpha's Curse",
    description:
      "The leader's curse pierces every protection: when the Alpha Wolf uses its power to turn the victim into a Werewolf, the curse always works (100%), even if the victim is shielded by the Guard, blessed by the Priest or saved by the Witch.",
    steps: {
      alpha_curse_mark: {
        name: "Alpha's Curse — tell the cursed player",
        script:
          'The following player has been cursed and will wake up with the Werewolves from the next night on.',
        moderatorNote:
          'Call right after the Alpha Wolf. Read this line every night so the village cannot tell whether the curse has been used; only on the night the Alpha Wolf curses someone, tap the cursed player so they know they are now a Werewolf. From the next night on, wake that player with the pack.',
      },
    },
  },
  wolf_covenant: {
    name: 'Wolf Covenant',
    description:
      "The pack signs a pact with its insiders: the Minion / Sorceress wakes on night 1 to see who the Werewolves are (but the Werewolves don't learn who they are).",
  },
  night_of_vengeance: {
    name: 'Night of Vengeance',
    description:
      'The pack avenges its own: each time the village lynches a Werewolf, the pack kills one extra player that night. This only applies to the first half of the Werewolves lynched (rounded down); after that the pack can no longer take revenge.',
  },
  creeping_curse: {
    name: 'Creeping Curse',
    description:
      "The curse spreads through blood: the Cursed turns into a Werewolf when attacked OR when sitting next to (left/right, counting only living players) that night's Werewolf victim.",
  },
  red_thread: {
    name: 'Red Thread',
    description:
      "The lovers' vow is stronger than any vow to the village: the Lovers always form a third team.",
  },
  blood_pact: {
    name: 'Blood Pact',
    description:
      "The Tanner drags someone else into the grave: if the Tanner is lynched, the player on the Tanner's right who voted for the lynch dies immediately.",
  },
  blood_thirst: {
    name: 'Bloodthirst',
    description:
      'The pack knows how to wait: if the Werewolves choose not to attack on a night, they attack two players the following night.',
  },
  last_stand: {
    name: 'Last Stand',
    description:
      'The last wolf fights for its life: when only one member of the Werewolf team is left alive, once per game it may pick a night to attack two players instead of one.',
  },
  scent_of_blood: {
    name: 'Scent of Blood',
    description:
      'The pack can smell power: whenever they kill a player, the moderator nods to tell the Werewolves the victim had a night ability, or shakes their head if it was an ordinary villager.',
  },
  long_night: {
    name: 'Long Night',
    description:
      'The sun rises late and the village has no time to meet: on the first day there is NO lynch — just discussion, then straight into night 2.',
  },
  reverse_trial: {
    name: 'Reverse Trial',
    description:
      "The accused gets a lawyer: the player on trial picks a defender who argues on their behalf. If the accused is lynched, the lawyer loses their vote the next day; if the accused walks free, the lawyer's vote counts double the next day.",
  },
  great_storm: {
    name: 'Great Storm',
    description:
      'A storm will strike one night: the moderator secretly picks a night in advance, and on that night every night ability fails, including the attack. In the morning nobody dies and nobody knows they were blocked by the storm.',
  },
  tidal_moon: {
    name: 'Tidal Moon',
    description:
      'The moon follows its cycle: on odd nights the Werewolves attack two players; on even nights they cannot attack at all.',
  },
  wolf_leader: {
    name: 'Pack Leader',
    description:
      "The pack has a leader: on night 1 the Werewolves choose one of their own as Pack Leader. Each night, after the pack has pointed at a target, the leader alone may raise a hand to swap — the target is not killed, and instead the moderator tells the pack that target's role. If the leader dies, the pack loses its attack that night.",
    steps: {
      wolf_leader_pick: {
        name: 'Pack Leader — choose the leader',
        script: 'Werewolves, agree on and point to one of you to be the Pack Leader.',
        moderatorNote:
          "Call right after the Werewolves' attack on night 1, while the pack still has their eyes open. Write down who the leader is. If the leader dies, the Werewolves lose their attack that night.",
      },
      wolf_leader_peek: {
        name: 'Pack Leader — trade the kill for a look',
        script:
          "Pack Leader, raise your hand if you want to swap: don't kill this target, learn their role instead.",
        moderatorNote:
          "Only ask AFTER the pack has settled on a target. If the leader raises a hand: the target lives and you tell the whole pack that target's role. Otherwise the attack happens as normal.",
      },
    },
  },
  sheriff: {
    name: 'Sheriff',
    description:
      'The village restores order: on the first day everyone openly elects a Sheriff. From then on, whenever a lynch vote is tied, the Sheriff decides who is lynched. If the Sheriff dies, the village elects a new one that same day.',
  },
  forest_journey: {
    name: 'Forest Journey',
    description:
      'Whoever the Old Hag sends away wanders the forest all day; when they return, they draw one random card from the deck below:\n' +
      '1. Rusty Gun: once, during the day, publicly shoot one player dead.\n' +
      '2. Antidote: automatically saves its holder from the first kill aimed at them at night.\n' +
      '3. Broken Mirror: once per game, at night, works like the Seer. If a Werewolf-team player draws it, it works like the Aura Seer instead.\n' +
      '4. Invisibility Cloak: on the night they return, every ability aimed at them misses.\n' +
      '5. Broken Compass: on the night they return, they learn whether a Werewolf is sitting next to them.\n' +
      '6. Wasted Trip: nothing happens.\n' +
      '7. Wild Scent: for the rest of the game, any investigating role that checks them gets a Werewolf result.\n' +
      '8. Wound: they lose their vote the next day and cannot wake up to use their ability that night.\n' +
      '9. Forest Bite: they now win with the Werewolf team and learn who the pack is, but cannot attack. If they were already a Werewolf, this card has no effect.\n' +
      '10. Forest Holy Water: if the drawer is on the Werewolf team, they lose their memory: from then on they cannot attack and no longer wake with the pack (they still win with the Werewolves); the pack attacks as normal. For a Villager, nothing happens.\n' +
      '11. Death in the Forest: whoever draws this card dies immediately.\n' +
      '12. Poison Mushroom: the drawer ate a poisonous mushroom and will die after x nights. The Witch can save them with the healing potion. (The moderator secretly picks x at random from 1–4.)',
    steps: {
      forest_journey_item: {
        name: 'Forest Journey — the returning traveler',
        script:
          'Traveler back from the forest, wake up. Raise your hand if you want to use your item tonight.',
        moderatorNote:
          'Call at the start of the night, only on nights when someone has just returned from the forest. If they use the Invisibility Cloak / Broken Compass / Broken Mirror, resolve it right at this step and remember to mark the card as used.',
      },
    },
  },
  lunar_eclipse: {
    name: 'Lunar Eclipse',
    description:
      'No moon for the wolves to transform: on night 1 the Werewolves only meet each other and cannot attack anyone.',
  },
  royal_decree: {
    name: 'Royal Decree',
    description:
      "The Prince takes the judge's seat: once revealed, the Prince's vote counts double every day.",
  },
  first_dawn: {
    name: 'First Dawn',
    description:
      'The game opens in broad daylight: play starts with a day instead of a night. The village discusses and lynches someone before the first night truly begins.',
  },
  holy_antidote: {
    name: 'Holy Antidote',
    description:
      'The Witch holds a cure for vampire bites: when someone dies in the morning because of the Vampires, the Witch may publicly reveal their card and use the healing potion on the spot to save that player.',
  },
  silver_claw: {
    name: 'Silver Claw',
    description:
      'The Werewolves in this village have silver claws: a Werewolf attack kills a Vampire like any other player (Vampires lose their immunity to Werewolves).',
  },
  garlic_harvest: {
    name: 'Garlic Harvest',
    description:
      'The village just had a garlic harvest: each day the village picks 1 player to hang garlic on their door; that night the Vampires cannot bite that player.',
  },
  night_watch: {
    name: 'Night Watch',
    description:
      'The village posts a lookout: every evening before dark, the village openly picks a night watchman. That player cannot be killed that night, but cannot use their own night ability either.',
  },
  village_ledger: {
    name: 'Village Ledger',
    description:
      "The village keeps a record of every claim: when someone publicly claims a specific role, the moderator writes it down, and that player may not change their claim for the rest of the game. Vague hints don't count as a claim, but naming a role does.",
  },
  rumor_mill: {
    name: 'Rumor Mill',
    description:
      'Rumors fly around the village: each morning the moderator secretly hands a random living player a note with the team of another random living player. The recipient may keep it secret, reveal it, or lie about it.',
  },
  village_militia: {
    name: 'Village Militia',
    description:
      'The village is crowded and angry: once per game, the village may lynch 2 players (two votes in a row).',
  },
  white_list: {
    name: 'White List',
    description:
      "The village keeps a list of the innocent: each morning the moderator announces the name of one Village-team player, and each player can be announced only once per game. Once per game, the Werewolves may swap that day's name for a Werewolf's, and the village has no way of knowing which day was swapped.",
    steps: {
      white_list_swap: {
        name: 'White List — the wolves swap a name',
        script:
          "Werewolves, wake up. This player will be announced. Do you want to replace tomorrow morning's name with the name of one of your wolves?",
        moderatorNote:
          "The Werewolves may swap only ONCE per game — once used, press Hide on this step. If they swap, read that wolf's name tomorrow morning exactly like a normal innocent name, without giving anything else away.",
      },
    },
  },
  price_of_truth: {
    name: 'Price of Truth',
    description:
      "Truth is paid for in blood: from the morning of day 2 on, if more than half of the living players agree, the village gives up that day's lynch in exchange for the moderator publicly announcing the team of any one player.",
  },
  inquisition: {
    name: 'Inquisition',
    description:
      "The Church oversees every trial: a lynched player's card is always revealed, and the moderator announces their role to the whole village.",
  },
  silver_bullet: {
    name: 'Silver Bullet',
    description:
      'The village forge casts an extra bullet: the Hunter gets 1 extra shot and may choose to fire it during the day (once per game) instead of only when dying.',
  },
  witch_sabbath: {
    name: "Witches' Sabbath",
    description:
      'The sabbath opens the potion store: the Witch may choose to take 3 poisons instead of 1 healing potion and 1 poison.',
  },
  talking_graveyard: {
    name: 'Talking Graveyard',
    description:
      "Those who die at night still leave a sign: each morning the moderator announces the role of last night's victim.",
  },
  death_note: {
    name: 'Last Words',
    description:
      "The dead leave last words: each player who dies at night may leave ONE sentence before leaving the game. The moderator decides whether it is allowed — it may only be about other players and may not reveal the speaker's own role. The last words are announced on the morning two days later. Once per game, the Werewolf team may erase a set of last words.",
    steps: {
      death_note_erase: {
        name: 'Last Words — the wolves erase a message',
        script:
          'Werewolves, wake up. These are the last words waiting to be announced — raise your hands if you want to erase them.',
        moderatorNote:
          'Call at the start of the night, only when there are last words not yet announced. The Werewolves may erase only ONCE per game — once used, hide this step.',
      },
    },
  },
  undying_village: {
    name: 'Undying Village',
    description:
      "Nobody truly leaves the village: players who are attacked or lynched stay at the table, still talk and vote as normal, and only lose their role's ability. The Werewolf / Vampire team only loses its attack once the whole team is dead. The Witch isn't told who was attacked and only chooses whether to save that night's victim. The moderator quietly tracks who is really dead and announces when the game is over.",
  },
  double_trial: {
    name: 'Double Trial',
    description:
      'The court never rests: each day the village lynches two players instead of one, with two votes in a row.',
  },
  bite_mark: {
    name: 'Bite Mark',
    description:
      "The bite leaves a telling mark: each morning the moderator announces whether the distance from last night's victim to the nearest Werewolf is even or odd, counted in seats around the circle of living players, the shorter way. If the victim was a Werewolf, the distance is 0, which is even.",
  },
  body_count: {
    name: 'Body Count',
    description:
      'The village takes roll call every morning: the moderator announces how many Werewolf-team and Vampire-team players are still alive — just the numbers, no identities.',
  },
  holy_water: {
    name: 'Holy Water',
    description:
      "The village still keeps a flask of holy water: once per game, if more than half of the living players point at the same player, the moderator publicly announces that player's team.",
  },
  talisman: {
    name: 'Talisman',
    description:
      'The whole village wears talismans: at the start of the game everyone gets a single-use talisman, so everyone has 2 lives. The first time a player is attacked or lynched, they keep living as if nothing happened.',
  },
}
