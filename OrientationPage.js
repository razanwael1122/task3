import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gyroscope } from "expo-sensors";

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 }); //initial state of the gyroscope data
  const [subscription, setSubscription] = useState(null); //keep track of the gyroscope listener subscription and is initially set to null

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData); //update the gyroscope data
      })
    );
    Gyroscope.setUpdateInterval(500); // Update interval set to 500 ms
  };

  const _unsubscribe = () => {
    //removes the gyroscope listener if it exists
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const formatValue = (value) => {
    return value.toFixed(5); // 5 digits
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Orientation:</Text>
      <Text style={styles.text}>x: {formatValue(x)}</Text>
      <Text style={styles.text}>y: {formatValue(y)}</Text>
      <Text style={styles.text}>z: {formatValue(z)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "(On)" : "(Off)"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 20,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
});
