import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuestionScreen({ navigation }) {
    const [topic, setTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [topicFocused, setTopicFocused] = useState(false);
    const [questionFocused, setQuestionFocused] = useState(false);

    const handleSend = async () => {
        if (!topic.trim() || !question.trim()) {
            Alert.alert("Uyarı", "Lütfen konu ve sorunuzu doldurunuz.");
            return;
        }

        setLoading(true);
        try {
            // Soruları AsyncStorage'a kaydet
            const questions = await AsyncStorage.getItem("questions");
            const questionsArray = questions ? JSON.parse(questions) : [];
            const newQuestion = {
                id: Date.now().toString(),
                topic: topic.trim(),
                question: question.trim(),
                date: new Date().toISOString(),
            };
            questionsArray.push(newQuestion);
            await AsyncStorage.setItem("questions", JSON.stringify(questionsArray));

            Alert.alert("Başarılı", "Sorunuz gönderildi. Araştırmacı en kısa sürede size dönüş yapacaktır.", [
                {
                    text: "Tamam",
                    onPress: () => {
                        setTopic("");
                        setQuestion("");
                    },
                },
            ]);
        } catch (error) {
            console.error("Error saving question:", error);
            Alert.alert("Hata", "Sorunuz gönderilirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Araştırmacıya Danışabilirsiniz</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hangi Konuda?</Text>
                    <TextInput
                        style={[
                            styles.input,
                            topicFocused && styles.inputFocused,
                        ]}
                        placeholder="Konu başlığı..."
                        value={topic}
                        onChangeText={setTopic}
                        editable={!loading}
                        onFocus={() => setTopicFocused(true)}
                        onBlur={() => setTopicFocused(false)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sorunuz</Text>
                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            questionFocused && styles.inputFocused,
                        ]}
                        placeholder="Sorunuzu yazabilirsiniz..."
                        value={question}
                        onChangeText={setQuestion}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        editable={!loading}
                        onFocus={() => setQuestionFocused(true)}
                        onBlur={() => setQuestionFocused(false)}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.sendButton, loading && styles.buttonDisabled]}
                    onPress={handleSend}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <Text style={styles.sendButtonIcon}>▶</Text>
                            <Text style={styles.sendButtonText}>GÖNDER</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate("Home")}
                    disabled={loading}
                >
                    <Text style={styles.homeButtonIcon}>🏠</Text>
                    <Text style={styles.homeButtonText}>ANA SAYFA</Text>
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
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#212529",
        marginBottom: 12,
        letterSpacing: 0.3,
    },
    input: {
        borderWidth: 2,
        borderColor: "#E9ECEF",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: "#212529",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    inputFocused: {
        borderColor: "#9C27B0",
        shadowColor: "#9C27B0",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    textArea: {
        height: 140,
        textAlignVertical: "top",
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 5,
    },
    sendButton: {
        flex: 1,
        backgroundColor: "#9C27B0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: "#9C27B0",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    sendButtonIcon: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    sendButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    homeButton: {
        flex: 1,
        backgroundColor: "#6C757D",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: "#6C757D",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    homeButtonIcon: {
        fontSize: 18,
    },
    homeButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
});

