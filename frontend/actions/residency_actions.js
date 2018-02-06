export const REQUEST_ALL_RESIDENCIES = "REQUEST_ALL_RESIDENCIES";
export const CREATE_RESIDENCY = "CREATE_RESIDENCY";
export const UPDATE_RESIDENCY = "UPDATE_RESIDENCY";
export const DELETE_RESIDENCY = "DELETE_RESIDENCY";
export const DELETE_RESIDENCIES = "DELETE_RESIDENCIES";
export const RECEIVE_ALL_RESIDENCIES = "RECEIVE_ALL_RESIDENCIES";
export const RECEIVE_RESIDENCY = "RECEIVE_RESIDENCY";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const requestAllResidencies = () => ({
  type: REQUEST_ALL_RESIDENCIES
});

export const createResidency = (residency, session_token) => ({
  type: CREATE_RESIDENCY,
  residency,
  session_token
});

export const updateResidency = (residency) => ({
  type: UPDATE_RESIDENCY,
  residency
});

export const deleteResidency = (id) => ({
  type: DELETE_RESIDENCY,
  id
});

export const deleteResidencies = (ids, session_token) => ({
  type: DELETE_RESIDENCIES,
  ids,
  session_token
});

export const receiveAllResidencies = (residencies) => ({
  type: RECEIVE_ALL_RESIDENCIES,
  residencies
});

export const receiveResidency = (residency) => ({
  type: RECEIVE_RESIDENCY,
  residency
})

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
