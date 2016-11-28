import _ from 'lodash/fp';
import withIndexProps from '../hocs/withIndexProps';
import withInitialAction from '../hocs/withInitialAction';
import Index from '../components/Index/Index';

export default _.compose(
  withIndexProps,
  withInitialAction(_.get(['actions', 'fetch']))
)(Index);
