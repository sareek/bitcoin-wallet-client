const getLocationObject = data => {
  let country = '';
  let postal_code = '';
  let city = '';
  let state = '';
  let region = '';
  let formatted_address = '';
  let latitude = 37.7749295;
  let longitude = -122.41941550000001;
  let placeIdVal = "";
  let placeLabel = "";

  if(data) {
    const { placeId, gmaps, label, location } = data;
    placeLabel = label;
    placeIdVal = placeId;
    if(gmaps) {
      const { address_components } = gmaps;
      formatted_address = gmaps.formatted_address;
      address_components.map(address => {
        if (address.types.indexOf('postal_code') !== -1) {
          postal_code = address.long_name;
        }
        if (address.types.indexOf('country') !== -1) {
          country = address.long_name;
        }
        if (address.types.indexOf('administrative_area_level_1') !== -1) {
          state = address.long_name;
        }
        if (address.types.indexOf('administrative_area_level_2') !== -1) {
          region = address.long_name;
        }
        if (address.types.indexOf('locality') !== -1) { // maybe administrative_area_level_2
          city = address.long_name;
        }
      });
    }
    if(location) {
      const {lat, lng} = location;
      if(lat) {
        latitude = lat;
      }
      if(lng) {
        longitude = lng;
      }
    }
  }
  return {
    location: {
      city,
      state,
      postal_code,
      placeId: placeIdVal,
      country,
      region,
      formatted_address,
      label: placeLabel
    },
    coordinates: {
      latitude,
      longitude
    }
  }
};

export default getLocationObject;
