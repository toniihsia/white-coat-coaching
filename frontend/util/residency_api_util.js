export const fetchAllResidencies = (success, error) => {
  $.ajax({
    type: 'GET',
    url: 'api/residencies',
    success,
    error
  });
};

export const fetchResidency = (id, success, error) => {
  $.ajax({
    type: 'GET',
    url: `api/residencies/${id}`,
    success,
    error
  });
};

export const fetchSearchResidencies = (filters, success, error) => {
  $.ajax({
    method: 'GET',
    url: 'api/listings',
    data: { filters: filters },
    success,
    error
  });
};

export const createResidency = (residency, session_token, success, error) => {
  $.ajax({
    beforeSend: (request) => {request.setRequestHeader("Authorization", session_token)},
    type: 'POST',
    url: 'api/residencies',
    data: residency,
    success,
    error
  });
};

export const updateResidency = (residency, session_token, success, error) => {
  $.ajax({
    beforeSend: (request) => {request.setRequestHeader("Authorization", session_token)},
    type: 'PATCH',
    url: `api/residencies/${residency.id}`,
    data: residency,
    success,
    error
  });
};

export const deleteResidency = (id, session_token, success, error) => {
  $.ajax({
    beforeSend: (request) => {request.setRequestHeader("Authorization", session_token)},
    type: 'DELETE',
    url: `api/residencies/${id}`,
    success,
    error
  });
}

export const deleteResidencies = (ids, session_token, success, error) => {
  console.log("in deleteResidencies API:");
  console.log(ids);
  $.ajax({
    beforeSend: (request) => {request.setRequestHeader("Authorization", session_token)},
    type: 'DELETE',
    url: `api/residencies/destroy_multiple`,
    data: ids,
    success,
    error
  });
};
