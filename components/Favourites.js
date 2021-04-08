import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB, Divider, TouchableRipple, TextInput } from "react-native-paper";
import { setCity } from "../actions/index";
import { findCityWeatherInfo } from "../reducers/weather";
//local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const Favourites = ({ setIndex }) => {
  const dispatch = useDispatch();
  const [keys, setKeys] = useState(null);
  const [favs, setFavs] = useState(null);

  //get keys from storage
  const getAllKeys = async () => {
    let storageKeys = [];
    try {
      storageKeys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(e);
    }
    setKeys(storageKeys);

    console.log(storageKeys);
  };

  //clearing storage
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }

    console.log("Done.");
  };

  useEffect(() => {
    keys != null ? getValuesForKeys(keys) : null;
  }, [keys]);

  useEffect(() => {
    getAllKeys();
  }, []);

  // get data from storage
  const getValuesForKeys = async () => {
    let values;
    try {
      values = await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log(e);
    }
    setFavs(values);
  };

  return (
    <View style={styles.container}>
      <Text>Fav zones:</Text>
      {favs != null ? (
        favs.map((fav) => {
          return (
            <View key={fav[0]} style={styles.content}>
              <TouchableRipple
                onPress={() => {
                  dispatch(findCityWeatherInfo(JSON.parse(fav[1]).cityKey));
                  dispatch(
                    setCity({
                      cityName: JSON.parse(fav[1]).cityName,
                      cityKey: JSON.parse(fav[1]).cityKey,
                    })
                  );
                  setIndex(0);
                }}
                rippleColor="rgba(250, 127, 219, 0.73)"
              >
                <View style={styles.singleItem}>
                  <Text>{JSON.parse(fav[1]).cityName}</Text>
                  <FAB
                    style={styles.fab}
                    small={false}
                    icon="delete-outline"
                    onPress={() => {
                      console.log("unfav");
                    }}
                    type="string"
                  />
                </View>
              </TouchableRipple>
            </View>
          );
        })
      ) : (
        <Text>No favs sets yet!</Text>
      )}

      {/* <FAB
        style={styles.fab}
        small={false}
        icon="heart"
        onPress={() => {
          // clearAll();

          console.log("xdddd");
        }}
        type="string"
      /> */}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  singleItem: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchItemContent: {},
});
