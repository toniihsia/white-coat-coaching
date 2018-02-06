export const getLocation = (location, success, error) => {
  return $.ajax({
    type: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAeC3isf0Dkq3njKGumaDZkeFx-3OWAYr8`,
    data: location,
    success,
    error
  });
};
