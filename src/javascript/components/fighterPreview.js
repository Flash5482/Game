import { createElement } from '../helpers/domHelper';
import { fightersDetails } from '../helpers/mockData';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });


  // todo: show fighter info (image, name, health, etc.)
  if (fighter !== undefined) {
    if (position === 'right') {
      fighterElement.append(createFighterName(fighter),createFighterImage(fighter), createFighterInfo(fighter));
    } else {
      fighterElement.append(createFighterName(fighter),createFighterImage(fighter), createFighterInfo(fighter));
    }
  }
  return fighterElement;
}

function createFighterName(fighter) {

  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'preview-fighter' });
  const fighterName = createElement({ tagName: 'span', className: 'preview-fighter__name' });

  fighterName.innerText = name;
  container.append(fighterName);

  return container;
}

function createFighterInfo(fighter) {
  const container = createElement({ tagName: 'div', className: 'preview-fighter' });
  const fighterName = createElement({ tagName: 'span', className: 'preview-fighter__name' });
  const indicator = createElement({ tagName: 'div', className: 'preview-fighter-indicator' });

  const fighterSkills = fightersDetails.find(x => x._id === fighter._id);
  indicator.innerText = 'hp/ ' + fighterSkills.health + `\n attack/ ` + fighterSkills.attack;

  container.append(fighterName, indicator);
  return container;
}

export function createFighterImage(fighter) {

  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };

  const imgElement = createElement({
    tagName: 'img',
    className: `fighter-preview___img`,
    attributes
  });

  return imgElement;
}
