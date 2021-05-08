export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {

    // resolve the promise with the winner when fight is over
  });

}

export function getDamage(attacker, defender) {
  // return damage
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.floor(Math.random() * 2) + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.floor(Math.random() * 2) + 1;
  console.log(dodgeChance);
  return  fighter.defense * dodgeChance;
}
