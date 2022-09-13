//TODO Place this in folder hooks/utilisis?
const UseCurrentLocation = async () => {
  let error = "";
  let location = "";

  const handleError = (error) => {
    console.log(error);
    return error;
  };

  function getPosition() {
    return new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(resolve, handleError)
    );
  }

  if (!navigator.geolocation) {
    error = "Geolocation is not supported.";
    return error;
  }
  // Call the Geolocation API
  location = await getPosition(); /* console.log(location); */
  /*   navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
   */
  return location;
};

export default UseCurrentLocation;
