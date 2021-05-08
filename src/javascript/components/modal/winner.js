import { hideModal, showModal } from './modal';
import { createElement } from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';

export function showWinnerModal(fighter) {
  // call showModal function

  let title = fighter.name + "  WON!!", bodyElement =  createFighterImage(fighter), onClose = hideModal();

  showModal({title, bodyElement, onClose});
}
