import React, { useState } from 'react';
import axios from 'axios';

const useWeatherStack = (location = 'Bulawayo') => {
  const [weatherData, setWeatherData] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const getWeatherForeCast = async () => {
    try {
      const { data } = await axios.get(
        `http://api.weatherstack.com/forecast?access_key=${ACCESS_KEY}&query=${
          searchTerm || location
        }`
      );

      if (data.error) {
        return setError(true);
      } else {
        const { current } = data;
        setWeatherData(true);
        setWeather(current);
      }
    } catch (error) {
      throw new Error(error.stack);
    }
  };

  return [weather, weatherData];
};

export default useWeatherStack;
