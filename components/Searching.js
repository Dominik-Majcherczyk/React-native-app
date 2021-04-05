import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../actions/index";
import { findCityWeatherInfo } from "../reducers/weather";
import { findCity } from "../reducers/city";
import { Divider, TouchableRipple, TextInput, FAB } from "react-native-paper";

const Searching = ({ setIndex }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const citiesData = useSelector((state) => state.citiesData);

  //console.log(input);
  useEffect(() => {
    dispatch(findCity(input));
  }, [input]);

  //console.log(citiesData.cities);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="type here to find city:"
        value={input}
        onChangeText={(text) => setInput(text)}
      ></TextInput>

      <ScrollView>
        {citiesData.cities != undefined ? (
          citiesData.cities.map((city) => {
            return (
              <View key={city.Key}>
                <TouchableRipple
                  onPress={() => {
                    dispatch(findCityWeatherInfo(city.Key));
                    dispatch(
                      setCity({
                        cityName: city.LocalizedName,
                        cityKey: city.Key,
                      })
                    );
                    setIndex(0);
                  }}
                  rippleColor="rgba(250, 127, 219, 0.73)"
                >
                  <View style={styles.searchItem}>
                    <Text>{city.LocalizedName}</Text>
                    <Text>{city.Country.LocalizedName}</Text>
                    <Text>Region: {city.AdministrativeArea.LocalizedName}</Text>
                  </View>
                </TouchableRipple>
                <Divider />
              </View>
            );
          })
        ) : (
          <Text>tutaj coś będzie przed rozpoczęciem wyszukiwania lokacji</Text>
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        small={false}
        icon="crosshairs-gps"
        onPress={() => console.log("Pressed")}
        type="string"
      />
    </View>
  );
};

export default Searching;

const styles = StyleSheet.create({
  appbar: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "red",
  },
  container: {
    flex: 2,
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#333333",
    color: "#fff",
  },
  fab: {
    position: "absolute",
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#6295f5",
  },
  searchItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
  },
  searchItemContent: {},
});
