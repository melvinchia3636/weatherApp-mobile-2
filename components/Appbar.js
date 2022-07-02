/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  View, Text, Pressable, TextInput, Platform, UIManager, LayoutAnimation, ScrollView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { TouchableRipple } from 'react-native-paper';
import { API_KEY, DataContext } from '../App';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function Appbar({ fetchData }) {
  const { data } = useContext(DataContext);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults([]);
    if (!query) return () => {};

    fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`)
      .then((res) => res.json())
      .then((e) => setSearchResults(e));

    return () => {};
  }, [query]);

  return (
    <MotiView
      style={{
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 9999,
        position: 'relative',
      }}
      from={{ opacity: 0.0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.0 }}
      transition={{
        type: 'timing',
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {!searchBarOpen && (
        <View
          key="location"
          style={{
            flexDirection: 'row',
          }}
        >
          <FontAwesome5 name="map-marker-alt" size={20} color="white" />
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito_700Bold',
              fontSize: 20,
              marginTop: -3,
              marginLeft: 10,
              width: '80%',
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
            flex: 1,
          }}
        >
          <TextInput
            autoFocus
            placeholder="Search location"
            value={query}
            onChangeText={setQuery}
            style={{
              flex: 1,
              marginLeft: 12,
              color: 'white',
              fontFamily: 'Nunito_400Regular',
              fontSize: 16,
            }}
            placeholderTextColor="white"
            selectionColor="white"
          />
        </View>
        )}

      </View>
      {searchResults.length ? (
        <ScrollView style={{
          backgroundColor: 'white',
          width: '100%',
          height: 300,
          borderRadius: 8,
          elevation: 8,
          paddingHorizontal: 16,
          zIndex: 9999,
          marginTop: 16,
        }}
        >
          {searchResults.map((e, i) => (
            <TouchableRipple
              key={e.name}
              onPress={() => {
                setQuery('');
                setSearchBarOpen(false);
                fetchData([e.name, e.region, e.country].filter((s) => s).join(', '));
              }}
              style={{
                borderBottomWidth: Number(i !== searchResults.length - 1),
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Nunito_400Regular',
                  fontSize: 16,
                  padding: 12,
                }}
                numberOfLines={1}
              >
                {[e.name, e.region, e.country].filter((s) => s).join(', ')}
              </Text>
            </TouchableRipple>
          ))}
        </ScrollView>
      ) : null}
    </MotiView>
  );
}

export default Appbar;
