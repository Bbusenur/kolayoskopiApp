import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProgressScreen({ navigation }) {
  const [procedureDate, setProcedureDate] = useState("");
  const [medications, setMedications] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    try {
      const date = await AsyncStorage.getItem("procedureDate");
      if (date) setProcedureDate(date);

      const meds = await AsyncStorage.getItem("medications");
      if (meds) setMedications(JSON.parse(meds));

      const qs = await AsyncStorage.getItem("questions");
      if (qs) setQuestions(JSON.parse(qs));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateDaysUntil = () => {
    if (!procedureDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const procedure = new Date(procedureDate);
    procedure.setHours(0, 0, 0, 0);
    const diffTime = procedure - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = () => {
    let completed = 0;
    let total = 4;

    if (procedureDate) completed++;
    if (medications.length > 0) completed++;
    if (questions.length > 0) completed++;
    // KVKK onayı varsayılan olarak tamamlanmış sayılabilir
    completed++;

    return Math.round((completed / total) * 100);
  };

  const daysUntil = calculateDaysUntil();
  const progress = getProgressPercentage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>İlerleme Durumu</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* İlerleme Çubuğu */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Genel İlerleme</Text>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
          </View>
        </View>

        {/* Kalan Gün */}
        {daysUntil !== null && (
          <View style={styles.daysCard}>
            <Text style={styles.daysNumber}>
              {daysUntil > 0 ? daysUntil : 0}
            </Text>
            <Text style={styles.daysLabel}>
              {daysUntil > 0
                ? "Gün Kaldı"
                : daysUntil === 0
                ? "İşlem Bugün"
                : "İşlem Geçti"}
            </Text>
            {procedureDate && (
              <Text style={styles.daysDate}>
                {formatDate(procedureDate)}
              </Text>
            )}
          </View>
        )}

        {/* İstatistikler */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{medications.length}</Text>
            <Text style={styles.statLabel}>Kayıtlı İlaç</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{questions.length}</Text>
            <Text style={styles.statLabel}>Gönderilen Soru</Text>
          </View>
        </View>

        {/* Tamamlanan Adımlar */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Tamamlanan Adımlar</Text>
          <View style={styles.stepItem}>
            <Text style={styles.stepIcon}>
              {procedureDate ? "✓" : "○"}
            </Text>
            <Text style={styles.stepText}>Kolonoskopi tarihi seçildi</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepIcon}>
              {medications.length > 0 ? "✓" : "○"}
            </Text>
            <Text style={styles.stepText}>İlaçlar kaydedildi</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepIcon}>
              {questions.length > 0 ? "✓" : "○"}
            </Text>
            <Text style={styles.stepText}>Araştırmacıya soru soruldu</Text>
          </View>
        </View>
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4CAF50",
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#E9ECEF",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  daysCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  daysNumber: {
    fontSize: 48,
    fontWeight: "800",
    color: "#1976D2",
    marginBottom: 8,
  },
  daysLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1976D2",
    marginBottom: 4,
  },
  daysDate: {
    fontSize: 14,
    color: "#64B5F6",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#9C27B0",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#6C757D",
    fontWeight: "600",
    textAlign: "center",
  },
  stepsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 30,
    textAlign: "center",
  },
  stepText: {
    fontSize: 16,
    color: "#495057",
    flex: 1,
  },
});

