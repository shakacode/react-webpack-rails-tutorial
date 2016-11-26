import React from 'react';
import { addLocaleData, defineMessages } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';
import _ from 'lodash';

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

const defaultLocale = 'en';

const defaultMessages = defineMessages({
  type: {
    id: 'type',
    defaultMessage: 'English',
  },
  comments: {
    id: 'comments',
    defaultMessage: 'Comments',
  },
  descriptionSupportMarkdown: {
    id: 'description.support_markdown',
    defaultMessage: 'Text supports Github Flavored Markdown.',
  },
  descriptionDeleteRule: {
    id: 'description.delete_rule',
    defaultMessage: 'Comments older than 24 hours are deleted.',
  },
  descriptionSubmitRule: {
    id: 'description.submit_rule',
    defaultMessage: 'Name is preserved. Text is reset, between submits.',
  },
  formHorizontal: {
    id: 'form.horizontal',
    defaultMessage: 'Horizontal Form',
  },
  formStacked: {
    id: 'form.stacked',
    defaultMessage: 'Stacked Form',
  },
  formInline: {
    id: 'form.inline',
    defaultMessage: 'Inline Form',
  },
  inputNameLabel: {
    id: 'input.name.label',
    defaultMessage: 'Name',
  },
  inputNamePlaceholder: {
    id: 'input.name.placeholder',
    defaultMessage: 'Your Name',
  },
  inputTextLabel: {
    id: 'input.text.label',
    defaultMessage: 'Text',
  },
  inputTextPlaceholder: {
    id: 'input.text.placeholder',
    defaultMessage: 'Say something using markdown...',
  },
  inputSaving: {
    id: 'input.saving',
    defaultMessage: 'Saving',
  },
  inputPost: {
    id: 'input.post',
    defaultMessage: 'Post',
  },
});

const convertTranslations = (trans, locale) => {
  const translations = JSON.parse(trans);
  const flatMsg = {};
  for (const key in translations) {
    const tmp = {};
    tmp[key] = flattenMessages(translations[key]);
    Object.assign(flatMsg, tmp);
  }
  return _.isEmpty(flatMsg) ? null : flatMsg[`${locale}`];
};

const flattenMessages = (msg, prefix = '') => {
  if (!_.isEmpty(msg)) {
    return Object.keys(msg).reduce((messages, key) => {
      let value       = msg[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    }, {});
  };
};

export { InitI18nLocale, SelectLanguage, convertTranslations,
          defaultMessages, defaultLocale };
