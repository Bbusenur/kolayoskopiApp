import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CalendarScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [savedDate, setSavedDate] = useState("");

    useEffect(() => {
        loadSavedDate();
    }, []);

    const loadSavedDate = async () => {
        try {
            const date = await AsyncStorage.getItem("procedureDate");
            if (date) {
                setSavedDate(date);
                setSelectedDate(date);
            }
        } catch (error) {
            console.error("Error loading saved date:", error);
        }
    };

    const handleContinue = async () => {
        if (!selectedDate) {
            Alert.alert("Uyarı", "Lütfen kolonoskopi tarihinizi seçiniz.");
            return;
        }

        setLoading(true);
        try {
            await AsyncStorage.setItem("procedureDate", selectedDate);
            setSavedDate(selectedDate);
            // Başarılı kayıt sonrası direkt ana ekrana yönlendir
            navigation.replace("Home");
        } catch (error) {
            console.error("Error saving date:", error);
            Alert.alert("Hata", "Tarih kaydedilirken bir hata oluştu.");
            setLoading(false);
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

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1); // En az 1 gün sonrası
        return today.toISOString().split("T")[0];
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Kolonoskopi Tarihi Seçimi</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.instructionText}>
                    Size gerekli hatırlatmaları yapabilmemiz için, lütfen aşağıdaki
                    takvimden planlanan Kolonoskopi tarihinizi seçiniz.
                </Text>

                <View style={styles.dateContainer}>
                    <Text style={styles.dateLabel}>Kolonoskopi Tarihim</Text>
                    <TouchableOpacity style={styles.calendarButton}>
                        <Text style={styles.calendarButtonText}>
                            {selectedDate ? formatDate(selectedDate) : "Takvim"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Calendar
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                    }}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: "#4CAF50",
                            selectedTextColor: "#FFFFFF",
                        },
                    }}
                    minDate={getMinDate()}
                    theme={{
                        todayTextColor: "#4CAF50",
                        arrowColor: "#4CAF50",
                        selectedDayBackgroundColor: "#4CAF50",
                        selectedDayTextColor: "#FFFFFF",
                    }}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleContinue}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>DEVAM</Text>
                    )}
                </TouchableOpacity>
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
        textAlign: "center",
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    instructionText: {
        fontSize: 15,
        color: "#1E3A8A",
        marginBottom: 24,
        lineHeight: 22,
        textAlign: "justify",
        fontWeight: "500",
    },
    dateContainer: {
        marginBottom: 24,
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    dateLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#212529",
        marginBottom: 12,
        letterSpacing: 0.3,
    },
    calendarButton: {
        backgroundColor: "#4CAF50",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    calendarButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});

