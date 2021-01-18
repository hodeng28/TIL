import { VISIBILITY_FILTERS } from "../constants";

// 작성중

const SET_FILTER = "visibilityFilter/SET_FILTER";

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
});

const initialState = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;
