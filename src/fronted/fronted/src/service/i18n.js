import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../../public/locales/en/translation.json";
import esTranslation from "../../public/locales/es/translation.json";

const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Idioma por defecto
    fallbackLng: "en", // Idioma de respaldo
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;