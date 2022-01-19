const formulario_reg = document.getElementById('frm-reg');
const input = document.querySelectorAll('#frm-reg');

//validaciones del lado del cliente
//--expresiones regulares
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    cedula: /^\d{10}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/, // 10 numeros.
    clave: /^.{4,12}$/ // 4 a 12 digitos.
}


const campos = {
    nombre:false,
    apellido: false,
    cedula: false,
    correo: false,
    telefono: false,
    clave: false
}

//valida que los dos password este escritos correctamente
const validarPass2 = () =>{
    const inPass1 = document.getElementById('fpass'); //pass original
    const inPass2 = document.getElementById('fpass1'); //pass repetir

    if(inPass1.value !== inPass2.value){
        
    }

}

const validarFormuario = (event) =>{ //event -> de evento
    switch(event.target.name){
        case 'nombre':
            validarCampo(expresiones.nombre,event.target,'nombre');
            break;

        case 'apellido':
            validarCampo(expresiones.nombre,event.target,'apellido');
            break;

        case 'cedula':
            validarCampo(expresiones.nombre,event.target,'cedula');
            break;

        case 'correo':
            validarCampo(expresiones.nombre,event.target,'correo');
            break;

        case 'telefono':
            validarCampo(expresiones.nombre,event.target,'telefono');
            break;

        case 'clave':
            validarCampo(expresiones.nombre,event.target,'clave');
            break;

        case 'repass':
            validarCampo(expresiones.nombre,event.target,'repass');
            break;
    }
    
}

const validarCampo = (expresion,input,campo) =>{
    if(expresion.test(input.value)){
		document.getElementById(`f${campo}`).classList.remove('frm-group-incorrecto');
		document.getElementById(`f${campo}`).classList.add('frm-group-correcto');
		document.querySelector(`#f${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#f${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#f${campo} .frm-input-error`).classList.remove('form-group-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`f${campo}`).classList.add('frm-group-incorrecto');
		document.getElementById(`f${campo}`).classList.remove('frm-group-correcto');
		document.querySelector(`#f${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#f${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#f${campo} .frm-input-error`).classList.add('frm-input-error-activo');
		campos[campo] = false;
	}
}

input.forEach((input)=>{
    input.addEventListener('keyup',validarFormuario);
    input.addEventListener('blur',validarFormuario);
});

formulario_reg.addEventListener('submit',(e) =>{
    e.preventDefault(); //evita que envie el submit sin antes completar el evento de escucha
    //Comparamos que todos los campos sean validos antes de enviar
    if(campos.nombre && campos.apellido && campos.clave && campos.correo && campos.telefono && campos.cedula ){
		formulario.reset();

		document.getElementById('frm-msj-exito').classList.add('frm-msj-exito-activo');
		setTimeout(() => {
			document.getElementById('frm-msj-exito').classList.remove('frm-msj-exito-activo');
		}, 5000);

		document.querySelectorAll('.frm-group-correcto').forEach((icono) => {
			icono.classList.remove('frm-group-correcto');
		});
	} else {
		document.getElementById('from-msj').classList.add('frm-msj-activo');
	}
    
});
