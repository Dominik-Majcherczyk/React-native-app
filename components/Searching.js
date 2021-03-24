import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { findCity } from "../reducers/city";
import { Appbar } from "react-native-paper";

const Searching = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState();

  function cityInputHandler() {
    dispatch(findCity(input));
    setInput("");
  }

  return (
    <View style={styles.container}>
      <Text>alulasdas</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text) => setInput(text)}
        onEndEditing={() => cityInputHandler()}
      ></TextInput>
    </View>
  );
};

export default Searching;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#333333",
    color: "#fff",
  },
});
