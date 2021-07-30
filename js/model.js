export const state = {
  amiibos: [],
  message: '',
  slide: 0,
};

const getData = async function (url) {
  try {
    const dataJson = await fetch(url);
    if (!dataJson.ok) throw new Error('Amiibo not found');
    const { amiibo: data } = await dataJson.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const loadAmiibo = async function (query) {
  try {
    const data = await getData(
      `https://www.amiiboapi.com/api/amiibo/?name=${query}`
    );
    state.amiibos = data;
  } catch (err) {
    state.amiibos = [];
    state.message = err.message;
  }
};
