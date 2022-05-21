/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { Easing } from 'react-native-reanimated';
import { MotiView } from 'moti';
import { DataContext } from '../App';

function MiscValue() {
  const { data } = useContext(DataContext);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 100 }}
      delay={500}
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
          flex: 1,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontFamily: 'Nunito_500Medium',
            textAlign: 'center',
            fontSize: 24,
          }}
        >
          {data.current.humidity}
          %
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Nunito_400Regular',
          }}
        >
          Humidity
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontFamily: 'Nunito_500Medium',
            textAlign: 'center',
            fontSize: 24,
          }}
        >
          {data.current.wind_kph}
          km/h
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Nunito_400Regular',
          }}
        >
          Wind Speed
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontFamily: 'Nunito_500Medium',
            textAlign: 'center',
            fontSize: 24,
          }}
        >
          {data.current.uv}
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Nunito_400Regular',
          }}
        >
          UV Index
        </Text>
      </View>
    </MotiView>
  );
}

export default MiscValue;
