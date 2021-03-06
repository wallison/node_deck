import {DeckCard} from '../entities/deck.card';
import {Deck} from '../../models';

export interface DeckService {
  generateNewDeck(): Deck;

  generateCardsForDeck(): DeckCard[];

  /**
   * @throws {Error}
   */
  drawCardsFromDeck(
    deck: Deck,
    count: number,
  ): {deck: Deck; drawnCards: DeckCard[]};
}
