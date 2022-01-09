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
Handlebars.registerHelper("esLun",(dia,option)=>{
    if(dia ==='lunes'){
        return option.fn();
    }
})
Handlebars.registerHelper("esMar",(dia,option)=>{
    if(dia ==='martes'){
        return option.fn(this);
    }
})
Handlebars.registerHelper("esMie",(dia,option)=>{
    if(dia ==='miercoles'){
        return option.fn(this);
    }
})
Handlebars.registerHelper("esJue",(dia,option)=>{
    if(dia ==='jueves'){
        return option.fn(this);
    }
})
Handlebars.registerHelper("esVie",(dia,option)=>{
    if(dia ==='viernes'){
        return option.fn(this);
    }
})
Handlebars.registerHelper("esSab",(dia,option)=>{
    if(dia ==='sabado'){
        return option.fn(this);
    }
})
Handlebars.registerHelper("esDom",(dia,option)=>{
    if(dia ==='domingo'){
        return option.fn(this);
    }
})
