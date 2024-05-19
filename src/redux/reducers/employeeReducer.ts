import * as actionTypes from '../actions/actionTypes';

const initialState = {
  employees: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
      };
    default:
      return state;
  }
};

export default employeeReducer;
