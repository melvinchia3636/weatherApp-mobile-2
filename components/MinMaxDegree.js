/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { DataContext } from '../App';

function MinMaxDegree() {
  const { data } = useContext(DataContext);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 100 }}
      delay={700}
      transition={{
        type: 'timing',
        easing: Easing.inOut(Easing.ease),
        opacity: {
          duration: 700,
        },
        translateY: {
          duration: 500,
        },
      }}
      style={{
        flexDirection: 'row',
        marginTop: 32,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FontAwesome
          name="caret-up"
          size={22}
          color="white"
          style={{
            marginTop: -1,
          }}
        />
        <Text
          style={{
            color: 'white',
            marginLeft: 8,
            fontFamily: 'Nunito_600SemiBold',
            fontSize: 20,
          }}
        >
          {data.forecast.forecastday[0].day.maxtemp_c}
          °C
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 46,
        }}
      >
        <FontAwesome name="caret-down" size={22} color="white" />
        <Text
          style={{
            color: 'white',
            marginLeft: 8,
            fontFamily: 'Nunito_600SemiBold',
            fontSize: 20,
          }}
        >
          {data.forecast.forecastday[0].day.mintemp_c}
          °C
        </Text>
      </View>
    </MotiView>
  );
}

export default MinMaxDegree;
