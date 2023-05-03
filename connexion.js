
/**  Connexion                 **/

const form1 = document.querySelector('#connexion-form');

form1.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form1);
  const user_name = formData.get('user_name');
  const user_email = formData.get('user_email');

  // Envoi des données au serveur avec fetch
  const url_connexion = "http://localhost:3000/connexion";
  const data = { user_name, user_email };

  fetch(url_connexion, {
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

