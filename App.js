import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139"

export default function App() {
  const [loading, setLoading] = useState(true);

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        console.log("Original data:")

        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        console.log("My Bus:")
        console.log(myBus)

      })
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : "Loaded"}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Refresh!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 24,
  },
  arrivalTime: {
    fontSize: 64,
    marginBottom: 32,
  },
  button: {
    padding: 20,
    backgroundColor: "darkgreen",
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
});
