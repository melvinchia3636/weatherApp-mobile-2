/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { View } from 'react-native';
import React from 'react';
import WeatherDegree from './WeatherDegree';
import MiscValue from './MiscValue';
import MinMaxDegree from './MinMaxDegree';

function TopSection() {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        position: 'relative',
        zIndex: 9990,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          padding: 20,
        }}
      >
        <WeatherDegree />
        <MiscValue />
        <MinMaxDegree />
      </View>
    </View>
  );
}

export default TopSection;
