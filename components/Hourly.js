/* eslint-disable require-jsdoc */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  View, Text, ScrollView, Pressable,
} from 'react-native';
import React, { useContext } from 'react';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import moment from 'moment';
import {
  Entypo,
} from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import { DataContext } from '../App';

import iconMap from '../svg/iconMap.json';
import * as Icons from '../svg';

const DAYS = ['Today', 'Tomorrow', 'Day after tomorrow'];

function Hourly() {
  const { data } = useContext(DataContext);
  const [visible, setVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
        zIndex: 9998,
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
        <View style={{
          flex: 1,
        }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={(
              <Pressable
                onPress={openMenu}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '90%',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito_700Bold',
                    color: 'white',
                    fontSize: 22,
                  }}
                >
                  {DAYS[selectedDate]}
                </Text>
                <Entypo
                  name="chevron-down"
                  size={20}
                  color="white"
                  style={{
                    marginTop: 4,
                    marginLeft: 8,
                  }}
                />
              </Pressable>
          )}
          >
            {data.forecast.forecastday.map((day, index) => (
              <Menu.Item
                key={day.date_epoch}
                onPress={() => {
                  setSelectedDate(index);
                  closeMenu();
                }}
                title={(
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{
                      fontFamily: 'Nunito_700Bold',
                      fontSize: 16,
                      width: 166,
                    }}
                    >
                      {DAYS[index]}
                    </Text>
                    {index === selectedDate && (
                    <Svg
                      style={{
                        marginTop: 2,
                      }}
                      width={24}
                      height={24}
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <Path fill="black" d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47Z" />
                    </Svg>
                    )}
                  </View>
              )}
              />
            ))}
          </Menu>
        </View>
        <Text
          style={{
            fontFamily: 'Nunito_600SemiBold',
            color: 'white',
            fontSize: 16,
          }}
        >
          {moment(data.forecast.forecastday[selectedDate].date_epoch * 1000).format(
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
          {data.forecast.forecastday[selectedDate].hour.map((item, index) => (
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
