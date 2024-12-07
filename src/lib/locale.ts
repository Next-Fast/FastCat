import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/assets/Locales/en.json";
import zh_cn from "@/assets/Locales/zh-cn.json";

const languageResource = {
    en: { translation : en },
    zh: { translation : zh_cn }
}

i18n.use(initReactI18next)
    .init({
        resources: languageResource,
        lng: "en", 
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    })