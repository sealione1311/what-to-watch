import React from "react";
import renderer from "react-test-renderer";
import LoadingPage from "./loading-page.jsx";
import {Router} from "react-router-dom";
import history from "../../history";

describe(`LoadingPage`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <LoadingPage />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
