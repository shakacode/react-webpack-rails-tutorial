import ReactOnRails from 'react-on-rails';
import 'bootstrap-loader';
import 'jquery-ujs';
import { Turbo } from "@hotwired/turbo-rails";
import controllers from '../controllers';

import NavigationBarApp from '../bundles/comments/startup/NavigationBarApp';

Turbo.session.drive = false;

ReactOnRails.setOptions({
  // traceTurbolinks: process.env.TRACE_TURBOLINKS, // eslint-disable-line no-undef
  // process.env.TRACE_TURBOLINKS -> error: development is not defined
  traceTurbolinks: true,
});

ReactOnRails.register({
  NavigationBarApp,
});
