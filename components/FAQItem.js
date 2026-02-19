import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQItem({ question, answer }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.7}>
                <Text style={styles.question}>{question}</Text>
                <Text style={styles.icon}>{expanded ? "−" : "+"}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.body}>
                    <Text style={styles.answer}>{answer}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E9ECEF",
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#F8F9FA",
    },
    question: {
        fontSize: 16,
        fontWeight: "600",
        color: "#212529",
        flex: 1,
        marginRight: 10,
    },
    icon: {
        fontSize: 24,
        color: "#007AFF",
        fontWeight: "bold",
    },
    body: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
    },
    answer: {
        fontSize: 14,
        color: "#495057",
        lineHeight: 22,
    },
});
