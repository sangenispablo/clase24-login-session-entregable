let user;
fetch("/currentUser")
  .then((result) => result.json())
  .then((json) => {
    document.getElementById("usuario").innerHTML = json.username;
  });
