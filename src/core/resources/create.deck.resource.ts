import {Deck} from '../../models';

export class CreateDeckResource {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public readonly deck_id: string;
  public readonly shuffled: boolean;
  public readonly remaining: number;

  constructor(obj: Deck) {
    this.deck_id = obj.id;
    this.shuffled = obj.shuffled;
    this.remaining = obj.cards.length;
  }
}
