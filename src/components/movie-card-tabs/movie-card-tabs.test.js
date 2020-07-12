import React from 'react';
import renderer from 'react-test-renderer';
import MovieCardTabs from './movie-card-tabs.jsx';

const tabs = [`Overview`, `Details`, `Reviews`];
const onTabClick = () => {};
const activeTab = `Overview`;

describe(`Render MovieCardTabs`, () => {
  it(`Render MovieCardTabs`, () => {
    const tree = renderer.create(
        <MovieCardTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
