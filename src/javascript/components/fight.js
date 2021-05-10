import { showWinnerModal } from './modal/winner';
import { controls } from '../../constants/controls';

var healthRightFighterPercent, healthLeftFighterPercent;
var isLeftFighterHasBlock = false;
var isRightFighterHasBlock = false;
var isLeftCriticalAttackEnabled = true;
var isRightCriticalAttackEnabled = true;


function runOnKeys(func, codes) {

  let pressed = new Set();
  document.addEventListener('keydown', function(event) {
    console.log('Codes ' + codes);
    pressed.add(event.code);
    for (let code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();
    func();
  });
  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });
}

function criticalOnLeftHero(selectedFighters) {
  if (!isLeftCriticalAttackEnabled) {
    return;
  }
  if (healthLeftFighterPercent === undefined) {
    healthLeftFighterPercent = 100 / selectedFighters[0].health;
  }
  selectedFighters[0].health -= selectedFighters[1].attack * 2;
  let hp = selectedFighters[0].health * healthLeftFighterPercent;
  if (selectedFighters[1].health <= 0) {
    // showModal('Left Win', 'Left win', hideModal());
  }
  document.getElementById('left-fighter-indicator').style.width = hp + '%';
  isLeftCriticalAttackEnabled = false;
  setTimeout(() => isLeftCriticalAttackEnabled = true, 10000);
}

function criticalOnRightHero(selectedFighters) {
  if (!isRightCriticalAttackEnabled) {
    return;
  }
  if (healthRightFighterPercent === undefined) {
    healthRightFighterPercent = 100 / selectedFighters[1].health;
  }
  selectedFighters[1].health -= selectedFighters[0].attack * 2;
  let hp = selectedFighters[1].health * healthRightFighterPercent;
  if (selectedFighters[1].health <= 0) {

  }
  console.log('Health  ' + selectedFighters[1].health + ' hp = ' + hp);
  isRightCriticalAttackEnabled = false;
  setTimeout(() => isRightCriticalAttackEnabled = true, 10000);
  document.getElementById('right-fighter-indicator').style.width = hp + '%';
}

function blockFighter(isBlock, firstFighter, secondFighter) {
  let getBlockPowers = getBlockPower(firstFighter);
  let getHitPowers = getHitPower(secondFighter);
  if (isBlock) {
    return 0;
  } else {
    return getDamage(firstFighter, secondFighter);
  }

}


export async function fight(firstFighter, secondFighter) {
  const selectedFighters = [firstFighter, secondFighter];
  runOnKeys(
    () => criticalOnRightHero(selectedFighters),
    controls.PlayerOneCriticalHitCombination
  );
  runOnKeys(
    () => criticalOnLeftHero(selectedFighters),
    controls.PlayerTwoCriticalHitCombination
  );


  document.addEventListener('keydown', function(event) {
    if (event.code === controls.PlayerOneBlock) {
      isLeftFighterHasBlock = true;
    }
    if (event.code === controls.PlayerTwoBlock) {
      isRightFighterHasBlock = true;
    }
  });

  document.addEventListener('keyup', function(event) {

    if (event.code === controls.PlayerOneBlock) {
      isLeftFighterHasBlock = false;
      return;
    }
    if (event.code === controls.PlayerTwoBlock) {
      isRightFighterHasBlock = false;
      return;
    }
    if (event.code === controls.PlayerOneAttack) {
      if (isLeftFighterHasBlock) {
        return;
      }
      if (healthRightFighterPercent === undefined) {
        healthRightFighterPercent = 100 / selectedFighters[1].health;
      }


      selectedFighters[1].health -= blockFighter(isRightFighterHasBlock, selectedFighters[1], selectedFighters[0]);
      let hp = selectedFighters[1].health * healthRightFighterPercent;

      //console.log('Eazy Health  ' + selectedFighters[1].health + 'Eazy hp = ' + hp);
      document.getElementById('right-fighter-indicator').style.width = hp + '%';

      if (selectedFighters[1].health <= 0) {
        showWinnerModal(selectedFighters[0]);
        // showModal('Left Win', 'Left win', hideModal());
      }
      return;
    }

    if (event.code === controls.PlayerTwoAttack) {
      if (isRightFighterHasBlock) {
        return;
      }
      if (healthLeftFighterPercent === undefined) {
        healthLeftFighterPercent = 100 / selectedFighters[0].health;
      }
      selectedFighters[0].health -= blockFighter(isLeftFighterHasBlock, selectedFighters[0], selectedFighters[1]);

      // console.log('getHitPower ' + getHitPower(selectedFighters[1]) + '  getBlockPower  ' + getBlockPower(selectedFighters[0]));

      let hp = selectedFighters[0].health * healthLeftFighterPercent;
      document.getElementById('left-fighter-indicator').style.width = hp + '%';

      if (selectedFighters[0].health <= 0) {
        showWinnerModal(selectedFighters[1]);

      }

    }

  });

  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    if (firstFighter.health <= 0) {
      resolve(firstFighter);
    } else if (secondFighter.health <= 0) {
      resolve(secondFighter);
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
  let criticalHitChance = Math.random() + 1;
  console.log('criticalHitChance ' + criticalHitChance);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}
