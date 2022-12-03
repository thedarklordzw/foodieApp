import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Text, Image, StyleSheet, View, FlatList } from 'react-native';
import { ACCESS_KEY } from '../util/helper';
import axios from 'axios';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState(false);
  const [weather, setWeather] = useState({});

  const getWeatherForeCast = async (place = 'Bulawayo') => {
    try {
      const { data } = await axios.get(
        `http://api.weatherstack.com/forecast?access_key=${ACCESS_KEY}&query=${
          searchTerm || place
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

  useEffect(() => {
    getWeatherForeCast();

    console.log(weather.weather_icons);
  }, []);

  const onSearchTerm = search => {
    setSearchTerm(search);
  };

  const termSubmitHandler = () => {
    getWeatherForeCast();
  };

  const image = weatherData ? weather.weather_icons[0] : '';

  return (
    <>
      <SearchBar onSearch={onSearchTerm} onSubmit={termSubmitHandler} />
      {error && (
        <Text style={{ color: '#181e29' }}>
          Something went wrong, please try again
        </Text>
      )}
      {!error && weatherData && weather ? (
        <>
          <Text>Cloud cover is {weather.cloudcover}</Text>
          <Text>Feels like {weather.feelslike} degrees Celsius</Text>
          <Image source={image} alt='weather icon' />
        </>
      ) : (
        <Text>Working on it</Text>
      )}
    </>
  );
};

export default SearchScreen;
