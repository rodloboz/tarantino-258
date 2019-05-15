const apiURL = 'https://tarantino-quotes.herokuapp.com';
const quotes = document.getElementById('quotes');
const button = document.getElementById('go-button');

const renderQuote = (quote) => {
  return `<div class="quote">
            <div class="quote-wrapper">
              <div class="quote-heading">
                ${quote.character}
                in
                ${quote.movie}
              </div>
              <div class="quote-body">${quote.body}</div>
              <div class="quote-delete">
                <i class="far fa-trash-alt"></i>
              </div>
            </div>
          </div>`;
};

const removeQuote = (event) => {
  const btn = event.target;
  btn.closest('.quote').remove();
};

const setupEventListeners = () => {
  const deleteBtns = document.querySelectorAll('.quote-delete');
  deleteBtns.forEach(btn => addEventListener('click', removeQuote));
};

const getQuotes = () => {
  fetch(`${apiURL}/quotes`)
    .then(response => response.json())
    .then((data) => {
      quotes.innerHTML = '';
      data.forEach((json) => {
        const newQuote = document.createElement('div');
        newQuote.innerHTML = renderQuote(json);
        quotes.insertBefore(newQuote, null);
      });
      setupEventListeners();
    });
};

button.addEventListener('click', () => {
  button.innerText = 'Fetching...';
  button.classList.add('disabled');
  getQuotes();
});
