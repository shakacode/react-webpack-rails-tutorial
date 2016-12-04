import React from 'react';
import _ from 'lodash/fp';
import withInitialAction from 'ReactNativeTutorial/app/bundles/common/hocs/withInitialAction';
import Mock from 'mock';
import renderer from 'react-test-renderer';

describe('withIndexProps', () => {
  it('adds props to Index component', () => {
    const Component = withInitialAction(_.get('action'))(Mock);
    const action = jest.fn();
    renderer.create(<Component action={action} />);
    expect(action).toBeCalled();
  });
});
