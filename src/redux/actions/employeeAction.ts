import * as actionTypes from './actionTypes';

export const getAllEmployees = () => {
  const url = 'http://localhost:3000/employees';
  return {
    type: actionTypes.GET_ALL_EMPLOYEES,
    payload: {
      method: 'GET',
      // attachAuthToHeader: true,
      url,
      headers: {
        // showLoading: true,
      },
    },
    options: {
      onSuccess({ dispatch, response }): any {
        if (response.data) {
          const employees = response.data?.results;
          dispatch({
            type: actionTypes.GET_ALL_EMPLOYEES,
            employees: employees,
          });
          return employees;
        }
      },
      onError({ error }): any {
        throw error;
      },
    },
  };
};
