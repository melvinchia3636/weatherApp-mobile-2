/* eslint-disable require-jsdoc */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { View, Text, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import moment from 'moment';
import { DataContext } from '../App';

import iconMap from '../svg/iconMap.json';
import * as Icons from '../svg';

function Hourly() {
  const { data } = useContext(DataContext);

  return (
    <MotiView
      from={{ opacity: 0.0, translateY: 1000 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0.0, translateY: 1000 }}
      delay={500}
      transition={{
        type: 'timing',
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        opacity: {
          delay: 500,
        },
      }}
      style={{
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'Nunito_700Bold',
            color: 'white',
            fontSize: 22,
          }}
        >
          Today
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito_600SemiBold',
            color: 'white',
            fontSize: 16,
          }}
        >
          {moment(data.forecast.forecastday[0].date_epoch * 1000).format(
            'ddd, MMMM DD',
          )}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 6,
          marginBottom: 24,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingHorizontal: 20,
          }}
        >
          {data.forecast.forecastday[0].hour.map((item, index) => (
            <View
              key={item.time_epoch}
              style={{
                alignItems: 'center',
                marginRight: index === 23 ? 28 : 24,
              }}
            >
              <Text
                style={{
                  marginBottom: 12,
                  fontFamily: 'Nunito_700Bold',
                  color: 'white',
                  fontSize: 13,
                }}
              >
                {moment(item.time_epoch * 1000).format('hA')}
              </Text>
              {(() => {
                const icon = iconMap[
                  iconMap.findIndex((i) => item.condition.code === i.code)
                ][item.is_day ? 'dayIcon' : 'nightIcon'];
                // convert icon name to camel case
                const iconName = icon.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                const Icon = Icons[iconName];
                return <Icon width="64" height="64" />;
              })()}
              <Text
                style={{
                  marginTop: 12,
                  fontFamily: 'Nunito_700Bold',
                  color: 'white',
                  fontSize: 13,
                }}
              >
                {item.temp_c.toFixed(1)}
                °
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </MotiView>
  );
}

export default Hourly;
