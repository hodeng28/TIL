import { VISIBILITY_FILTERS } from "../../constants";
import { SET_FILTER } from "../actions";

const initialState = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, aciton) => {
  switch (aciton.type) {
    case SET_FILTER: {
      return aciton.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;
