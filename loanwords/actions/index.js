export const STAR_WORD_CARD = "star_word_card";
export const UNSTAR_WORD_CARD = "unstar_word_card";
export const LEARN_WORD_CARD = "learn_word_card";
export const UNLEARN_WORD_CARD = "unlearn_word_card";
export const GET_NEXT_RANDOM_WORD_CARD = "get_next_random_word_card";

export function starCard(card) {
  return {
    type: STAR_WORD_CARD,
    card
  };
}

export function unstarCard(card) {
  return {
    type: UNSTAR_WORD_CARD,
    card
  };
}

export function getNextRandomCard() {
  return {
    type: GET_NEXT_RANDOM_WORD_CARD
  };
}

export function learnCard(card) {
  return {
    type: LEARN_WORD_CARD,
    card
  };
}

export function unlearnCard(card) {
  return {
    type: UNLEARN_WORD_CARD,
    card
  };
}
