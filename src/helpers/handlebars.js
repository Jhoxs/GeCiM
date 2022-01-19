const Handlebars = require('handlebars');
/*Esta seccion nos permite utilizar los templets hbs */
//options será el contenido que se encuentra dentro de los condicionales
Handlebars.registerHelper("esAdmin",(rol,options)=>{
    if(rol === 'administrador'){
        return options.fn(this);
    }
})
Handlebars.registerHelper("esPaciente",(rol,options)=>{
    if(rol != 'doctor'){
        return options.fn(this);
    }
})
Handlebars.registerHelper("esDoctor",(rol,options)=>{
    if(rol === 'doctor'){
        return options.fn(this);
    }
})


//Verifica los dias
Handlebars.registerHelper("esLun",(turno,options)=>{
    if(turno.dia_turno ==='lunes'){
        //console.log(options.fn(truno))
        //return options.fn(this)
        return options.fn(turno)
    }
})
Handlebars.registerHelper("esMar",(turno,option)=>{
    if(turno.dia_turno ==='martes'){
        return option.fn(turno);
    }
})
Handlebars.registerHelper("esMie",(turno,option)=>{
    if(turno.dia_turno ==='miercoles'){
        return option.fn(turno);
    }
})
Handlebars.registerHelper("esJue",(turno,option)=>{
    if(turno.dia_turno ==='jueves'){
        return option.fn(turno);
    }
})
Handlebars.registerHelper("esVie",(turno,option)=>{
    if(turno.dia_turno ==='viernes'){
        return option.fn(turno);
    }
})
Handlebars.registerHelper("esSab",(turno,option)=>{
    if(turno.dia_turno ==='sabado'){
        return option.fn(turno);
    }
})
Handlebars.registerHelper("esDom",(turno,option)=>{
    if(turno.dia_turno ==='domingo'){
        return option.fn(turno);
    }
})
