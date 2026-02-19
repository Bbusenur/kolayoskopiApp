import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../components/LoadingScreen";
import EmptyState from "../components/EmptyState";

export default function HomeScreen({ navigation }) {
  const [procedureDate, setProcedureDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedication, setNewMedication] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const date = await AsyncStorage.getItem("procedureDate");
      if (date) {
        setProcedureDate(date);
      }
      
      // İlaçları yükle
      const savedMedications = await AsyncStorage.getItem("medications");
      if (savedMedications) {
        setMedications(JSON.parse(savedMedications));
      } else {
        // İlk açılışta varsayılan ilaçlar
        const defaultMeds = [
          "Kan Sulandırıcı (Aspirin, Coumadin v.b.)",
          "Şeker Hastalığı İlaçları",
          "Tansiyon Düzenleyici İlaç",
        ];
        setMedications(defaultMeds);
        await AsyncStorage.setItem("medications", JSON.stringify(defaultMeds));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      Alert.alert("Hata", "Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const saveMedications = async (meds) => {
    try {
      await AsyncStorage.setItem("medications", JSON.stringify(meds));
      setMedications(meds);
    } catch (error) {
      console.error("Error saving medications:", error);
      Alert.alert("Hata", "İlaçlar kaydedilirken bir hata oluştu.");
    }
  };

  const handleAddMedication = () => {
    if (!newMedication.trim()) {
      Alert.alert("Uyarı", "Lütfen ilaç adını giriniz.");
      return;
    }

    const updatedMeds = [...medications, newMedication.trim()];
    saveMedications(updatedMeds);
    setNewMedication("");
    setShowAddModal(false);
    Alert.alert("Başarılı", "İlaç eklendi.");
  };

  const handleDeleteMedication = (index) => {
    Alert.alert(
      "İlaç Sil",
      "Bu ilacı silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => {
            const updatedMeds = medications.filter((_, i) => i !== index);
            saveMedications(updatedMeds);
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateDate = (daysBefore) => {
    if (!procedureDate) return "";
    const date = new Date(procedureDate);
    date.setDate(date.getDate() - daysBefore);
    return formatDate(date.toISOString().split("T")[0]);
  };

  const getReminderStatus = () => {
    if (!procedureDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const procedure = new Date(procedureDate);
    procedure.setHours(0, 0, 0, 0);
    const diffTime = procedure - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 3) {
      return {
        type: "warning",
        message: "Bugün yasak besinleri tüketmeyi bırakmalısınız!",
      };
    }
    if (diffDays === 1) {
      return {
        type: "important",
        message: "Yarın işlem var! Sadece berrak sıvı tüketin ve Phospho Soda içmeyi unutmayın.",
      };
    }
    if (diffDays === 0) {
      return {
        type: "critical",
        message: "İşlem bugün! Sabah 07:00'da lavman uygulayın.",
      };
    }
    if (diffDays < 0) {
      return {
        type: "info",
        message: "İşlem tarihi geçmiş görünüyor. Lütfen tarihi kontrol edin.",
      };
    }
    return null;
  };

  const handleEditDate = () => {
    navigation.navigate("Calendar");
  };

  if (loading) {
    return <LoadingScreen message="Yükleniyor..." />;
  }

  if (!procedureDate) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Benim Kolonoskopim</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.headerIcon}>🏠</Text>
          </TouchableOpacity>
        </View>
        <EmptyState
          message="Kolonoskopi tarihiniz kayıtlı değil. Lütfen tarih seçiniz."
          actionLabel="Tarih Seç"
          onAction={() => navigation.navigate("Calendar")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Benim Kolonoskopim</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.headerIcon}>🏠</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hatırlatıcı Banner */}
        {getReminderStatus() && (
          <View
            style={[
              styles.reminderBanner,
              getReminderStatus()?.type === "critical" && styles.reminderCritical,
              getReminderStatus()?.type === "important" && styles.reminderImportant,
              getReminderStatus()?.type === "warning" && styles.reminderWarning,
            ]}
          >
            <Text style={styles.reminderIcon}>
              {getReminderStatus()?.type === "critical"
                ? "⚠️"
                : getReminderStatus()?.type === "important"
                ? "⏰"
                : "📌"}
            </Text>
            <Text style={styles.reminderText}>
              {getReminderStatus()?.message}
            </Text>
          </View>
        )}

        {/* Hızlı Erişim Kartları */}
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity
            style={styles.questionCard}
            onPress={() => navigation.navigate("Question")}
            activeOpacity={0.8}
          >
            <View style={styles.questionCardContent}>
              <Text style={styles.questionCardIcon}>💬</Text>
              <View style={styles.questionCardText}>
                <Text style={styles.questionCardTitle}>
                  Araştırmacıya Soru Sorun
                </Text>
                <Text style={styles.questionCardSubtitle}>
                  Merak ettiğiniz konuları sorabilirsiniz
                </Text>
              </View>
              <Text style={styles.questionCardArrow}>→</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.quickAccessRow}>
            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => navigation.navigate("QuestionHistory")}
              activeOpacity={0.8}
            >
              <Text style={styles.quickAccessIcon}>📋</Text>
              <Text style={styles.quickAccessText}>Soru Geçmişi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => navigation.navigate("Progress")}
              activeOpacity={0.8}
            >
              <Text style={styles.quickAccessIcon}>📊</Text>
              <Text style={styles.quickAccessText}>İlerleme</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* İşlem Tarihi */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>İşlem Tarihi:</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditDate}
            >
              <Text style={styles.editButtonText}>DÜZENLE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.dateText}>{formatDate(procedureDate)}</Text>
          </View>
        </View>

        {/* Kullandığım İlaçlar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kullandığım İlaçlar</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>+ EKLE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContent}>
            {medications.length === 0 ? (
              <Text style={styles.emptyMedicationText}>
                Henüz ilaç eklenmemiş. "+ EKLE" butonuna tıklayarak ilaç ekleyebilirsiniz.
              </Text>
            ) : (
              medications.map((med, index) => (
                <View key={index} style={styles.medicationItem}>
                  <Text style={styles.medicationText}>[{med}]</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteMedication(index)}
                  >
                    <Text style={styles.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>

        {/* İşlemden 3 Gün Önce */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>İşlemden 3 Gün Önce:</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.dateText}>{calculateDate(3)}</Text>
            <Text style={styles.subsectionTitle}>
              Tüketilmesi Yasak Besinler
            </Text>
            <Text style={styles.bulletPoint}>
              • Mercimek, Kuru Fasulye, Nohut gibi baklagiller
            </Text>
            <Text style={styles.bulletPoint}>
              • Çekirdekli Meyve Sebze (Karpuz, Kivi, Üzüm)
            </Text>
            <Text style={styles.bulletPoint}>• Kuruyemiş, Çerez</Text>
          </View>
        </View>

        {/* İşlemden 1 Gün Önce */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>İşlemden 1 Gün Önce:</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.dateText}>{calculateDate(1)}</Text>
            <Text style={styles.instructionText}>
              Sadece et suyu, tavuk suyu, elma suyu, ananas suyu gibi berrak
              sıvı tüketebilirsiniz.
            </Text>
            <Text style={styles.bulletPoint}>
              • Saat 14.00: Phospho Soda kattığınız birinci şişeyi içmeye
              başlayınız.
            </Text>
            <Text style={styles.bulletPoint}>
              • Saat 18.00: Phospho Soda kattığınız ikinci şişeyi içmeye
              başlayınız.
            </Text>
          </View>
        </View>

        {/* İşlem Günü */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>İşlem Günü:</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.dateText}>{formatDate(procedureDate)}</Text>
            <Text style={styles.instructionText}>
              İşlem sabahı saat 07.00'da lavmanınızı uygulayınız. 15 dakika
              tuttuktan sonra tuvalete gidebilirsiniz.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.footerText}>profile</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>...</Text>
      </View>

      {/* İlaç Ekleme Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni İlaç Ekle</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="İlaç adını giriniz..."
              value={newMedication}
              onChangeText={setNewMedication}
              autoFocus
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewMedication("");
                }}
              >
                <Text style={styles.modalButtonCancelText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleAddMedication}
              >
                <Text style={styles.modalButtonSaveText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    letterSpacing: 0.5,
  },
  headerIcon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E1BEE7",
  },
  questionCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },
  questionCardIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  questionCardText: {
    flex: 1,
  },
  questionCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7B1FA2",
    marginBottom: 4,
  },
  questionCardSubtitle: {
    fontSize: 13,
    color: "#757575",
  },
  questionCardArrow: {
    fontSize: 24,
    color: "#9C27B0",
    fontWeight: "bold",
  },
  quickAccessContainer: {
    marginBottom: 20,
  },
  quickAccessRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  quickAccessIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
  },
  reminderBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  reminderCritical: {
    backgroundColor: "#FFEBEE",
    borderLeftColor: "#DC3545",
  },
  reminderImportant: {
    backgroundColor: "#FFF3E0",
    borderLeftColor: "#FF9800",
  },
  reminderWarning: {
    backgroundColor: "#E3F2FD",
    borderLeftColor: "#2196F3",
  },
  reminderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#212529",
    lineHeight: 20,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212529",
    letterSpacing: 0.3,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  sectionContent: {
    padding: 18,
    backgroundColor: "#FFFFFF",
  },
  dateText: {
    fontSize: 17,
    color: "#DC3545",
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  medicationText: {
    flex: 1,
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DC3545",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyMedicationText: {
    fontSize: 14,
    color: "#6C757D",
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  modalInput: {
    borderWidth: 2,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    minHeight: 50,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#E9ECEF",
  },
  modalButtonCancelText: {
    color: "#495057",
    fontSize: 16,
    fontWeight: "700",
  },
  modalButtonSave: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalButtonSaveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#212529",
    marginTop: 12,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  instructionText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 8,
    paddingLeft: 8,
    lineHeight: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6C757D",
  },
  emptyText: {
    fontSize: 16,
    color: "#6C757D",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 14,
    color: "#6C757D",
    fontWeight: "500",
  },
});

