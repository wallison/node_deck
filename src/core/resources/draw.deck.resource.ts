import {DeckCard} from '../entities/deck.card';

export class DrawDeckResource {
  public readonly cards: DeckCard[];

  constructor(cards: DeckCard[]) {
    this.cards = cards;
  }
}
