import React from 'react';
import renderer from 'react-test-renderer';
import OverviewTab from './overview-tab.jsx';
import film from '../../mocks/film.js';

describe(`Should render OverviewTab correctly`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(<OverviewTab
        movie={film}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
