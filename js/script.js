// - Obtiene datos simulados de usuarios desde la API JSONPlaceholder `https://jsonplaceholder.typicode.com/users`.
//     - Agrega una edad aleatoria a cada usuario.
//     - Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`
//     - Muestra detalles específicos de cada usuario en la lista en el DOM: name, age, username, img, phone, email, company, address
//     - address tendrá estos datos como valor: usuario.address.street, usuario.address.suite, usuario.address.city

const list = document.getElementById("listaUsuarios");
const genAge = () => {
  return Math.floor(Math.random() * (60 - 18 + 1)) + 18; //genera una edad entre 60 y 18
};
const getUsers = () => {
  let url = `https://jsonplaceholder.typicode.com/users`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la peticion");
      }
      return response.json();
    })
    .then((data) => {
      const template = data.map(
        (user) => `<li class="userInfo" >
        <div class="user">
            <div class="mainCard">
                <div class="mainContent">
                    <p><strong>Nombre:</strong>${user.name}</p>
                    <p><strong>Edad:</strong>${genAge()}</p>
                    <p><strong>Username:</strong>${user.username}</p>
                    <p><strong>Telefono:</strong>${user.phone}</p>
                    <p><strong>Email:</strong>${user.email}</p>
                </div>
                <img src="assets/img/${user.id}.jpeg" alt="imagen"></img>    
            </div>
            <div class="footerCard">
                <p><strong>Compañia:</strong>${user.company.name}</p>
                <p><strong>Direccion:</strong>${
                  user.address.street +
                  user.address.suite +
                  user.address.zipcode
                }</p>
            </div>
        </div>
        
        </li>
        `
      );
      list.innerHTML = template.join(""); //para eliminar las comas;
    });
};

getUsers();
console.log(genAge());
