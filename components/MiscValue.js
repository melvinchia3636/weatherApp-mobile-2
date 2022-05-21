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
      {[
        ['Humidity', `${data.current.humidity}%`],
        ['Wind Speed', `${data.current.wind_kph}km/h`],
        ['UV Index', data.current.uv],
      ].map(([label, value]) => (
        <View
          key={label}
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
            {value}
          </Text>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Nunito_400Regular',
            }}
          >
            {label}
          </Text>
        </View>
      ))}
    </MotiView>
  );
}

export default MiscValue;
