/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, createContext } from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/dev';
import { Provider } from 'react-native-paper';
import Background from './assets/bg.png';
import Hourly from './components/Hourly';
import TopSection from './components/TopSection';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export const DataContext = createContext();

const API_KEY = '3226026245ad4bd4a0d75052220405';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=johor&days=3&aqi=yes&alerts=no`,
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return data && fontsLoaded ? (
    <Provider>
      <DataContext.Provider value={{ data, setData }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ImageBackground
            source={Background}
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
            }}
            imageStyle={{
              resizeMode: 'cover',
            }}
          >
            <TopSection />
            <Hourly />
          </ImageBackground>
          <StatusBar translucent backgroundColor="transparent" />
        </View>
      </DataContext.Provider>
    </Provider>
  ) : null;
}
