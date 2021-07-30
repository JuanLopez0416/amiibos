class SearchView {
  parentElement = document.querySelector(`.search-input-container`);

  getQuery() {
    const query = this.parentElement.querySelector(`#search-input`).value;
    return query;
  }

  clearInput() {
    this.parentElement.querySelector(`#search-input`).value = '';
  }

  moveToTop() {
    this.parentElement.classList.remove('search-empty');
  }

  addHandlerSearch(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
