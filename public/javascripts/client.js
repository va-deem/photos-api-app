const getRecentBtn = document.getElementById('getRecentBtn');
const container = document.querySelector('.container');

const templates = {};
async function loadTemplate() {
  const response = await fetch('/partials/info.hbs');
  templates.info = await response.text();
}
loadTemplate();

getRecentBtn.addEventListener('click', (event) => {
  window.location.href = '/sets/recent';
});


container.addEventListener('click', async (event) => {
  let picUrl = event.target.getAttribute('src');
  const response = await fetch('/sets/info', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: event.target.getAttribute('id'),
    }),
  });

  const result = await response.json();
  const template = Handlebars.compile(templates.info);
  container.innerHTML = template(result);
});
