/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  View, Text, Pressable, TextInput, Platform, UIManager, LayoutAnimation,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { DataContext } from '../App';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function Appbar() {
  const { data } = useContext(DataContext);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 32,
        position: 'relative',
      }}
    >
      {!searchBarOpen && (
      <View
        key="location"
        style={{
          ...{
            flexDirection: 'row',
            alignItems: 'center',
          },
          ...(searchBarOpen ? { width: 0, opacity: 0 } : {
            width: '90%',
            opacity: 1,
          }),
        }}
      >
        <FontAwesome5 name="map-marker-alt" size={20} color="white" />
        <Text
          style={{
            color: 'white',
            fontFamily: 'Nunito_700Bold',
            fontSize: 20,
            marginLeft: 10,
          }}
          numberOfLines={1}
        >
          <Text>{data.location.name}</Text>
          <Text
            style={{
              fontFamily: 'Nunito_400Regular',
            }}
          >
            {', '}
            {data.location.country}
          </Text>
        </Text>
      </View>
      )}
      <View
        key="icon"
      >
        <Pressable onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSearchBarOpen(!searchBarOpen);
        }}
        >
          <Feather name="search" size={24} color="white" />
        </Pressable>
      </View>
      {searchBarOpen && (
      <View
        key="searchbox"
        style={{
          ...{
            flex: 1,
          },
          ...(searchBarOpen ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }),
        }}
      >
        <TextInput
          autoFocus
          placeholder="Search location"
          style={{
            flex: 1,
            marginLeft: 12,
            color: 'white',
            fontFamily: 'Nunito_400Regular',
            fontSize: 16,
          }}
          placeholderTextColor="white"
        />
      </View>
      )}
    </View>
  );
}

export default Appbar;
