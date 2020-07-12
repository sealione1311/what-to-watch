import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsTab from './reviews-tab.jsx';
import reviews from '../../mocks/reviews.js';

describe(`Should render ReviewsTab correctly`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<ReviewsTab
        reviews={reviews}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
