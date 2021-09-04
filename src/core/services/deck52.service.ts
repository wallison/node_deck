import {DeckCard} from '../entities/deck.card';
import {Deck} from '../../models';
import {DeckRanks} from '../constants/deck.ranks';
import {DeckSuits} from '../constants/deck.suits';
import {DeckService} from './deck.service';

export class Deck52Service implements DeckService {
  public generateNewDeck(): Deck {
    return new Deck({shuffled: false, cards: this.generateCardsForDeck()});
  }

  public generateCardsForDeck(): DeckCard[] {
    const cards = [];
    for (const rank of Object.values(DeckRanks)) {
      for (const suit of Object.values(DeckSuits)) {
        const card = new DeckCard({value: rank, suit: suit});
        cards.push(card);
      }
    }
    return cards;
  }

  public drawCardsFromDeck(deck: Deck, count: number): { deck: Deck; drawnCards: DeckCard[] } {
    return {deck, drawnCards: []};
  }
}
