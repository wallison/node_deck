import {Deck} from '../../models';
import {DeckCard} from '../entities/deck.card';

export class OpenDeckResource {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public readonly deck_id: string;
  public readonly shuffled: boolean;
  public readonly remaining: number;
  public readonly cards: DeckCard[];

  constructor(obj: Deck) {
    this.deck_id = obj.id;
    this.shuffled = obj.shuffled;
    this.remaining = obj.cards.length;
    this.cards = obj.cards;
  }
}
