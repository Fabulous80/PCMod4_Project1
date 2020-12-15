import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

export default function App() {
  const [loading, setLoading] = useState(true)
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    setLoading(true)

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {

        const myBus = responseData.services.filter(
          (item) => item.no === "155"
        )[0];
        const duration_s = Math.floor(myBus.next.duration_ms / 1000)
        const minutes = Math.floor(duration_s / 60)
        const seconds = duration_s % 60
        setArrival(`${minutes} minutes and ${seconds} seconds`)
        setLoading(false)

      })
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData,10000)
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        { loading ? <ActivityIndicator size="large" /> : arrival}
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
    fontSize: 26,
    marginBottom: 24,
    textAlign: "center",
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
