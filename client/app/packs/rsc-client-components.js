'use client';

// RSC client components registration.
// Components with 'use client' that are used in server components must be
// available in a client bundle chunk so the React flight client can load them.

import TogglePanel from '../bundles/server-components/components/TogglePanel';
import ReactOnRails from 'react-on-rails-pro';

// Register as a standard component so it's bundled in a client-accessible chunk
ReactOnRails.register({ TogglePanel });
