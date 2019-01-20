import {
  starCard,
  getNextRandomCard,
  learnCard,
  unstarCard,
  unlearnCard
} from "./index";
import { CardStatus } from "../components/common/card-status";

export class CardStateActionMapper {
  static getDefaultMappings(dispatch) {
    return {
      loadRandomCard: () => {
        dispatch(getNextRandomCard());
      },
      starCard: currCard => {
        if (currCard.status === CardStatus.STARRED) {
          return dispatch(unstarCard(currCard));
        }
        dispatch(starCard(currCard));
      },
      learnCard: currCard => {
        if (currCard.status === CardStatus.LEARNED) {
          return dispatch(unlearnCard(currCard));
        }
        dispatch(learnCard(currCard));
      }
    };
  }
}
