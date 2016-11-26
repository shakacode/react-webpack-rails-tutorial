import React from 'react';
import I18n from 'i18n-js';

const InitI18n = (railsContext) => {
  I18n.translations = JSON.parse(railsContext.translations);
  I18n.defaultLocale = railsContext.i18nDefaultLocale;
  I18n.fallbacks = true;
};

const SelectLanguage = (onChange) => (
  <select onChange={(e) => onChange(e.target.value)} >
    <option value="en">English</option>
    <option value="de">Deutsch</option>
    <option value="ja">日本語</option>
    <option value="zh-CN">简体中文</option>
    <option value="zh-TW">正體中文</option>
  </select>
);

const SetI18nLocale = (locale) => {
  I18n.locale = locale;
};

export { InitI18n, SelectLanguage, SetI18nLocale };
