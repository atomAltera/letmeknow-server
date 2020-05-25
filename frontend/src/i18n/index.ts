import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import enLocale from "./en";

export function initI18n() {
    i18next
        .use(initReactI18next)
        .init({
            resources: {
                "en": {translation: enLocale}
            },

            lng: "en",
            fallbackLng: "en",

            interpolation: {
                escapeValue: false
            }
        })
}
