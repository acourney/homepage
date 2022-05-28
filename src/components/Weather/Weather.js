import React, { useEffect, useState } from "react";

function Weather(props) {
  const apiKey = "e066e3519bfea8228d8e4d4c9f5f8ce0";

  const [city, setCity] = useState();
  const [currentTemp, setCurrentTemp] = useState();
  const [loTemp, setLoTemp] = useState();
  const [hiTemp, setHiTemp] = useState();
  const [currentCondition, setCurrentCondition] = useState();

  const [loading, setLoading] = useState(true);

  const initialState = {
    zipcode: "",
  };
  const [formState, setFormState] = useState(initialState);

  const handleChangeSubject = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the data in the component state
    console.log(formState);
    // clear the form
    // setFormState(initialState);
  };

  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${formState.zipcode},us&units=imperial&appid=${apiKey}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //display information to the screen
        console.log(data);
        const cityName = data.name;
        const temp = data.main.temp;
        const minTemp = data.main.temp_min;
        const maxTemp = data.main.temp_max;
        const conditions = data.weather[0].main;

        setCity(cityName);
        setCurrentTemp(temp);
        setLoTemp(minTemp);
        setHiTemp(maxTemp);
        setCurrentCondition(conditions);

        setLoading(false);
      });
  }, [handleSubmit]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="zipcode">Zip Code:</label>
        <input
          id="zipcode"
          onChange={handleChangeSubject}
          value={formState.zipcode}
        ></input>
        <button type="submit">Check Weather</button>
      </form>
      {loading === false ? (
        <div>
          The temperature right now in {city} is {currentTemp} &#176;F. Today's
          low temperature is {loTemp}&#176;F. Today's high temperature is{" "}
          {hiTemp}&#176;F. Conditions today: {currentCondition}
        </div>
      ) : (
        <div>...</div>
      )}
    </div>
  );
}

export default Weather;
