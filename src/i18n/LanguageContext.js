import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'singgah-lang';

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || 'id';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, lang);
    }, [lang]);

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'id' ? 'en' : 'id'));
    };

    const t = (key, values = {}) => {
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        if (typeof value === 'undefined') return key;
        return value.replace(/{(\w+)}/g, (_, field) =>
            values[field] !== undefined ? values[field] : `{${field}}`
        );
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
