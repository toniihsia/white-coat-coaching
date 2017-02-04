export const REQUEST_ALL_RESIDENCIES = "REQUEST_ALL_RESIDENCIES";
export const CREATE_RESIDENCY = "CREATE_RESIDENCY";
export const UPDATE_RESIDENCY = "UPDATE_RESIDENCY";
export const DELETE_RESIDENCY = "DELETE_RESIDENCY";
export const RECEIVE_ALL_RESIDENCIES = "RECEIVE_ALL_RESIDENCIES";

export const requestAllResidencies = () => ({
  type: REQUEST_ALL_RESIDENCIES
});

export const createResidency = (residency) => ({
  type: CREATE_RESIDENCY,
  residency
});

export const updateResidency = (residency) => ({
  type: UPDATE_RESIDENCY,
  residency
});

export const deleteResidency = (id) => ({
  type: DELETE_RESIDENCY,
  id
});

export const receiveAllResidencies = (residencies) => ({
  type: RECEIVE_ALL_RESIDENCIES,
  residencies
});
