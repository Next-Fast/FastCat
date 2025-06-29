import i18n, { changeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/assets/Locales/en.json";
import zh_cn from "@/assets/Locales/zh-cn.json";
import { get_language, set_config } from "./constant/tauri-constant";
import { SuprrortLanguage } from "./Types";

const languageResource = {
    en: { translation : en },
    zh: { translation : zh_cn }
};

export const set_language = async (lang: SuprrortLanguage) => {
    await changeLanguage(lang);
    await set_config(lang);
}



i18n.use(initReactI18next)
    .init({
        resources: languageResource,
        lng: await get_language(), 
        fallbackLng: "zh",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;