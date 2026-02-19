import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function KVKKScreen({ navigation }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleContinue = async () => {
        if (!isChecked) {
            Alert.alert("Uyarı", "Lütfen onay kutusunu işaretleyiniz.");
            return;
        }

        try {
            await AsyncStorage.setItem("hasSeenKVKK", "true");
            navigation.replace("Calendar");
        } catch (error) {
            console.error("Error saving KVKK consent:", error);
            Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Kişisel Verilerin Korunması Hakkında Bilgilendirme
                </Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>
                    Bu uygulama, "Bağırsak Hazırlığı Eğitimi Mobil Uygulaması" olarak
                    İstanbul Üniversitesi-Cerrahpaşa Florence Nightingale Hemşirelik
                    Fakültesi'nden Arş. Gör. Kübra ŞENGÖR tarafından geliştirilmiştir.
                </Text>
                <Text style={styles.text}>
                    Uygulama, Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
                    kişisel sağlık verilerinizi işleyecektir. Ancak uygulama, telefonunuzdaki
                    fotoğraflar, kişiler, mesajlar, konum bilgisi ve diğer kişisel bilgilere
                    erişmeyecektir.
                </Text>
                <Text style={styles.text}>
                    Araştırma amaçlı olarak ad ve soyad bilgileriniz işlenecektir. Tüm
                    verileriniz güvenli bir şekilde saklanacak ve yalnızca araştırma
                    amaçlı kullanılacaktır.
                </Text>
            </ScrollView>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setIsChecked(!isChecked)}
                >
                    <View style={[styles.checkboxBox, isChecked && styles.checkboxChecked]}>
                        {isChecked && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>Okudum, onaylıyorum</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.button, !isChecked && styles.buttonDisabled]}
                onPress={handleContinue}
                disabled={!isChecked}
            >
                <Text style={styles.buttonText}>DEVAM</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    textAlign: "center",
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    color: "#495057",
    marginBottom: 18,
    textAlign: "justify",
  },
  checkboxContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    backgroundColor: "#FFFFFF",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 18,
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#ADB5BD",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

