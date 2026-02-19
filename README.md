Link: https://expo.dev/accounts/busssnrrr/projects/kolayoskopi1/builds/e431c58e-9134-4886-9e7d-392342334bcd

# 🏥 Kolay Oskopi - Bağırsak Hazırlığı Eğitimi Mobil Uygulaması

Kolonoskopi öncesi bağırsak temizliği işlemlerinde hastalara yardımcı olmak için geliştirilmiş modern bir mobil uygulama.

## 📱 Proje Hakkında

**Kolay Oskopi**, kolonoskopi işlemi öncesinde hastaların hazırlık sürecini kolaylaştırmak ve bilgilendirmek amacıyla tasarlanmış bir mobil uygulamadır. Uygulama, hastalara işlem tarihine göre özelleştirilmiş hazırlık planı sunar ve araştırmacılara soru sorma imkanı sağlar.

### 🎯 Hedef Kullanıcı Kitle
- Kolonoskopi işlemi planlanmış hastalar
- Bağırsak hazırlığı sürecinde rehberlik ihtiyacı olan bireyler
- Sağlık profesyonelleri ve araştırmacılar

### 💡 Çözdüğümüz Problem
Kolonoskopi öncesi hazırlık süreci karmaşık ve zamanlaması kritik bir süreçtir. Hastalar genellikle:
- Ne zaman ne yapmaları gerektiğini unutuyorlar
- İlaç kullanımlarını takip etmekte zorlanıyorlar
- Sorularını sormak için kolay bir yol bulamıyorlar
- Hazırlık adımlarını karıştırıyorlar

Bu uygulama ile hastalar tüm hazırlık sürecini tek bir yerden takip edebilir, ilaçlarını yönetebilir ve araştırmacılara soru sorabilirler.

## 🛠 Kullanılan Teknolojiler

- **React Native** - Cross-platform mobil geliştirme
- **Expo** - Geliştirme ve build altyapısı
- **React Navigation** - Ekran navigasyonu
- **AsyncStorage** - Yerel veri saklama
- **React Native Calendars** - Takvim bileşeni

## 📦 Kurulum & Çalıştırma

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Expo Go uygulaması (test için)

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/Bbusenur/kolayoskopiApp.git
cd kolayoskopi1
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Uygulamayı başlatın**
```bash
npm start
```

4. **Test edin**
   - Expo Go uygulamasını telefonunuza indirin
   - QR kodu tarayın veya
   - Android emülatör için: `npm run android`
   - iOS simülatör için: `npm run ios`

## 📱 Özellikler

### ✨ Temel Özellikler
- 📅 **Tarih Yönetimi**: Kolonoskopi tarihi seçimi ve otomatik hesaplamalar
- 💊 **İlaç Takibi**: Kullanılan ilaçları ekleme/silme
- 📋 **Hazırlık Planı**: İşlemden 3 gün önce, 1 gün önce ve işlem günü için detaylı talimatlar
- 💬 **Soru Sorma**: Araştırmacılara soru gönderme
- 🔒 **KVKK Uyumu**: Kişisel verilerin korunması bilgilendirmesi

### 🎨 Yaratıcı Özellikler
- ⏰ **Akıllı Hatırlatıcılar**: İşlem tarihine göre otomatik hatırlatmalar (3 gün önce, 1 gün önce, işlem günü)
- 📊 **İlerleme Takibi**: Hazırlık sürecinin tamamlanma durumu ve istatistikler
- 📝 **Soru Geçmişi**: Gönderilen soruların görüntülenmesi ve takibi
- 🎯 **Kişiselleştirilmiş İçerik**: Tarihe göre dinamik içerik gösterimi
- 💾 **Offline Çalışma**: İnternet bağlantısı olmadan da kullanılabilir (AsyncStorage ile)
- 📈 **İstatistikler**: İlaç sayısı, soru sayısı ve genel ilerleme durumu
- 🔔 **Dinamik Uyarılar**: İşlem tarihine göre renkli ve önem seviyeli uyarılar

## 📂 Proje Yapısı

```
kolayoskopi1/
├── screens/          # Uygulama ekranları
│   ├── SplashScreen.js
│   ├── KVKKScreen.js
│   ├── CalendarScreen.js
│   ├── HomeScreen.js
│   ├── QuestionScreen.js
│   └── ProfileScreen.js
├── components/       # Yeniden kullanılabilir bileşenler
│   ├── LoadingScreen.js
│   ├── ErrorScreen.js
│   └── EmptyState.js
├── App.js           # Ana uygulama dosyası
├── package.json     # Bağımlılıklar
└── README.md        # Bu dosya
```

## 🎨 Tasarım İlkeleri

Uygulama, modern ve kullanıcı dostu bir arayüz sunmak için:
- Temiz ve minimal tasarım
- Yumuşak renk paleti
- Gölge efektleri ve yuvarlatılmış köşeler
- Responsive layout
- Loading ve error state'leri



