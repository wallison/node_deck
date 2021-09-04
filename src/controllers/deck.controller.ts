import {repository} from '@loopback/repository';
import {post, param, get, patch, requestBody, response} from '@loopback/rest';
import {Deck} from '../models';
import {DeckRepository} from '../repositories';
import {Deck52Service} from '../core/services/deck52.service';
import {DeckService} from '../core/services/deck.service';
import {OpenDeckResource} from '../core/resources/open.deck.resource';
import {CreateDeckResource} from '../core/resources/create.deck.resource';
import {DrawDeckResource} from '../core/resources/draw.deck.resource';

export class DeckController {
  private deckService: DeckService;
  constructor(
    @repository(DeckRepository)
    public deckRepository: DeckRepository,
  ) {
    this.deckService = new Deck52Service();
  }

  @post('/deck-create')
  @response(200, {
    description: 'Deck model creation',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            deck_id: {type: 'string'},
            shuffled: {type: 'boolean'},
            remaining: {type: 'number'},
          },
        },
      },
    },
  })
  async create(): Promise<CreateDeckResource> {
    const deck = this.deckService.generateNewDeck();
    const savedDeck = await this.deckRepository.create(deck);
    return new CreateDeckResource(savedDeck);
  }

  @get('/deck-open/{deck_id}')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            deck_id: {type: 'string'},
            shuffled: {type: 'boolean'},
            remaining: {type: 'number'},
            cards: {type: 'object'},
          },
        },
      },
    },
  })
  async openById(
    @param.path.string('deck_id') id: string,
  ): Promise<OpenDeckResource> {
    const deck = await this.deckRepository.findById(id);
    return new OpenDeckResource(deck);
  }

  @patch('/deck-draw/{deck_id}')
  @response(204, {
    description: 'Deck PATCH success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            cards: {type: 'object'},
          },
        },
      },
    },
  })
  async updateById(
    @param.path.string('deck_id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              count: {type: 'number'},
            },
          },
        },
      },
      required: true,
    })
    body: {count: number},
  ): Promise<DrawDeckResource> {
    const deck: Deck = await this.deckRepository.findById(id);

    const drawnObject = this.deckService.drawCardsFromDeck(deck, body.count);
    await this.deckRepository.updateById(id, {cards: drawnObject.deck.cards});

    return new DrawDeckResource(drawnObject.drawnCards);
  }
}
