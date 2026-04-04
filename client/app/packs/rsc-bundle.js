// RSC (React Server Components) bundle entry point.
// This file is only used by the RSC bundle configuration.
// It imports the same client component registrations as server-bundle.js,
// plus the server component registrations.

// Import existing client component registrations
import './stores-registration';
import './../generated/server-bundle-generated.js';

// React Server Components registration (server-side)
import registerServerComponent from 'react-on-rails-pro/registerServerComponent/server';
import ServerComponentsPage from '../bundles/server-components/ServerComponentsPage';

registerServerComponent({
  ServerComponentsPage,
});
