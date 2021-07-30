import * as model from './model.js';
import SearchView from './views/SearchView.js';
import ResultsView from './views/ResultsView.js';

const controllerSearch = async function () {
  // Check Query
  const query = SearchView.getQuery();
  if (!query) return;

  // Render load message
  SearchView.moveToTop();
  ResultsView.renderLoading();
  // load Amiibo
  await model.loadAmiibo(query);
  // Render View
  ResultsView.render(model.state);
};

const controllerPag = function (dir) {
  // Move to slide
  model.state.slide =
    dir === 'next' ? model.state.slide + 1 : model.state.slide - 1;
  ResultsView.moveToSlide(model.state.slide);
  // Display or hide buttons
};

const init = function () {
  SearchView.addHandlerSearch(controllerSearch);
  ResultsView.addHandlerPag(controllerPag);
};

init();
