// - Obtiene datos simulados de usuarios desde la API JSONPlaceholder `https://jsonplaceholder.typicode.com/users`.
//     - Agrega una edad aleatoria a cada usuario.
//     - Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`
//     - Muestra detalles específicos de cada usuario en la lista en el DOM: name, age, username, img, phone, email, company, address
//     - address tendrá estos datos como valor: usuario.address.street, usuario.address.suite, usuario.address.city

const list = document.getElementById("listaUsuarios");
const genAge = () => {
  return Math.floor(Math.random() * (65 - 18 + 1)) + 18; //genera una edad entre 0 a 48  + 18 +1
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
      const users = data
        .map((user) => {
          const { id, address } = user;
          return {
            ...user,
            age: genAge(),
            img: `assets/img/${id}.jpeg`,
            addres: `${address.street + address.suite + address.zipcode}`,
          };
        })
        .map((user) => {
          const { address, name, age, username, img, phone, email, company } =
            user;
          const template = `
          <li class="userInfo" >
          <div class="user">
              <div class="mainCard">
                  <div class="mainContent">
                      <p><strong>Nombre:</strong>${name}</p>
                      <p><strong>Edad:</strong>${age}</p>
                      <p><strong>Username:</strong>${username}</p>
                      <p><strong>Telefono:</strong>${phone}</p>
                      <p><strong>Email:</strong>${email}</p>
                  </div>
                  <img src="${img}" alt="imagen"></img>
              </div>
              <div class="footerCard">
                  <p><strong>Compañia:</strong>${company.name}</p>
                  <p><strong>Direccion:</strong>${address}</p>
              </div>
          </div>
          </li>
          `;
          return template;
        })
        .join(""); //para eliminar las comas;
      list.innerHTML = users; //users contiene todo el template
    });
};

getUsers();
console.log(getUsers());
