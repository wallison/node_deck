import {Deck52Service} from '../../core/services/deck52.service';
import {expect} from '@loopback/testlab';
import {DeckCard} from '../../core/entities/deck.card';
import {DeckRanks} from '../../core/constants/deck.ranks';
import {DeckSuits} from '../../core/constants/deck.suits';

describe('Deck52Service', () => {
  const deckService = new Deck52Service();

  describe('Class DeckCard', () => {
    it('cardObject should display correct object', () => {
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

  describe('Deck52Service generateNewDeck', () => {
    it('should generate 52 cards', () => {
      expect(deckService.generateCardsForDeck().length).to.eql(52);
    });

    it('should generate new deck with 52 cards', () => {
      const newDeck = deckService.generateNewDeck();

      expect(newDeck.cards?.length).to.eql(52);
      expect(newDeck.shuffled).to.eql(false);
      expect(newDeck.id).to.eql(undefined);
    });

    it('should generate cards related to DeckRanks and DeckSuits', () => {
      const newDeck = deckService.generateNewDeck();

      newDeck.cards.forEach(card => {
        expect(Object.values(DeckRanks)).to.containEql(card.value);
        expect(Object.values(DeckSuits)).to.containEql(card.suit);
      });
    });
  });

  describe('Deck52Service drawCardFromDeck', () => {
    it('should draw 2 cards from a deck', () => {
      const newDeck = deckService.generateNewDeck();
      expect(newDeck.cards?.length).to.eql(52);

      const drawnObject = deckService.drawCardsFromDeck(newDeck, 2);

      expect(drawnObject.deck.cards.length).to.eql(50);
      expect(drawnObject.drawnCards.length).to.eql(2);
    });

    it('should draw all cards from a new deck', () => {
      const newDeck = deckService.generateNewDeck();
      expect(newDeck.cards?.length).to.eql(52);

      const drawnObject = deckService.drawCardsFromDeck(newDeck, 52);

      expect(drawnObject.deck.cards.length).to.eql(0);
      expect(drawnObject.drawnCards.length).to.eql(52);
    });

    it('should give a error when try to draw more cards than a deck has', () => {
      const newDeck = deckService.generateNewDeck();
      expect(newDeck.cards?.length).to.eql(52);

      try {
        expect(deckService.drawCardsFromDeck(newDeck, 53)).to.throw();
      } catch (error) {
        expect(error.message).to.be.eql('Count bigger than number of cards.');
      }

      expect(newDeck.cards?.length).to.eql(52);
    });
  });
});
