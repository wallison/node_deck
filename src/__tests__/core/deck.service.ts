import {DeckService} from '../../core/services/deck.service';
import {expect} from '@loopback/testlab';
import {DeckCard} from '../../core/entities/deck.card';
import {DeckRanks} from '../../core/constants/deck.ranks';
import {DeckSuits} from '../../core/constants/deck.suits';

describe('DeckService', () => {

  describe('Class DeckCard', () => {
    it('card should display correct object', () => {
      const card1 = new DeckCard({value: DeckRanks.ACE, suit: DeckSuits.SPADES});
      expect(card1.cardObject).to.eql({value: 'ACE', suit: 'SPADES', code: 'AS'});

      const card2 = new DeckCard({value: DeckRanks.TEN, suit: DeckSuits.HEARTS});
      expect(card2.cardObject).to.eql({value: '10', suit: 'HEARTS', code: '1H'});

      const card3 = new DeckCard({value: DeckRanks.TEN, suit: ''});
      expect(card3.cardObject.code).to.eql(undefined);
      expect(card3.cardObject).to.eql({value: '10', suit: '', code: undefined});
    });
  });

  describe('DeckService functions', () => {
    const deckService = new DeckService();

    it('generate deck', () => {
      expect(deckService.generateCardsForDeck()).to.eql([]);
    });
  });
});