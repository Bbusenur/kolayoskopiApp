# 📝 Proje Notu - Kolay Oskopi

## 🎯 Hedef Kullanıcı Kitle

**Kolay Oskopi** uygulaması, kolonoskopi işlemi planlanmış hastalar için tasarlanmıştır. Özellikle:

- Kolonoskopi öncesi hazırlık sürecinde rehberlik ihtiyacı olan hastalar
- İlaç kullanımını takip etmekte zorlanan bireyler
- Hazırlık adımlarını unutmaktan endişelenen hastalar
- Araştırmacılara soru sormak isteyen kullanıcılar

## 💡 Çözmek İstediğimiz Problem

Kolonoskopi öncesi hazırlık süreci oldukça karmaşık ve zamanlaması kritik bir süreçtir. Hastalar genellikle şu sorunlarla karşılaşır:

1. **Zamanlama Karmaşası**: Ne zaman ne yapmaları gerektiğini unutuyorlar
   - 3 gün önce yasak besinler
   - 1 gün önce sadece berrak sıvı tüketimi
   - İşlem günü lavman uygulaması

2. **İlaç Takibi Zorluğu**: Kullandıkları ilaçları takip etmekte zorlanıyorlar
   - Hangi ilaçları kullandıklarını unutuyorlar
   - İlaç listelerini güncellemek istiyorlar

3. **Bilgi Eksikliği**: Sorularını sormak için kolay bir yol bulamıyorlar
   - Araştırmacılara nasıl ulaşacaklarını bilmiyorlar
   - Sorularını kaydetmek ve takip etmek istiyorlar

4. **Hazırlık Adımlarını Karıştırma**: Adımları unutuyor veya karıştırıyorlar
   - Hangi günde ne yapmaları gerektiğini bilmiyorlar
   - İlerlemelerini görmek istiyorlar

## 🎨 Panodan Aldığım İlham ve Kararlar

### Tasarım Kararları

**Panodan aldığım ilham:**
- Temiz ve düzenli bilgi sunumu
- Gri başlıklar ve beyaz içerik alanları
- Kırmızı tarih vurguları (önemli bilgiler)
- Yeşil butonlar (pozitif aksiyonlar)

**Uyguladığım kararlar:**
- ✅ **Section Tasarımı**: Panodaki gri başlıklı bölümlerden ilham alarak modern kart tasarımları oluşturdum
- ✅ **Renk Paleti**: Kırmızı tarihler, yeşil butonlar ve temiz beyaz arka planlar kullandım
- ✅ **Bilgi Hiyerarşisi**: Önemli bilgileri (tarihler) kırmızı renkle vurguladım
- ✅ **Düzenli Layout**: Panodaki düzenli yapıdan ilham alarak scroll edilebilir, organize bir layout oluşturdum

### Fonksiyonel Kararlar

**Panodan aldığım ilham:**
- Tarih bazlı hazırlık planı
- Adım adım talimatlar
- İlaç listesi
- Soru sorma imkanı

**Uyguladığım kararlar:**
- ✅ **Dinamik Tarih Hesaplama**: İşlem tarihine göre otomatik olarak "3 gün önce" ve "1 gün önce" tarihlerini hesaplıyorum
- ✅ **İlaç Yönetimi**: Panodaki statik ilaç listesini dinamik hale getirdim - kullanıcılar ekleyip silebiliyor
- ✅ **Soru Sorma Sistemi**: Panodaki "Araştırmacıya Danışabilirsiniz" bölümünden ilham alarak interaktif bir soru sorma sistemi oluşturdum
- ✅ **Hatırlatıcılar**: Panodaki zamanlamalardan ilham alarak akıllı hatırlatıcılar ekledim

### Yaratıcı Eklemeler

Panodan aldığım ilhamın ötesinde, kullanıcı deneyimini iyileştirmek için şu özellikleri ekledim:

1. **📊 İlerleme Takibi**: Kullanıcıların hazırlık sürecindeki ilerlemelerini görebilmeleri için bir ilerleme ekranı
2. **📝 Soru Geçmişi**: Gönderilen soruların görüntülenebilmesi ve takip edilebilmesi
3. **⏰ Akıllı Hatırlatıcılar**: İşlem tarihine göre dinamik uyarılar (3 gün önce, 1 gün önce, işlem günü)
4. **📈 İstatistikler**: İlaç sayısı, soru sayısı ve genel ilerleme durumu
5. **🎯 Kişiselleştirme**: Her kullanıcının kendi ilaçlarını ekleyip yönetebilmesi

## 🚀 Teknik Yaklaşım

### State Yönetimi
- React Hooks (useState, useEffect) kullanarak basit ve etkili state yönetimi
- AsyncStorage ile kalıcı veri saklama

### Navigasyon
- React Navigation ile 8 ekranlık bir navigasyon yapısı
- Stack Navigator kullanarak hiyerarşik geçişler

### Veri Akışı
- AsyncStorage ile offline-first yaklaşım
- Form validasyonları ve hata yönetimi
- Loading ve empty state'ler

### Kullanıcı Deneyimi
- Modern ve temiz UI tasarımı
- Responsive layout
- Görsel geri bildirimler (renkli uyarılar, progress bar)
- Kolay erişim butonları

## 📱 Ekranlar ve Özellikler

1. **SplashScreen**: İlk açılış kontrolü ve logo gösterimi
2. **KVKKScreen**: Kişisel verilerin korunması bilgilendirmesi ve onay
3. **CalendarScreen**: Kolonoskopi tarihi seçimi
4. **HomeScreen**: Ana hazırlık planı ve hızlı erişim
5. **QuestionScreen**: Araştırmacıya soru sorma
6. **QuestionHistoryScreen**: Gönderilen soruların geçmişi
7. **ProgressScreen**: İlerleme takibi ve istatistikler
8. **ProfileScreen**: Bilgilendirme sayfası

## 🎓 Öğrenilenler

Bu projede:
- React Native ve Expo ile cross-platform mobil uygulama geliştirme
- AsyncStorage ile yerel veri saklama
- Modern UI/UX tasarım prensipleri
- State yönetimi ve veri akışı
- Kullanıcı odaklı tasarım yaklaşımı

## 🔮 Gelecek Geliştirmeler

- Push notification desteği
- Çoklu dil desteği
- Dark mode
- Daha detaylı istatistikler ve raporlar
- Cloud sync özelliği

---

**Not**: Bu proje, kolonoskopi öncesi hazırlık sürecinde hastalara yardımcı olmak için tasarlanmıştır. Tıbbi tavsiye yerine geçmez.

