import ReactOnRails from 'react-on-rails';
import routerCommentsStore from '../bundles/comments/store/routerCommentsStore';
import commentsStore from '../bundles/comments/store/commentsStore';

// Stores must still be manually registered since they're not components
ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});