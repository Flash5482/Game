import { createElement } from '../helpers/domHelper';
import { createHealthIndicator } from './arena';
import { fightersDetails } from '../helpers/mockData';
import { createVersusBlock } from './fighterSelector';
import { fight } from './fight';

export function createFighterPreview(fighter, position) {


  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  //fighterElement.innerHTML=  `<img src='https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif'>`;
console.log("!!!!!!"+fighter);

  // todo: show fighter info (image, name, health, etc.)

  if(fighter!==undefined){

    const fightersPreviewLeft = document.querySelector('.fighter-preview___left');
    fightersPreviewLeft.append(createFighterName(fighter),/*createHealthIndicator(fighter, 'left'),*/createFighterImage(fighter),createFighterInfo(fighter));

    console.log( );
    console.log(fighter.name);
    const fightersPreviewRight = document.querySelector('.fighter-preview___right');
    fightersPreviewRight.append(createFighterName(fighter),/*createHealthIndicator(fighter, 'right'),*/createFighterImage(fighter),createFighterInfo(fighter));


   /* const fightersPreviewLeftImg = document.querySelector('.fighter-preview___img');
    fightersPreviewLeftImg.before(createHealthIndicator(fighter, position));

    const fightersPreviewRightImg = document.querySelector('.fighter-preview___img');
    fightersPreviewRightImg.before(createHealthIndicator(fighter, position));*/
  }
  return fighterElement;
}

function createFighterName(fighter){

    const { name } = fighter;
    const container = createElement({ tagName: 'div', className: 'preview-fighter' });
    const fighterName = createElement({ tagName: 'span', className: 'preview-fighter__name' });

    fighterName.innerText = name;
    container.append(fighterName);

    return container;
}

function createFighterInfo(fighter) {
  //const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'preview-fighter' });
  const fighterName = createElement({ tagName: 'span', className: 'preview-fighter__name' });
  const indicator = createElement({ tagName: 'div', className: 'preview-fighter-indicator' });

  //fighterName.innerText = name;
  const fighterSkills = fightersDetails.find(x => x._id === fighter._id);
  indicator.innerText='hp/ '+fighterSkills.health +`\n attack/ `+ fighterSkills.attack;
  //indicator.innerHTML='hp/ '+fightersDetails.find(x => x._id === fighter._id).health;
  //const selectedFighters = [fighter,fighter];

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

    attributes,
  });


  return imgElement;
}
