//hacemos referencia al boton con ese id
//muestra alerta al eliminar un turno usuario
$('#btn-eTurno').click(()=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que deseas eliminar esto?',
        text: "Esta acción no se podra revertir!",
        icon: 'warning',
        background:'#011126',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Elimínalo!',
        cancelButtonText: ' No, Cancelalo!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/turnos/deleteTurno';
        } else if (result.dismiss === Swal.DismissReason.cancel) {/* Read more about handling dismissals below */
          //accion en caso de que no pase nada
        }
      })
})

//muestra alerta al eliminar un usuario
$('.btn-eUser').click((e)=>{
    //e.target.value elige el valor que esta dentro del arreglo de valores
    let link = e.target.value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que deseas eliminar esto?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        background:'#011126',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Elimínalo!',
        cancelButtonText: ' No, Cancelalo!',
        reverseButtons: true
      }).then((result) => {//el resultado de presionar ok
        if (result.isConfirmed) {
            //redirecciona a la ruta delete/:id<-(e)
            window.location.href = '/usuarios/delete/'+link;
        } 
      })
})

//muestra alerta al eliminar todos los turnos gestTurno con el mismo Id 
$('.btn-eGTurnoId').click((e)=>{
    //e.target.value elige el valor que esta dentro del arreglo de valores
    let link = e.target.value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que deseas eliminar esto?',
        text: "Esta acción eliminará a todos los turnos con el mismo ID",
        icon: 'warning',
        background:'#011126',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Elimínalo!',
        cancelButtonText: ' No, Cancelalo!',
        reverseButtons: true
      }).then((result) => {//el resultado de presionar ok
        if (result.isConfirmed) {
            //redirecciona a la ruta delete/:id<-(e)
            window.location.href = '/turnos/deleteGesTurno/'+link;
        } 
      })
})

//muestra alerta al eliminar un turno en especifico gestTurno
$('.btn-eGTurno').click((e)=>{
    //e.target.value elige el valor que esta dentro del arreglo de valores
    let link = e.target.value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que deseas eliminar esto?',
        text: "Esta acción eliminará el turno que ha seleccionado y los turnos de los usuarios",
        icon: 'warning',
        background:'#011126',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Elimínalo!',
        cancelButtonText: ' No, Cancelalo!',
        reverseButtons: true
      }).then((result) => {//el resultado de presionar ok
        if (result.isConfirmed) {
            //redirecciona a la ruta delete/:id<-(e)
            window.location.href = '/turnos/deleteGesTurno/'+link;
        } 
      })
})

//Mensaje de confirmacion para aceptar el turno
//Acepta Turno
$('.btn-aTurno').click((e)=>{
    //e.target.hreflang elige el valor que esta dentro del arreglo de valores
    //
    let link = e.currentTarget.name;
    //console.log(e.currentTarget.name);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger m-2'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: '¿Está seguro que desea registrar este turno?',
        text: "Esta acción registrará el turno selecionado",
        icon: 'question',
        background:'#011126',
        color:'white',
        allowOutsideClick: false,
        allowEscapeKey: true,
        showCancelButton: true,
        confirmButtonText: 'Si, Registrar!',
        cancelButtonText: ' No, Cancélalo!',
        reverseButtons: true
      }).then((result) => {//el resultado de presionar ok
        if (result.isConfirmed) {
            //redirecciona a la ruta addTurno/:id<-(e)
            window.location.href = '/turnos/addTurno/'+link;
        } 
      })
})