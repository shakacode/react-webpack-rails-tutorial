import React from 'react';

import { defaultLocale } from './default';

function SelectLanguage(onChange, locale = defaultLocale) {
  return (
    <select onChange={(e) => onChange(e.target.value)} value={locale}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="ja">日本語</option>
      <option value="zh-CN">简体中文</option>
      <option value="zh-TW">正體中文</option>
    </select>
  );
}

export default SelectLanguage;
