export const translations = {
    en: {
        app: {
            tagline: "Looking for a place that suits you?",
            cta: "Let's find your ideal home!",
            greeting: "What can Mbok Yem help you with?",
            formTitle: "Please fill out the form below to start the conversation",
            autoFormTitle: "This data is sent automatically by a third party",
        },
        form: {
            fullName: "Full Name",
            fullNamePlaceholder: "Enter your full name",
            phone: "Phone Number",
            phonePlaceholder: "Enter phone number",
            maritalStatus: "Marital Status",
            maritalStatusPlaceholder: "Select status",
            single: "Single",
            married: "Married",
            budgetRange: "Monthly Budget Range",
            location: "Desired Location",
            locationPlaceholder: "Example: South Jakarta, Bandung, etc.",
            detectLocation: "Detect my location",
            locationError: "Could not get your location. Please allow location access or type manually.",
            locationErrorDenied: "Location access denied. Please allow location access or type manually.",
            locationErrorName: "Could not determine area name.",
            terms: "By using Singgah's service, I agree to the",
            termsLink: "Privacy Policy",
            termsSuffix: "and confirm that the information provided is accurate.",
            startChat: "Start Chat",
            loading: "Please Wait...",
        },
        cards: {
            housingRecommendation: "Housing Recommendation",
            housingConsultation: "Housing Consultation",
        },
        chat: {
            typing: "Mbok Yem is typing...",
            placeholder: "Ask Mbok Yem...",
            waiting: "Waiting for response...",
            save: "Save",
            saved: "Place saved successfully!",
        },
        quickSend: {
            recommendation: "I need a recommendation for a place to stay, help me find a suitable boarding house or rental",
            consultation: "I am {status}, my budget is around {budgetMin} - {budgetMax}, looking in the {location} area. I want to consult about a suitable place to stay",
        },
        lang: {
            en: "EN",
            id: "ID",
        },
    },
    id: {
        app: {
            tagline: "Cari tempat tinggal yang pas buat kamu?",
            cta: "Yuk, temukan hunian idealmu!",
            greeting: "Ada yang bisa Mbok Yem bantu?",
            formTitle: "Silakan isi formulir di bawah ini untuk memulai percakapan",
            autoFormTitle: "Data ini dikirimkan otomatis oleh pihak ketiga",
        },
        form: {
            fullName: "Nama Lengkap",
            fullNamePlaceholder: "Masukkan nama lengkap",
            phone: "Nomor HP",
            phonePlaceholder: "Masukkan nomor HP",
            maritalStatus: "Status Pernikahan",
            maritalStatusPlaceholder: "Pilih status",
            single: "Lajang",
            married: "Menikah",
            budgetRange: "Range Budget per Bulan",
            location: "Lokasi yang Dicari",
            locationPlaceholder: "Contoh: Jakarta Selatan, Bandung, dll",
            detectLocation: "Deteksi lokasi saya",
            locationError: "Tidak bisa mendapatkan lokasi. Izinkan akses lokasi atau ketik manual.",
            locationErrorDenied: "Akses lokasi ditolak. Izinkan akses lokasi atau ketik manual.",
            locationErrorName: "Tidak bisa menentukan nama daerah.",
            terms: "Dengan menggunakan layanan Singgah, saya menyetujui",
            termsLink: "Kebijakan Privasi",
            termsSuffix: "dan menyatakan bahwa informasi yang diberikan adalah benar.",
            startChat: "Mulai Chat",
            loading: "Please Wait...",
        },
        cards: {
            housingRecommendation: "Rekomendasi Hunian",
            housingConsultation: "Konsultasi Hunian",
        },
        chat: {
            typing: "Mbok Yem sedang mengetik...",
            placeholder: "Tanya Mbok Yem...",
            waiting: "Menunggu respons...",
            save: "Simpan",
            saved: "Tempat berhasil disimpan!",
        },
        quickSend: {
            recommendation: "Aku butuh rekomendasi tempat tinggal nih, bantu cariin kost atau kontrakan yang cocok dong",
            consultation: "Aku {status}, budgetku sekitar {budgetMin} - {budgetMax}, cari di daerah {location}. Aku ingin konsultasi soal tempat tinggal yang cocok?",
        },
        lang: {
            en: "EN",
            id: "ID",
        },
    },
};

export const formatCurrency = (value, locale) => {
    if (locale === 'en') {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        return `${(value / 1000).toFixed(0)}k`;
    }
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
    return `${(value / 1000).toFixed(0)}rb`;
};
