import { showWinnerModal } from './modal/winner';

export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {

    // resolve the promise with the winner when fight is over
    if (firstFighter.health <= 0) {
      showWinnerModal(firstFighter);
    }else if(secondFighter<=0){
      showWinnerModal(secondFighter);
    }
  });

}

export function getDamage(attacker, defender) {
  // return damage
  let getDamages = 0;
  let getBlockPowers = getBlockPower(defender);
  let getHitPowers = getHitPower(attacker);
  if (getBlockPowers < getHitPowers) {
    getDamages = getHitPowers - getBlockPowers;

  }
  return getDamages;
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.floor(Math.random() * 2) + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.floor(Math.random() * 2) + 1;
  return fighter.defense * dodgeChance;
}
