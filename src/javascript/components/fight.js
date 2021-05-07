import { controls } from '../../constants/controls';
import { createVersusBlock } from './fighterSelector';

export async function fight(firstFighter, secondFighter) {
  const selectedFighters = [firstFighter,secondFighter];

  createVersusBlock(selectedFighters);
  return new Promise((resolve) => {

    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
}

export function getHitPower(fighter) {

  // return hit power
}

export function getBlockPower(fighter) {
  // return block power
}
