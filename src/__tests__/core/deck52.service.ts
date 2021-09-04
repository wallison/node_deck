import {Deck52Service} from '../../core/services/deck52.service';
import {expect} from '@loopback/testlab';
import {DeckCard} from '../../core/entities/deck.card';
import {DeckRanks} from '../../core/constants/deck.ranks';
import {DeckSuits} from '../../core/constants/deck.suits';

describe('Deck52Service', () => {
  describe('Class DeckCard', () => {
    it('card should display correct object', () => {
      const card1 = new DeckCard({
        value: DeckRanks.ACE,
        suit: DeckSuits.SPADES,
      });
      expect(card1.cardObject).to.eql({
        value: 'ACE',
        suit: 'SPADES',
        code: 'AS',
      });

      const card2 = new DeckCard({
        value: DeckRanks.TEN,
        suit: DeckSuits.HEARTS,
      });
      expect(card2.cardObject).to.eql({
        value: '10',
        suit: 'HEARTS',
        code: '1H',
      });

      const card3 = new DeckCard({value: DeckRanks.TEN, suit: ''});
      expect(card3.cardObject.code).to.eql(undefined);
      expect(card3.cardObject).to.eql({value: '10', suit: '', code: undefined});
    });
  });

  describe('DeckService functions', () => {
    const deckService = new Deck52Service();

    it('should generate cards for deck', () => {
      expect(deckService.generateCardsForDeck().length).to.eql(52);
    });

    it('should generate new deck', () => {
      const newDeck = deckService.generateNewDeck();

      expect(newDeck.cards?.length).to.eql(52);
      expect(newDeck.shuffled).to.eql(false);
      expect(newDeck.id).to.eql(undefined);

      expect(Object.values(DeckRanks)).to.containEql(newDeck.cards[0].value);
      expect(Object.values(DeckSuits)).to.containEql(newDeck.cards[0].suit);
    });
  });
});
