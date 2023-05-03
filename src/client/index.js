

//{ mode: 'no-cors' }: pour accéder à une ressource sur un domaine différent de celui de notre page Web

/**    Inscription               * */
const form = document.querySelector('#inscription-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const user_name = formData.get('user_name');
  const user_email = formData.get('user_email');

  // Envoi des données au serveur avec fetch
  const url = "http://localhost:3000/inscription";
  const data = { user_name, user_email };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
});


