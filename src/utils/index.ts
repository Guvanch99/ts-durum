import {MAP_VALIDATION} from "../constants/regexes.constants";

export const randomId = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const upperCaseString = (str: string) => str.trim().toUpperCase()

export const modifiedEmail = (email: string) => {
  const firstThreeLetters = email.substring(0, 3)
  const afterAt = email.split('@')[1]
  return firstThreeLetters + '......@' + afterAt
}
export const generatePassword = () => Math.floor(Math.random() * 1000000 + 1)


export const throttle = (fn: any, ms: number) => {
  let isThrottle = false
  let savedArgs: any
  let savedThis: any

  function wrapper(this: any) {
    if (isThrottle) {
      savedArgs = arguments
      savedThis = this
      return
    }

    fn.apply(this, arguments)

    isThrottle = true

    setTimeout(() => {
      isThrottle = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = false
      }
    }, ms)
  }

  return wrapper
}

export const coordinatesGeocoder = function (query: string) {

  const matches = query.match(
    MAP_VALIDATION
  );
  if (!matches) {
    return null;
  }

  function coordinateFeature(lng: number, lat: number) {
    return {
      center: [lng, lat],
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      place_name: 'Lat: ' + lat + ' Lng: ' + lng,
      place_type: ['coordinate'],
      properties: {},
      type: 'Feature'
    };
  }

  const coord1 = Number(matches[1]);
  const coord2 = Number(matches[2]);
  const geocodes = [];

  if (coord1 < -90 || coord1 > 90)
    geocodes.push(coordinateFeature(coord1, coord2));

  if (coord2 < -90 || coord2 > 90)
    geocodes.push(coordinateFeature(coord2, coord1));


  if (geocodes.length === 0) {
    geocodes.push(coordinateFeature(coord1, coord2));
    geocodes.push(coordinateFeature(coord2, coord1));
  }

  return geocodes;
};