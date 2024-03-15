import { useLiveMode } from '@sanity/react-loader';
import { VisualEditing } from '@sanity/visual-editing/remix';

import { client } from '~/sanity/client';

// Default export required for React Lazy loading
// eslint-disable-next-line import/no-default-export
export default function LiveVisualEditing() {
  // Enable live queries using the client configuration
  useLiveMode({ client });

  return <VisualEditing />;
}
