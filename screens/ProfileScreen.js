import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profil ✓</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.phoneIcon}>
            <View style={styles.phoneScreen} />
          </View>
        </View>

        <Text style={styles.infoText}>
          Bu uygulama, kolonoskopi öncesi bağırsak temizliği işlemlerinde size
          yardım edecektir.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Bilgilendirme Sayfası</Text>
        <Text style={styles.footerIcon}>📤</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    letterSpacing: 0.5,
  },
  saveButton: {
    backgroundColor: "#DC3545",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#DC3545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    marginBottom: 30,
  },
  phoneIcon: {
    width: 140,
    height: 200,
    backgroundColor: "#E9ECEF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#DEE2E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  phoneScreen: {
    width: 110,
    height: 160,
    backgroundColor: "#DC3545",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#C82333",
  },
  infoText: {
    fontSize: 17,
    color: "#007AFF",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  footerText: {
    fontSize: 14,
    color: "#6C757D",
    fontWeight: "500",
  },
  footerIcon: {
    fontSize: 22,
  },
});

