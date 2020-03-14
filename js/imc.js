//Creo mi arreglo de personas
let personas = [
    {
        tipo_identificacion: "CC",
        identificacion: "1001618278",
        nombres: "Jheyson",
        apellidos: "Vèlez Marín",
        correo: "jheyson.v.m1@gmail.com",
        peso: 77,
        estatura: 174
    }
]

//Funcion para listar a las personas con su imc en la card
function listarPersonas() {
    let data = "";
    for (let i = 0; i < personas.length; i++) {
        let persona = personas[i];

        data += "<tr>"
        data += `<td>${persona.tipo_identificacion}</td>`
        data += `<td>${persona.identificacion}</td>`
        data += `<td>${persona.nombres}</td>`
        data += `<td>${persona.apellidos}</td>`
        data += `<td>${persona.correo}</td>`
        data += `<td>${persona.peso}</td>`
        data += `<td>${persona.estatura}</td>`
        data += `<td>${calcularIMC(i)}</td>`
        data += `<td><input class="btn btn-primary" type="button" onClick="cargarInformacion(${i})" value="editar"></td>`
        data += '<td><input class="btn btn-primary" type="button" onClick="eliminarPersona(' + i + ')" value="eliminar"></td>'
        data += "</tr>"
    }

    document.getElementById("lista_personas").innerHTML = data;
};

//funcion para calcular el imc con la formula peso/estatura al cuadrado
function calcularIMC(index) {
    let persona = personas[index]
    let peso = parseFloat(persona.peso)
    let estatura = parseFloat(persona.estatura)
    let imc = 0
    imc = peso/(estatura*estatura)
    imc = imc.toFixed(2)
    return imc;
}

//para agregar una persona a la tabla de personas
function agregarPersona() {
    let tipo_identificacion = document.getElementById("tipo_identificacion").value
    let identificacion = document.getElementById("Identificacion").value
    let nombres = document.getElementById("Nombres").value
    let apellidos = document.getElementById("Apellidos").value
    let correo = document.getElementById("Correo").value
    let peso = document.getElementById("Peso").value
    let estatura = document.getElementById("Estatura").value

    let persona = { tipo_identificacion: tipo_identificacion, identificacion: identificacion, nombres: nombres, apellidos: apellidos, correo: correo, peso: peso, estatura: estatura }
    personas.push(persona)

    localStorage.setItem('personas', JSON.stringify(personas));
    listarPersonas()
    limpiarCampos()
};

//para eliminar a una persona de la tabla
eliminarPersona = function (index) {
    personas.splice(index, 1)
    localStorage.setItem('personas', JSON.stringify(personas));
    listarPersonas()
};

//para poner la informacion de una persona al ir a actualizarla
function cargarInformacion(index) {
    let persona = personas[index]
    personaTemp = index
    document.getElementById("tipo_identificacion").value = persona.tipo_identificacion
    document.getElementById("Identificacion").value = persona.identificacion
    document.getElementById("Nombres").value = persona.nombres
    document.getElementById("Apellidos").value = persona.apellidos
    document.getElementById("Correo").value = persona.correo
    document.getElementById("Peso").value = persona.peso
    document.getElementById("Estatura").value = persona.estatura

    document.getElementById("btncrearPersona").style.display = "none"
    document.getElementById("btnactualizarPersona").style.display = "inline"
}

//para vacear los campos del formulario
function limpiarCampos() {
    document.getElementById("tipo_identificacion").value = ""
    document.getElementById("Identificacion").value = ""
    document.getElementById("Nombres").value = ""
    document.getElementById("Apellidos").value = ""
    document.getElementById("Correo").value = ""
    document.getElementById("Peso").value = ""
    document.getElementById("Estatura").value = ""
}

//para tomar los valores que se encuentran en el formulario
function obtenerValores() {
    let tipo_identificacion = document.getElementById("tipo_identificacion").value
    let identificacion = document.getElementById("Identificacion").value
    let nombres = document.getElementById("Nombres").value
    let apellidos = document.getElementById("Apellidos").value
    let correo = document.getElementById("Correo").value
    let peso = document.getElementById("Peso").value
    let estatura = document.getElementById("Estatura").value

    let persona = { tipo_identificacion: tipo_identificacion, identificacion: identificacion, nombres: nombres, apellidos: apellidos, correo: correo, peso: peso, estatura: estatura }
    return persona;
}

//para actualizar una persona en el arreglo de personas
function actualizarPersona() {
    let personaActualizada = obtenerValores()
    personas.splice(personaTemp, 1, personaActualizada)
    limpiarCampos()
    listarPersonas()
    document.getElementById("btncrearPersona").style.display = "inline"
    document.getElementById("btnactualizarPersona").style.display = "none"
    localStorage.setItem('personas', JSON.stringify(personas));
}

//para cargar lo que hay en el localstorage
function localS() {
    var datosLocal = JSON.parse(localStorage.getItem('personas'));
    if (datosLocal === null) {
        personas = [];
    } else {
        personas = datosLocal;
    }
}

localS()
listarPersonas()