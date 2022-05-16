import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/dev";
import { FontAwesome, FontAwesome5, Feather } from "@expo/vector-icons";
import moment from "moment";
import Hmm from "./svg/wi-cloudy.svg";
import Background from "./assets/bg.png";
import iconMap from "./iconMap.json";
import * as Icons from "./svg";
import { MotiText, MotiView } from "moti";
import { Easing } from "react-native-reanimated";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const API_KEY = "3226026245ad4bd4a0d75052220405";

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
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=johor&days=3&aqi=yes&alerts=no`
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return data && fontsLoaded ? (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ImageBackground
        source={Background}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
        }}
        imageStyle={{
          resizeMode: "cover",
        }}
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding: 20,
              paddingTop: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="map-marker-alt" size={20} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Nunito_700Bold",
                    fontSize: 20,
                    marginLeft: 10,
                  }}
                  numberOfLines={1}
                >
                  <Text>{data.location.name}</Text>
                  <Text
                    style={{
                      fontFamily: "Nunito_400Regular",
                    }}
                  >
                    {", "}
                    {data.location.country}
                  </Text>
                </Text>
              </View>
              <Pressable>
                <Feather name="search" size={24} color="white" />
              </Pressable>
            </View>
            <MotiText
              from={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              delay={100}
              transition={{
                type: "timing",
                easing: Easing.inOut(Easing.ease),
                opacity: {
                  duration: 700,
                },
                translateY: {
                  duration: 500,
                },
              }}
              style={{
                color: "white",
                fontFamily: "Nunito_600SemiBold",
                fontSize: 96,
                marginTop: 32,
                marginLeft: 28,
                textShadowColor: "rgba(0, 0, 0, 0.1)",
                textShadowOffset: { width: -1, height: 5 },
                textShadowRadius: 20,
              }}
            >
              {data.current.temp_c}°
            </MotiText>
            <MotiText
              style={{
                color: "white",
                fontFamily: "Nunito_500Medium",
                fontSize: 20,
              }}
              from={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              delay={300}
              transition={{
                type: "timing",
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
            <MotiView
              from={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              delay={500}
              transition={{
                type: "timing",
                easing: Easing.inOut(Easing.ease),
                opacity: {
                  duration: 700,
                },
                translateY: {
                  duration: 500,
                },
              }}
              style={{
                flexDirection: "row",
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
                    color: "white",
                    fontFamily: "Nunito_500Medium",
                    textAlign: "center",
                    fontSize: 24,
                  }}
                >
                  {data.current.humidity}%
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Nunito_400Regular",
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
                    color: "white",
                    fontFamily: "Nunito_500Medium",
                    textAlign: "center",
                    fontSize: 24,
                  }}
                >
                  {data.current.wind_kph}km/h
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Nunito_400Regular",
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
                    color: "white",
                    fontFamily: "Nunito_500Medium",
                    textAlign: "center",
                    fontSize: 24,
                  }}
                >
                  {data.current.uv}
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Nunito_400Regular",
                  }}
                >
                  UV Index
                </Text>
              </View>
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              delay={700}
              transition={{
                type: "timing",
                easing: Easing.inOut(Easing.ease),
                opacity: {
                  duration: 700,
                },
                translateY: {
                  duration: 500,
                },
              }}
              style={{
                flexDirection: "row",
                marginTop: 32,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
                    color: "white",
                    marginLeft: 8,
                    fontFamily: "Nunito_600SemiBold",
                    fontSize: 20,
                  }}
                >
                  {data.forecast.forecastday[0].day.maxtemp_c}°C
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 46,
                }}
              >
                <FontAwesome name="caret-down" size={22} color="white" />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 8,
                    fontFamily: "Nunito_600SemiBold",
                    fontSize: 20,
                  }}
                >
                  {data.forecast.forecastday[0].day.mintemp_c}°C
                </Text>
              </View>
            </MotiView>
          </View>
          <StatusBar translucent backgroundColor="transparent" />
        </View>
        <MotiView
          from={{ opacity: 0.0, translateY: 1000 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0.0, translateY: 1000 }}
          delay={500}
          transition={{
            type: "timing",
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            opacity: {
              delay: 500,
            },
          }}
          style={{
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito_700Bold",
                color: "white",
                fontSize: 22,
              }}
            >
              Today
            </Text>
            <Text
              style={{
                fontFamily: "Nunito_600SemiBold",
                color: "white",
                fontSize: 16,
              }}
            >
              {moment(data.forecast.forecastday[0].date_epoch * 1000).format(
                "ddd, MMMM DD"
              )}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
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
                    alignItems: "center",
                    marginRight: index === 23 ? 28 : 24,
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 12,
                      fontFamily: "Nunito_700Bold",
                      color: "white",
                      fontSize: 13,
                    }}
                  >
                    {moment(item.time_epoch * 1000).format("hA")}
                  </Text>
                  {(() => {
                    const icon =
                      iconMap[
                        iconMap.findIndex((i) => item.condition.code === i.code)
                      ][item.is_day ? "dayIcon" : "nightIcon"];
                    //convert icon name to camel case
                    const iconName = icon.replace(/-([a-z])/g, (g) =>
                      g[1].toUpperCase()
                    );
                    const Icon = Icons[iconName];
                    return <Icon width="64" height="64" />;
                  })()}
                  <Text
                    style={{
                      marginTop: 12,
                      fontFamily: "Nunito_700Bold",
                      color: "white",
                      fontSize: 13,
                    }}
                  >
                    {item.temp_c.toFixed(1)}°
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </MotiView>
      </ImageBackground>
    </View>
  ) : null;
}
