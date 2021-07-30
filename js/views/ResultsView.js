class ResultsView {
  row = document.querySelector(`.amiibo-row`);
  parentElement = document.querySelector(`.amiibo-slide`);
  pagination = document.querySelector(`.pagination-container`);
  data;

  render(data) {
    this.data = data;
    const markup = this._generateMarkup();
    this._showRow();
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
    this._showDirections();
  }

  renderLoading() {
    const markup = `
    <h2 class="amiibo-name">Cargando...</h2>
    `;
    this._showRow();
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  _showRow() {
    this.row.classList.remove('hidden');
  }

  _generateMarkup() {
    let str = '';
    if (!Array.isArray(this.data.amiibos) || this.data.amiibos.length === 0)
      return `<h2 class="amiibo-name">${this.data.message}</h2>`;

    this.data.amiibos.forEach((amii, i) => {
      str += `
        <div class="amiibo-item" data-index="${i}">
                <h2 class="amiibo-name">${amii.name}</h2>
                <figure class="amiibo-img-container">
                  <img
                    src="${amii.image}"
                    alt="${amii.name}"
                  />
                </figure>
                <p class="amiibo-series amiibo-info">Serie: ${amii.amiiboSeries}</p>
                <p class="amiibo-game-series amiibo-info">Juego: ${amii.gameSeries}</p>
                <p class="amiibo-date amiibo-info">Fecha: ${amii.release.jp}</p>
              </div>
        `;
    });
    return str;
  }

  moveToSlide(slide) {
    this.data.slide = slide;
    this.parentElement.style.transform = `translateX(${-slide * 100}%)`;
    this._showDirections();
  }

  _showDirections() {
    const left = document.querySelector(`.left`);
    const right = document.querySelector(`.right`);

    if (!Array.isArray(this.data.amiibos) || this.data.amiibos.length <= 1) {
      this._toggleElement(left, 'hide');
      this._toggleElement(right, 'hide');
    }

    if (this.data.slide > 0 && this.data.slide < this.data.amiibos.length - 1) {
      this._toggleElement(left, 'display');
      this._toggleElement(right, 'display');
    }

    if (this.data.slide === 0) {
      this._toggleElement(right, 'display');
      this._toggleElement(left, 'hide');
    }

    if (
      this.data.slide === this.data.amiibos.length - 1 &&
      this.data.amiibos.length !== 1
    ) {
      this._toggleElement(left, 'display');
      this._toggleElement(right, 'hide');
    }
  }

  _toggleElement(domEl, action) {
    if (action === 'display') domEl.classList.remove('hidden');
    if (action === 'hide') domEl.classList.add('hidden');
  }

  addHandlerPag(handler) {
    this.pagination.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination-btn');
      if (!btn) return;
      handler(btn.dataset.direction);
    });
  }
}

export default new ResultsView();
