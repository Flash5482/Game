import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { getBlockPower, getHitPower } from './fight';

var healthRightFighterPercent, healthLeftFighterPercent;
var isLeftFighterHasBlock = false;
var isRightFighterHasBlock = false;
var isLeftCriticalAttackEnabled = true;
var isRightCriticalAttackEnabled = true;


function runOnKeys(func, ...codes) {
  let pressed = new Set();
  document.addEventListener('keydown', function(event) {
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
  setTimeout(() =>isLeftCriticalAttackEnabled = true , 10000);
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
  setTimeout(() =>isRightCriticalAttackEnabled = true , 10000);
  document.getElementById('right-fighter-indicator').style.width = hp + '%';
}

function blockFighter(isBlock, firstFighter, secondFighter) {
  let getBlockPowers = getBlockPower(firstFighter);
  let getHitPowers = getHitPower(secondFighter);
  if (isBlock) {
    if (getBlockPowers > getHitPowers) {
      return 0;
    } else {
      return getHitPowers - getBlockPowers;
    }
  } else {
    return getHitPowers;
  }
}

export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);

  // todo:
  // - start the fight
  runOnKeys(
    () => criticalOnRightHero(selectedFighters),
    'KeyQ',
    'KeyW',
    'KeyE'
  );
  runOnKeys(
    () => criticalOnLeftHero(selectedFighters),
    'KeyU',
    'KeyI',
    'KeyO'
  );


  document.addEventListener('keydown', function(event) {
    if (event.key === 'd') {
      isLeftFighterHasBlock = true;
    }
    if (event.key === 'l') {
      isRightFighterHasBlock = true;
    }
  });

  document.addEventListener('keyup', function(event) {
    if (event.key === 'd') {
      isLeftFighterHasBlock = false;
    }
    if (event.key === 'l') {
      isRightFighterHasBlock = false;
    }
    if (event.key === 'a') {
      
      if (healthRightFighterPercent === undefined) {
        healthRightFighterPercent = 100 / selectedFighters[1].health;
      }

      if (selectedFighters[1].health <= 0) {
        // showModal('Left Win', 'Left win', hideModal());

      }
      selectedFighters[1].health -= blockFighter(isRightFighterHasBlock, selectedFighters[1], selectedFighters[0]);
      let hp = selectedFighters[1].health * healthRightFighterPercent;

      console.log('Eazy Health  ' + selectedFighters[1].health + 'Eazy hp = ' + hp);
      document.getElementById('right-fighter-indicator').style.width = hp + '%';
    }

    if (event.key === 'j') {

      if (selectedFighters[0].health <= 0) {
        //showModal('Left Win', 'Left win', hideModal());

      }
      if (healthLeftFighterPercent === undefined) {
        healthLeftFighterPercent = 100 / selectedFighters[0].health;
      }
      selectedFighters[0].health -= blockFighter(isLeftFighterHasBlock, selectedFighters[0], selectedFighters[1]);

      // console.log('getHitPower ' + getHitPower(selectedFighters[1]) + '  getBlockPower  ' + getBlockPower(selectedFighters[0]));

      let hp = selectedFighters[0].health * healthLeftFighterPercent;
      console.log(hp);
      document.getElementById('left-fighter-indicator').style.width = hp + '%';
      console.log('Good j');
    }

  });
  // - when fight is finished show winner
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');
  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

export function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({
    tagName: 'div', className: 'arena___health-bar',
    attributes: { id: `${position}-fighter-indicator` }
  });

  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`
  });

  fighterElement.append(imgElement);
  return fighterElement;


}
