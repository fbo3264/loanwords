import {
  STAR_WORD_CARD,
  GET_NEXT_RANDOM_WORD_CARD,
  LEARN_WORD_CARD,
  UNLEARN_WORD_CARD,
  UNSTAR_WORD_CARD
} from "../actions";
import { CardStatus } from "../components/common/card-status";
const wordlist = require("../data/wordlist.json");

const initialState = {
  starredCards: [],
  learnedCards: [],
  currentRandomCard: {},
  availableCards: wordlist
};

export default function entries(state = initialState, action) {
  switch (action.type) {
    case GET_NEXT_RANDOM_WORD_CARD:
      const availableCards = state.availableCards.filter(
        availableCard =>
          state.starredCards.findIndex(
            starredCard => starredCard.id === availableCard.id
          ) < 0
      );
      console.log(`Number of available cards: ${availableCards.length}`);
      const currentRandomCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];

      return {
        ...state,
        currentRandomCard
      };
    case UNSTAR_WORD_CARD:
      action.card.status = CardStatus.AVAILABLE;
      return {
        ...state,
        availableCards: [...state.availableCards, action.card],
        starredCards: state.starredCards.filter(c => c.id !== action.card.id)
      };
    case STAR_WORD_CARD:
      action.card.status = CardStatus.STARRED;
      return {
        ...state,
        availableCards: state.availableCards.filter(
          c => c.id !== action.card.id
        ),
        starredCards: [...state.starredCards, action.card]
      };
    case UNLEARN_WORD_CARD:
      action.card.status = CardStatus.STARRED;
      return {
        ...state,
        starredCards: [...state.starredCards, action.card],
        learnedCards: state.learnedCards.filter(c => c.id !== action.card.id)
      };
    case LEARN_WORD_CARD:
      action.card.status = CardStatus.LEARNED;
      return {
        ...state,
        starredCards: state.starredCards.filter(c => c.id !== action.card.id),
        learnedCards: [...state.learnedCards, action.card]
      };

    default:
      console.log("returning default state");
      return state;
  }
}
