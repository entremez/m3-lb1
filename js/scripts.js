
function reserva() {
    let message = "Hola, botón de reserva";
    alert(message);
    console.log(message);
}

let allDoctors = []

function sendForm(){
    let message = "Hola, se está enviando un formulario";
    alert(message);
    console.log(message);
    let nombre = window.prompt("¿Cuál es tu nombre?")
    console.log("tu nombre es : "+ nombre);
    alert("tu nombre es : "+ nombre);

    let email = window.prompt("¿Cuál es tu email?")
    while(!validarEmail(email))
        email = window.prompt("Escribe tu email en un formato correcto example@example.com")
    console.log("tu email es : "+ email);
    alert("tu email es : "+ email);

    let telefono = window.prompt("¿Cuál es tu teléfono?")
    while(!/^([0-9])*$/.test(telefono))
        telefono = window.prompt("Escribe tu teléfono sólo con números")
    console.log("tu teléfono es : "+ telefono);
    alert("tu teléfono es : "+ telefono);
}

function logo(){
    let message = "Hola, este es el logo. En condiciones normales llevaría al home, pero ahora enviaré un alert y un console.log() con este mensaje";
    alert(message);
    console.log(message);       
}


function validarEmail(email) {
    // Expresión regular para validar un correo electrónico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}


async function getData(input) {
  fetch('./src/data/doctors.json')
  .then(response => response.json())
  .then(doctors => {
      document.getElementById("doctors").innerHTML = '';
      const clones =  Object.values({ ...doctors });
      entrada = null;

      if(input){
         entrada = clones.sort((a, b) => (a.name > b.name ? 1 : -1));;
      }else{
         entrada = doctors;
      }
      
      const out = listadoDoctores(doctors);
      console.log(entrada);
      document.getElementById("doctors").innerHTML = out;
  })};

getData(false); //Se deja sin lalamr función para implementar lo requerido en LV1
localStorage.setItem('last', "false");

function order(){
    last = localStorage.getItem("last");    
    if(last == "false"){
        localStorage.setItem('last', "true");
        getData(true);
    }else{
        localStorage.setItem('last', "false");
        getData(false);
    }
}


async function doctores(input) {
  fetch('./src/data/doctors.json')
  .then(response => response.json())
  .then(doctors => {
    document.getElementById("doctors").innerHTML = '';
    console.log('listado de doctores:');
    console.log(doctors);
    const out = listadoDoctores(doctors);
    
    document.getElementById("doctors").innerHTML = out;
  })
}

async function operaciones(){
  fetch('./src/data/doctors.json')
  .then(response => response.json())
  .then(doctors => {
    console.log('clonación');
    let clones =  Object.values({ ...doctors });   
    console.log('clon modificado, agregando un nuevo ítem');
    let new_doctor = {
      id: 10,
      name: 'Dra. Francisca Solar',
      specialty: 'Magia',
      years_of_experience: 20,
      image: '1.jpg',
    };
    clones.push(new_doctor);
    console.log(clones)
    console.log('originales en string');
    console.log(JSON.stringify(doctors));// Usando JSON.stringify() 
    console.log('originales en objeto');
    console.log(doctors); 
    console.log('merge');
    fetch('./src/data/doctorsNew.json')
    .then(response => response.json())
    .then(new_doctors => {
      console.log(new_doctors);
      console.log(doctors);
      const merge = [...doctors, ...new_doctors];
      console.log(merge);
      allDoctors = merge;
      document.getElementById("doctors").innerHTML = '';
      const out = listadoDoctores(merge);
      document.getElementById("doctors").innerHTML = out;
    })
  });

}

function listadoDoctores(doctores){
  let out = ''
  doctores.forEach(doctor => {
    const {days} = doctor.disponibility; //destructuring.
    console.log('se muestra días disponibles de '+doctor.name+' utilizando destructuring: '+days);
    out += `
    <div class="col">
    <div class="card shadow-sm">
      <img class="img-fluid" src="https://picsum.photos/id/`+doctor.id+`/200/300" alt="Equipo 3" height="225">
      <div class="card-body">
        <p class="card-text">`+doctor.name+`</p>
        <p class="card-text">Especialidad: `+doctor.specialty+`</p>
        <p class="card-text">Años de experiencia: `+doctor.years_of_experience+`</p>
        <p class="card-text">Disponibilidad: `+days+`</p>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero recusandae nulla necessitatibus repellendus officia reiciendis delectus nisi doloremque ab. Nobis veniam non saepe necessitatibus quaerat aut consequatur ipsa nihil commodi.</p>
      </div>
    </div>
    </div>`;
  });
  return out;
}

doctores();
operaciones();




function gestion(){
  document.getElementById("gestion").innerHTML = '';
  document.getElementById("doctors").innerHTML = '';
    let out = "<ul class = 'my-3'>";
    allDoctors.forEach(doctor => {
      out+= '<li>'+doctor.name+'<img src="./images/editar.png" width="30px" onclick="openModal('+doctor.id+')"><img src="./images/eliminar.png" width="30px" onclick="eliminar('+doctor.id+')"></li>';
    });    
    document.getElementById("gestion").innerHTML = out+'<ul>';
}

function openModal(id){
  var myModal = new bootstrap.Modal(document.getElementById('myModal')); 
  const doctor = allDoctors.filter((doctor) => doctor.id == id);
  document.getElementById("doctorName").value = doctor[0].name;
  document.getElementById("doctorId").value = doctor[0].id;
  myModal.show(); 
}

function eliminar(id){
  allDoctors = allDoctors.filter((doctor) => doctor.id != id);
  gestion();
}

function guardar(){
  const newName = document.getElementById("doctorName").value;
  const id = document.getElementById("doctorId").value;
  let doctor = allDoctors.filter((doctor) => doctor.id == id);
  doctor[0].name = newName;
  gestion(); 
  const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
  modal.hide(); 
}




