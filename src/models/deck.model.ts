import {Entity, model, property} from '@loopback/repository';
import {DeckCard} from '../core/entities/deck.card';

@model({settings: {strict: false}})
export class Deck extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  shuffled: boolean;

  @property({
    type: 'array',
    itemType: 'object',
  })
  cards: DeckCard[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Deck>) {
    super(data);
  }
}

export interface DeckRelations {
  // describe navigational properties here
}

export type DeckWithRelations = Deck & DeckRelations;
