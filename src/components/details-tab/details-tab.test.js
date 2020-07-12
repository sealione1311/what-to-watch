import React from 'react';
import renderer from 'react-test-renderer';
import DetailsTab from './details-tab.jsx';
import film from '../../mocks/film.js';

describe(`Should render DetailsTab correctly`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<DetailsTab
        movie={film}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
