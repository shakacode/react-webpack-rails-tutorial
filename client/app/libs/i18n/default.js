import { defineMessages } from 'react-intl';

export const defaultLocale = 'en';

export const defaultMessages = defineMessages({
  comments: {
    id: 'app.comments',
    defaultMessage: 'Comments',
  },
  loading: {
    id: 'app.loading',
    defaultMessage: ' (loading...)',
  },
  submit: {
    id: 'app.submit',
    defaultMessage: 'Submit',
  },
  author: {
    id: 'app.author',
    defaultMessage: 'Author',
  },
  text: {
    id: 'app.text',
    defaultMessage: 'Text',
  },
});
