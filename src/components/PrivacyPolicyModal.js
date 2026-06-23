import React from "react";
import { useLanguage } from '../i18n';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    const { lang } = useLanguage();

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.55)', zIndex: 3000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 16,
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#fff', borderRadius: 16, width: '100%',
                    maxWidth: 440, maxHeight: '80vh', overflowY: 'auto',
                    padding: 24, position: 'relative',
                    fontFamily: 'Rubik, Arial, sans-serif',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'rgba(0,0,0,0.1)', border: 'none',
                        borderRadius: '50%', width: 30, height: 30,
                        cursor: 'pointer', fontSize: 16, lineHeight: '30px',
                    }}
                >✕</button>
                <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16, color: '#16a34a' }}>
                    {lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
                </h3>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, marginBottom: 10 }}>
                    {lang === 'en'
                        ? 'Singgah is committed to protecting the personal data you provide. The data collected includes name, phone number, marital status, budget, and desired location.'
                        : 'Singgah berkomitmen untuk melindungi data pribadi yang Anda berikan. Data yang dikumpulkan meliputi nama, nomor HP, status pernikahan, budget, dan lokasi yang diinginkan.'}
                </p>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, marginBottom: 10 }}>
                    {lang === 'en'
                        ? 'Your data will be used solely to provide accommodation recommendations and connect you with relevant property agents. We do not share your data with third parties without your consent.'
                        : 'Data Anda hanya digunakan untuk memberikan rekomendasi tempat tinggal dan menghubungkan Anda dengan agen properti yang relevan. Kami tidak membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda.'}
                </p>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, marginBottom: 10 }}>
                    {lang === 'en'
                        ? 'By checking the agreement box, you confirm that the information provided is accurate and consent to being contacted via WhatsApp for follow-up regarding your housing search.'
                        : 'Dengan mencentang kotak persetujuan, Anda menyatakan bahwa informasi yang diberikan adalah benar dan menyetujui untuk dihubungi melalui WhatsApp terkait pencarian tempat tinggal Anda.'}
                </p>
                <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, marginBottom: 0 }}>
                    {lang === 'en'
                        ? 'For questions regarding your data, please contact us via the Singgah platform.'
                        : 'Untuk pertanyaan terkait data Anda, hubungi kami melalui platform Singgah.'}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
