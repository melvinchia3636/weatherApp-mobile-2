/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { MotiText } from 'moti';
import React, { useContext } from 'react';
import { Easing } from 'react-native-reanimated';
import { DataContext } from '../App';

function WeatherDegree() {
  const { data } = useContext(DataContext);

  return (
    <>
      <MotiText
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 100 }}
        delay={100}
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
          color: 'white',
          fontFamily: 'Nunito_600SemiBold',
          fontSize: 96,
          marginTop: 32,
          marginLeft: 28,
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: -1, height: 5 },
          textShadowRadius: 20,
        }}
      >
        {data.current.temp_c}
        °
      </MotiText>
      <MotiText
        style={{
          color: 'white',
          fontFamily: 'Nunito_500Medium',
          fontSize: 20,
        }}
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 100 }}
        delay={300}
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
      >
        {data.current.condition.text}
      </MotiText>
    </>
  );
}

export default WeatherDegree;
