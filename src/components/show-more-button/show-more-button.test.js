import React from 'react';
import renderer from 'react-test-renderer';
import ShowMoreButton from './show-more-button.jsx';


describe(`Should render ShowMoreButton correctly`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<ShowMoreButton
        onShowMoreButtonClick = {() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
