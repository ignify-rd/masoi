// English role text, keyed by id in src/data/roles.js. Same fields as
// src/i18n/vi/roles.js. Names follow the Ultimate Werewolf cards.

export const ROLE_TEXT = {
  dream_wolf: {
    name: 'Dreamwolf',
    ability:
      'The Dreamwolf does not wake with the other Werewolves until a Werewolf has been killed.',
    script: 'Dreamwolf, wake up so I can note your role.',
  },
  bigfoot: {
    name: 'Big Foot',
    ability:
      'You start on the Village team, but the Seer sees you as a Werewolf because you are as hairy as one. You stay with the Village until a day when nobody is lynched; the next day you get angry and switch to the Werewolf team.',
    script: 'Big Foot, wake up so I can note your role.',
  },
  tanner: {
    name: 'Tanner',
    ability: 'You win only if you are killed during the day.',
    script: 'Tanner, wake up so I can note your role.',
  },
  prince: {
    name: 'Prince',
    ability: 'If you are voted out during the day, you reveal your card and survive.',
    script: 'Prince, wake up so I can note your role.',
  },
  lone_wolf: {
    name: 'Lone Wolf',
    ability: 'You win only if you are the last Werewolf alive.',
    script: 'Lone Wolf, wake up so I can note your role.',
  },
  halfblood: {
    name: 'Halfblood',
    ability: 'When the Seer checks you, you appear as a Werewolf.',
    script: 'Halfblood, wake up so I can note your role.',
  },
  mayor: {
    name: 'Mayor',
    ability: 'Your vote counts as two votes.',
    script: 'Mayor, wake up so I can note your role.',
  },
  tough_guy: {
    name: 'Tough Guy',
    ability:
      "If the Werewolves attack you, you don't die right away — you hold on until the following night.",
    script: 'Tough Guy, wake up so I can note your role.',
  },
  terrorist: {
    name: 'Terrorist',
    ability: 'When you die, you set off an explosion that kills the 2 players next to you.',
    script: 'Terrorist, wake up so I can note your role.',
  },
  rusty_knight: {
    name: 'Rusty Knight',
    ability:
      'If the Werewolves kill you, they are infected by your rusty sword: the Werewolf sitting directly to your left dies the following night. You must not reveal your role to anyone while alive, or the card loses its effect.',
    script: 'Rusty Knight, wake up so I can note your role.',
  },
  diseased: {
    name: 'Diseased',
    ability:
      'If the Werewolves kill you, they catch your disease and cannot kill anyone the following night.',
    script: 'Diseased, wake up so I can note your role.',
  },
  hoodlum: {
    name: 'Hoodlum',
    ability:
      'On the first night, pick 2 players to start a fight with. You win if both of them die and you are still alive when the game ends.',
    script: 'Hoodlum, wake up and pick 2 players to start a fight with.',
  },
  cupid: {
    name: 'Cupid',
    ability:
      'On the first night, choose 2 players to become Lovers. If one of them dies, the other dies too.',
    script:
      'Cupid, wake up, open your eyes and point to 2 players to become Lovers (you may choose yourself).',
  },
  guard: {
    name: 'Guard',
    ability:
      'Each night, protect 1 player. That player cannot be killed by the Werewolves tonight. You may not protect the same player 2 nights in a row.',
    script: 'Guard, wake up. Who do you want to protect tonight?',
  },
  priest: {
    name: 'Priest',
    ability:
      'At night, choose 1 player to bless (once per game). That player cannot die at night (except by their own hand).',
    script: 'Priest, wake up. Who do you want to bless?',
  },
  werewolf: {
    name: 'Werewolf',
    ability:
      'Each night, the Werewolves agree on 1 player to eat. The victim dies at the start of the next day.',
    script:
      'Werewolves, wake up, look at each other and choose 1 player to eat tonight.',
  },
  fruit_wolf: {
    name: 'Fruit Wolf',
    ability: 'If you are the last Werewolf alive, you cannot eat anyone.',
    script: 'Fruit Wolf, wake up so the other Werewolves know who you are.',
  },
  wolf_cub: {
    name: 'Wolf Cub',
    ability: 'If the Wolf Cub is killed, the Werewolves eat 2 players the following night.',
    script: 'Wolf Cub, raise your hand so the other Werewolves know who you are.',
  },
  wolf_man: {
    name: 'Wolf Man',
    ability:
      'You are a Werewolf with human blood, so the Seer does not see you as a Werewolf.',
    script: 'Wolf Man, wake up so the other Werewolves know who you are.',
  },
  wolverine: {
    name: 'Wolverine',
    ability:
      'If the Wolverine is the Werewolf sitting closest to the victim, everyone hears the clang of metal.',
    script: 'Wolverine, wake up so the other Werewolves know who you are.',
  },
  big_bad_wolf: {
    name: 'Big Bad Wolf',
    ability:
      'As long as the Big Bad Wolf is alive, each night the Werewolves may also kill a player sitting next to their chosen victim.',
    script: 'Big Bad Wolf, wake up so the other Werewolves know who you are.',
  },
  minion: {
    name: 'Minion',
    ability:
      'The Minion wakes with the Werewolves, knows who they are, and helps them kill the Villagers. However, the Seer still sees the Minion as a Villager.',
    script: 'Minion, raise your hand so the Werewolves know who you are.',
  },
  alpha_wolf: {
    name: 'Alpha Wolf',
    ability:
      'After the Werewolves choose a target, you may turn the victim into a Werewolf instead of eating them, if the attack succeeds (once per game).',
    script: 'Alpha Wolf, wake up. Do you want to turn the victim into a Werewolf?',
  },
  dire_wolf: {
    name: 'Dire Wolf',
    ability:
      'On the first night, choose another player as your companion. If that player dies, the Dire Wolf dies too. If the Dire Wolf dies, the companion does not.',
    script: 'Dire Wolf, wake up and point to a player to be your companion.',
  },
  fang_face: {
    name: 'Fang Face',
    ability:
      'On the first night, Fang Face wakes with the other Werewolves. On the following nights Fang Face stays asleep until it is the only Werewolf left.',
    script: 'Fang Face, wake up to see whether you are the last Werewolf.',
  },
  white_wolf: {
    name: 'White Wolf',
    ability:
      'You wake with the Werewolves. Every other night, the White Wolf may choose 1 Werewolf to eat. You win only if you are the last Werewolf and everyone else is dead.',
    script: 'White Wolf, wake up. Do you want to kill a Werewolf tonight?',
  },
  vampire: {
    name: 'Vampire',
    ability:
      'Each night, the Vampires choose 1 player to bite together. The victim dies at the end of the next day.',
    script: 'Vampires, wake up, look at each other and choose 1 player to bite tonight.',
  },
  dracula: {
    name: 'Dracula',
    ability:
      'After the Vampires choose a target, you may turn the victim into a Vampire if the bite succeeds (once per game).',
    script: 'Dracula, wake up. Do you want to turn the victim into a Vampire?',
  },
  witch: {
    name: 'Witch',
    ability: 'You have 2 single-use potions: 1 healing potion and 1 poison.',
    script:
      "Witch, wake up. This is the Werewolves' victim tonight. Do you want to use your healing potion? Do you want to use your poison on anyone?",
  },
  illusion_artist: {
    name: 'The Illusion Artist',
    ability:
      'Each night, choose 1 player. If the Seer checks that player tonight, the Seer sees them on the opposite of their real team.',
    script:
      'Illusion Artist, wake up and point to 1 player to fool the Seer tonight.',
  },
  seer: {
    name: 'Seer',
    ability: 'Each night, point to 1 player to learn whether they are a Werewolf.',
    script: 'Seer, wake up and point to 1 player to learn whether they are a Werewolf.',
  },
  one_eye_seer: {
    name: 'One-Eye Seer',
    ability:
      'Each night, choose 1 player to learn whether they are on the Werewolf team. Once you find a Werewolf, you lose your power until that Werewolf is killed.',
    script:
      'One-Eye Seer, wake up and point to 1 player to learn whether they are on the Werewolf team.',
  },
  aura_seer: {
    name: 'Aura Seer',
    ability:
      'Each night, point to 1 player to learn whether they have a special role (not a plain Villager, Werewolf or Vampire).',
    script:
      'Aura Seer, wake up and point to 1 player to learn whether they have a special role.',
  },
  mystic_seeker: {
    name: 'Mystic Seeker',
    ability: 'Each night, choose 1 player and learn their exact role.',
    script: 'Mystic Seeker, wake up and point to 1 player to learn their exact role.',
  },
  apprentice_seer: {
    name: 'Apprentice Seer',
    ability: 'If the Seer dies, you become the Seer.',
    script:
      'Apprentice Seer, wake up to see whether you have become the Seer. If you have, point to 1 player to learn whether they are a Werewolf.',
  },
  beholder: {
    name: 'Beholder',
    ability: 'On the first night you wake up and are shown who the Seer is.',
    script: 'Beholder, wake up. I will show you who the Seer is.',
  },
  sorceress: {
    name: 'Sorceress',
    ability:
      'Each night, wake up and look for the Seer. You are on the Werewolf team, but the Seer sees you as human.',
    script: 'Sorceress, wake up and look for the Seer.',
  },
  hunter: {
    name: 'Hunter',
    ability: 'When you die, you may kill another player.',
    script: 'Hunter, wake up. Who do you want to take down? You may choose no one.',
  },
  huntress: {
    name: 'Huntress',
    ability: 'Once per game, at night, you may kill another player.',
    script: 'Huntress, wake up. Who do you want to shoot? You may choose no one.',
  },
  exposer: {
    name: 'Exposer',
    ability:
      'On one night of the game, choose 1 player. Their role is revealed the next morning.',
    script:
      'Exposer, wake up. Whose role do you want to expose? You may choose no one.',
  },
  evil_empath: {
    name: 'Evil Empath',
    ability: 'Each night, you learn whether the Seer is sitting next to a Werewolf.',
    script:
      'Evil Empath, wake up. I will tell you whether the Seer is sitting next to a Werewolf.',
  },
  investigator: {
    name: 'Investigator',
    ability:
      'Once per game, choose 1 player: you learn whether that player or either of the 2 players next to them is a Werewolf.',
    script:
      'Investigator, wake up. Who do you want to investigate? You may choose no one yet.',
  },
  spellcaster: {
    name: 'Spellcaster',
    ability: 'Each night, choose a player who may not speak the next day.',
    script:
      'Spellcaster, wake up. Who do you want to cast your spell on? You may choose no one.',
  },
  cursed: {
    name: 'Cursed',
    ability:
      'You are on the Village team, but if the Werewolves kill you, you become a Werewolf.',
    script: 'Cursed, wake up to see whether you have become a Werewolf.',
  },
  old_hag: {
    name: 'Old Hag',
    ability: 'Each night, choose a player who must leave the village the next day.',
    script:
      'Old Hag, wake up. Who must leave the village tomorrow? You may choose no one.',
  },
  mentalist: {
    name: 'Mentalist',
    ability: 'Each night, choose 2 players to learn whether they are on the same team.',
    script:
      'Mentalist, wake up. Choose 2 players to learn whether they are on the same team.',
  },
  gambler: {
    name: 'Gambler',
    ability:
      'Each night except the first, point to 1 player. If that player is a Werewolf, they die. If not, you die.',
    script: 'Gambler, wake up. Who do you want to gamble on tonight?',
  },
  the_thing: {
    name: 'The Thing',
    ability: 'Each night, wake up and tap the player sitting next to you.',
    script: 'The Thing, wake up. Whose shoulder do you want to tap?',
  },
  haunted_ghost: {
    name: 'Haunted Ghost',
    ability:
      'On the first night, choose a player to haunt. That player is told they are haunted. If the Haunted Ghost dies, the haunted player dies too.',
    script: 'Haunted Ghost, wake up and point to a player to haunt.',
  },
  cult_leader: {
    name: 'Cult Leader',
    ability:
      'Each night, choose 1 player to join your cult. If every living player is in your cult, you win.',
    script: 'Cult Leader, wake up. Choose 1 player to join your cult.',
  },
  insomniac: {
    name: 'Insomniac',
    ability:
      'At the end of each night, you learn whether at least 1 of the 2 players next to you was active during the night.',
    script:
      'Insomniac, wake up. I will tell you whether a player next to you was active tonight.',
  },
  villager: {
    name: 'Villager',
    ability: 'No special power. Your job is to find and lynch the Werewolves/Vampires.',
  },
}

/** Extra night steps (NIGHT_EXTRAS in src/data/roles.js). */
export const NIGHT_EXTRA_TEXT = {
  lovers: {
    name: 'Lovers',
    script: 'Lovers, wake up and share your information with each other.',
  },
  cupidThirdTeam: {
    name: 'Cupid — third team',
    playerCondition: 'More than 12 players',
    script:
      "Cupid, wake up. I will tell you whether you are on the third team (the Lovers' team).",
    moderatorNote:
      'Only with more than 12 players, right after the Lovers have woken up. If Cupid paired two players from opposing teams (e.g. a Werewolf/Vampire with a Villager), tell Cupid they are on the third team. Otherwise, tell Cupid they are still on the Village team.',
  },
}
