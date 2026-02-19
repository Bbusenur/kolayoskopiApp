import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import FAQItem from "../components/FAQItem";

export default function FAQScreen({ navigation }) {
    const faqs = [
        {
            question: "Kolonoskopi işlemi ne kadar sürer?",
            answer: "İşlem genellikle 15-30 dakika sürer, ancak hazırlık ve dinlenme süresiyle birlikte hastanede kalış süresi uzayabilir.",
        },
        {
            question: "İşlem sırasında ağrı hisseder miyim?",
            answer: "İşlemden önce sakinleştirici ve ağrı kesici ilaçlar (sedasyon) verilir. Bu sayede çoğu hasta işlem sırasında ağrı hissetmez veya işlemi hatırlamaz.",
        },
        {
            question: "Hazırlık diyeti sırasında kahve içebilir miyim?",
            answer: "Taneciksiz ve sütsüz kahve içebilirsiniz. Ancak süt, krema veya kırmızı/mor renkli içecekler tüketilmemelidir.",
        },
        {
            question: "İlaçlarımı işlem günü alabilir miyim?",
            answer: "Tansiyon ve kalp ilaçları genellikle az suyla alınabilir. Ancak kan sulandırıcılar ve diyabet ilaçları için doktorunuzun talimatına uymalısınız.",
        },
        {
            question: "İşlemden sonra hemen yemek yiyebilir miyim?",
            answer: "Sedasyonun etkisi geçtikten sonra ve doktorunuz onay verdiğinde hafif yiyecekler yemeye başlayabilirsiniz.",
        },
        {
            question: "Kolonoskopi sonrası araba kullanabilir miyim?",
            answer: "Hayır. Verilen sakinleştirici ilaçlar reflekslerinizi etkileyebileceğinden, işlem günü araba kullanmamalısınız. Bir refakatçi ile gelmeniz önerilir.",
        },
        {
            question: "Mide bulantısı olursa ne yapmalıyım?",
            answer: "Bağırsak temizleyici ilaçlar bazen mide bulantısı yapabilir. İlacı daha yavaş içmeyi deneyebilir veya doktorunuza danışarak bulantı önleyici ilaç kullanabilirsiniz.",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>← Geri</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Sık Sorulan Sorular</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.introText}>
                    Kolonoskopi süreciyle ilgili merak edilen soruların cevaplarını burada bulabilirsiniz.
                </Text>

                {faqs.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}

                <View style={styles.footerSpacing} />
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
        fontSize: 18,
        fontWeight: "700",
        color: "#212529",
    },
    placeholder: {
        width: 60,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    introText: {
        fontSize: 14,
        color: "#6C757D",
        marginBottom: 20,
        textAlign: "center",
    },
    footerSpacing: {
        height: 40,
    },
});
