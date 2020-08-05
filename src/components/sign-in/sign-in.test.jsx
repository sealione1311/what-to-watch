import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in.jsx';

it(`Should render SignIn correctly`, () => {
  const tree = renderer.create(
      <SignIn
        onFormSubmit={() => {}}
        isErrorAuth={true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
