export const fetchAllResidencies = (success, error) => {
  $.ajax({
    type: 'GET',
    url: 'api/residencys',
    success,
    error
  });
};

export const createResidency = (residency, success, error) => {
  $.ajax({
    type: 'GET',
    url: 'api/users',
    data: residency,
    success,
    error
  });
};
};

export const updateResidency = (residency, success, error) => {
  $.ajax({
    type: 'GET',
    url: 'api/residency',
    data: residency,
    success,
    error
  });
};
};

export const deleteResidency = (id, success, error) => {
  $.ajax({
    type: 'DELETE',
    url: 'api/residency',
    data: id,
    success,
    error
  });
};
