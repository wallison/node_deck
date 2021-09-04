export class DeckCard {
  private readonly suit: string;
  private readonly value: string;
  private readonly code: string;

  constructor(obj: {value: string, suit: string}) {
    this.value = obj.value;
    this.suit = obj.suit;
    if (this.value?.length && this.suit?.length) {
      this.code = `${this.value[0]}${this.suit[0]}`
    }
  }

  get cardObject(): {value: string, suit: string, code: string } {
    return {value: this.value, suit: this.suit, code: this.code};
  }
}