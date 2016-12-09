import React from 'react';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';
import { translations } from './translations';

const InitI18nLocale = () => {
  addLocaleData([...en, ...de, ...ja, ...zh]);
};

const SelectLanguage = (onChange, locale = defaultLocale) => (
  <select onChange={(e) => onChange(e.target.value)} value={locale} >
    <option value='en'>English</option>
    <option value='de'>Deutsch</option>
    <option value='ja'>日本語</option>
    <option value='zh-CN'>简体中文</option>
    <option value='zh-TW'>正體中文</option>
  </select>
);

const getTranslations = (locale) => {
  return translations[locale];
}

export { InitI18nLocale, SelectLanguage, getTranslations };
