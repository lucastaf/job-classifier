// Importando as dependências
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// NO PRÓXIMO PASSO EU MOSTRO AS TRADUÇÕES
// Buscando as nossas traduções da pasta locales (nome e local da pasta é você quem decide)
import translations from './locales'

// Configuração i18n
const i18nConfig = {
    resources: translations,
    fallbackLng: 'pt-BR',
    defaultNS: 'translations'
}



i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig)

export default i18n