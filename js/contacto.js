const BASE_URL = "https://rosalbita-email.azurewebsites.net"
const PATH = "/api/CorreoFunction"
const KEY = "code=momCZcwX0mkRWZXravOtrJ4rgf8cuK4lTpc/jL6Q1LA9CrCH3QwsKQ=="

const enviarRequest = async (datos) => {
    try {
        const body = datos
        console.log(`Enviando request`);
        axios.post(`${BASE_URL}${PATH}?${KEY}`, body).then(response=>{
    
            console.log(`Correo exitoso`, response.status);


        });
    
      } catch (errors) {
        console.error(errors);
      }
      Swal.fire({
        title: 'Gracias por contactarnos',
        text: 'Le contactaremos de vuelta pronto.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })        

      $('#nombreInput').val('');
      $('#emailInput').val('');
      $('#mensajeInput').val('');
  };



function enviarCorreo() {
    var datos = datosContacto()
    if(validarDatos(datos)){
        enviarRequest(datos)
    }
}

function validarDatos(datos){
    var correoValido =  validarRegexVacio(datos.email)
    var nombreValido = validarRegexVacio(datos.nombre)
    var mensajeValido = validarRegexVacio(datos.mensaje)

    //console.log(datos.mensaje)

    if(correoValido && nombreValido && mensajeValido){
        if(validarRegexCorreo(datos.email)){
            return true
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'No es un correo válido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            return false
        }
    }else{
        //debe completar
        Swal.fire({
            title: 'Error!',
            text: 'Debe completar los campos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
          return false
    }
}

function datosContacto(){
    // const form = $('#formContacto').serializaArray()
    var nombre = $('#nombreInput').val();
    var email = $('#emailInput').val();
    var mensaje = $('#mensajeInput').val();
    var datos = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    }
    return datos
}


$(document).ready(function () {
    $('#enviarBtn').click(enviarCorreo);
});



function validarRegexVacio(texto) {
    let regex = /.+/;
    if (regex.test(texto) === false) {
        return false;
    } else {
        if(texto ===undefined){
            return false
        }else{
            return true;
        }
    }
};

function validarRegexCorreo(texto) {
    let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (regex.test(texto) === false) {
        return false;
    } else {
        return true;
    }
};




