import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";
import { VISIBILITY_FILTERS } from "../constants";

const VisibilityFilters = ({ setFilter }) => {
  return (
    <div>
      {Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={visibility}
            onClick={() => {
              setFilter(currentFilter);
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

export default VisibilityFilters;

// const mapStateToProps = state => {
//   return { activeFilter: state.visibilityFilter };
// };
// // export default VisibilityFilters;
// export default connect(
//   mapStateToProps,
//   { setFilter }
// )(VisibilityFilters);
