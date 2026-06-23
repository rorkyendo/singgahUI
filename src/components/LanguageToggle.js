import React from 'react';
import { useLanguage } from '../i18n';

const LanguageToggle = () => {
    const { lang, toggleLanguage, t } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            style={{
                background: '#fff',
                border: '1.5px solid #16a34a',
                borderRadius: 20,
                padding: '4px 10px',
                fontSize: 12,
                fontWeight: 700,
                color: '#16a34a',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'Rubik, Arial, sans-serif',
            }}
            aria-label="Toggle language"
        >
            <span style={{ opacity: lang === 'en' ? 1 : 0.5 }}>{t('lang.en')}</span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ opacity: lang === 'id' ? 1 : 0.5 }}>{t('lang.id')}</span>
        </button>
    );
};

export default LanguageToggle;
