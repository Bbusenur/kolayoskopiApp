import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingScreen({ message = "Yükleniyor..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
  },
});

