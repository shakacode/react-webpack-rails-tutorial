import ReactOnRails from 'react-on-rails';
import 'jquery-ujs';
import { Turbo } from '@hotwired/turbo-rails';

// eslint-disable-next-line no-unused-vars
import controllers from '../controllers';

import NavigationBarApp from '../bundles/comments/startup/NavigationBarApp';
import Footer from '../bundles/comments/components/Footer/Footer';

Turbo.session.drive = false;

ReactOnRails.setOptions({
  // traceTurbolinks: process.env.TRACE_TURBOLINKS, // eslint-disable-line no-undef
  // process.env.TRACE_TURBOLINKS -> error: development is not defined
  traceTurbolinks: true,
});

ReactOnRails.register({
  NavigationBarApp,
  Footer,
});
