export const fetchAllResidencies = (success, error) => {
  $.ajax({
    type: 'GET',
    url: 'api/residencies',
    success,
    error
  });
};

export const createResidency = (residency, success, error) => {
  $.ajax({
    type: 'POST',
    url: 'api/residencies',
    data: residency,
    success,
    error
  });
};

export const updateResidency = (residency, success, error) => {
  $.ajax({
    type: 'PATCH',
    url: `api/residencies/${residency.id}`,
    data: residency,
    success,
    error
  });
};

export const deleteResidency = (id, success, error) => {
  $.ajax({
    type: 'DELETE',
    url: `api/residencies/${id}`,
    success,
    error
  });
};
