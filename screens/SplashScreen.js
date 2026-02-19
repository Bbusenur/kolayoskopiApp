import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const hasSeenKVKK = await AsyncStorage.getItem("hasSeenKVKK");
                if (!hasSeenKVKK) {
                    // İlk açılış - KVKK ekranına git
                    setTimeout(() => {
                        navigation.replace("KVKK");
                    }, 2000);
                } else {
                    // Daha önce açılmış - Ana ekrana git
                    setTimeout(() => {
                        navigation.replace("Home");
                    }, 2000);
                }
            } catch (error) {
                console.error("Error checking first launch:", error);
                setTimeout(() => {
                    navigation.replace("Home");
                }, 2000);
            }
        };

        checkFirstLaunch();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>KOLAY OSKOPİ</Text>
            <View style={styles.iconContainer}>
                <View style={styles.colonIcon} />
            </View>
            <Text style={styles.subtitle}>Bağırsak Hazırlığı Eğitimi</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008B8B", // Teal/dark green background
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFD700", // Bright yellow
    marginBottom: 50,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  iconContainer: {
    marginVertical: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  colonIcon: {
    width: 90,
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  subtitle: {
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 30,
    fontWeight: "600",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

