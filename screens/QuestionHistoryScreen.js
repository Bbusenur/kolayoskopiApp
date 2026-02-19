import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../components/LoadingScreen";
import EmptyState from "../components/EmptyState";

export default function QuestionHistoryScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
    const unsubscribe = navigation.addListener("focus", () => {
      loadQuestions();
    });
    return unsubscribe;
  }, [navigation]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const savedQuestions = await AsyncStorage.getItem("questions");
      if (savedQuestions) {
        const questionsArray = JSON.parse(savedQuestions);
        // En yeni sorular önce gelsin
        questionsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        setQuestions(questionsArray);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (loading) {
    return <LoadingScreen message="Sorular yükleniyor..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Soru Geçmişim</Text>
        <View style={styles.placeholder} />
      </View>

      {questions.length === 0 ? (
        <EmptyState
          message="Henüz soru göndermediniz. Soru sormak için ana sayfadaki 'Araştırmacıya Soru Sorun' kartını kullanabilirsiniz."
          actionLabel="Soru Sor"
          onAction={() => navigation.navigate("Question")}
        />
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              Toplam {questions.length} soru gönderdiniz
            </Text>
          </View>

          {questions.map((item) => (
            <View key={item.id} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <View style={styles.topicBadge}>
                  <Text style={styles.topicText}>{item.topic}</Text>
                </View>
                <Text style={styles.dateText}>{formatDate(item.date)}</Text>
              </View>
              <Text style={styles.questionText}>{item.question}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Gönderildi</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
  summaryCard: {
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976D2",
    textAlign: "center",
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  topicBadge: {
    backgroundColor: "#9C27B0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  topicText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  dateText: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "500",
  },
  questionText: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 22,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statusBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});

