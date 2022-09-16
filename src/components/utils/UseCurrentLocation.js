//TODO Place this in folder hooks/utilisis?
const UseCurrentLocation = async () => {
  let error = "";
  let location = "";

  const handleError = (error) => {
    console.log(error);
    return error;
  };

  function getPosition() {
    return new Promise(
      (resolve) =>
        navigator.geolocation.getCurrentPosition(resolve, handleError)
      //navigator.geolocation.watchPosition(resolve, handleError)
    );
  }

  if (!navigator.geolocation) {
    error = "Geolocation is not supported.";
    return error;
  }
  // Call the Geolocation API
  location = await getPosition();
  return location;
};

export default UseCurrentLocation;
