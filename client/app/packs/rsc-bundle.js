// RSC (React Server Components) bundle entry point.
// This file is only used by the RSC bundle configuration.
// It imports the same client component registrations as server-bundle.js,
// plus the server component registrations.

// Initialize ReactOnRails RSC support. With the 'react-server' resolve condition,
// this resolves to ReactOnRailsRSC.js which sets isRSCBundle = true and registers
// serverRenderRSCReactComponent. Must be imported before other registrations.
import 'react-on-rails-pro';

// Import stores registration (has 'use client' — RSC loader replaces with client reference)
import './stores-registration';

// React Server Components registration (server-side)
// Note: server-bundle-generated.js is NOT imported here because it contains
// traditional SSR components (e.g., RouterApp.server.jsx) that use client-only
// React APIs (useState, Component, etc.) incompatible with the react-server condition.
// Client component references are handled automatically by the RSC loader/plugin.
import registerServerComponent from 'react-on-rails-pro/registerServerComponent/server';
import ServerComponentsPage from '../bundles/server-components/ServerComponentsPage';

registerServerComponent({
  ServerComponentsPage,
});
