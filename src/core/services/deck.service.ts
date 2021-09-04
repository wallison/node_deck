import {DeckCard} from '../entities/deck.card';
import {Deck} from '../../models';

export interface DeckService {
  generateNewDeck(): Deck;

  generateCardsForDeck(): DeckCard[];

  drawCardsFromDeck(deck: Deck, count: number): {deck: Deck, drawnCards: DeckCard[]};
}
