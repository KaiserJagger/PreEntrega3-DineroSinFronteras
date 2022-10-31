                                            /   * Pre Entrega nº 3 *     /
    
/* 
        Nombre: Nicolas Andreolli
*/
                                    
                                //$$$$$$$   Dinero Sin Fronteras    $$$$$$$$

                                    
const listCountrys = [
    
    {
        pais: "Bolivia",
        convArg: 0.04,
        convDolar: 6.84, 
        moneda: "Pesos bolivianos"
        
    },

    {
        pais: "Estados Unidos",
        convArg: 0.007,
        moneda: "Dolares",
    },

    {
        pais: "Canada",
        convArg: 0.009,
        moneda: "Dolares canadienses",

    },

    {
        pais: "Chile",
        convArg: 6.72,
        convDolar: 952.072, 
        moneda : "Pesos chilenos",
    },

    {
        pais: "Brasil",
        convArg: 0.03,
        convDolar: 5.32,
        moneda: "Reales", 
    },

    {
        pais: "Uruguay",
        convArg: 0.28,
        convDolar: 41.19,
        moneda: "Pesos uruguayos",
    },

    {
        pais: "Venezuela",
        convArg: 228.90,
        convDolar: 839.427,
        moneda: "Bolivarianos",
    },

    {
        pais: "Colombia",
        convArg: 30.85,
        convDolar: 4892.19,
        moneda: "Pesos colombianos",
        
    }

];

const Cambios = [
    "Pesos Argentinos", 
    "Dolares Estadounidenses"
];

const desc = 0.10; //Descuento por servicios

// localStorage.clear()

                          /*      Evento de ingreso a cuenta      */

     const formulario = document.getElementById("formulario");

    const enviarFormulario = (event) => {
        event.preventDefault();
    //capturo 
        const {name, email, password} = event.target
    //cargo los datos en el array
        const cuentas = [];
                                
        if (name.value.length === 0 || email.value.length === 0){
            alert("El nombre o email no es valido");
            }else {
                cuentas.push({
                    name : name.value,
                    email: email.value,
                    password: password.value,
                    });
                                
                localStorage.setItem("cuenta", JSON.stringify(cuentas));
                console.log("Se registro correctamente, revisar LocalStorage")
                
                //limpio los input
                name.value = "";
                email.value = "";
                password.value = "";
            }
                                           
    }
    formulario.addEventListener("submit", enviarFormulario);
   
    // localStorage.clear();

// Creo el select paises
const selectCountry = document.getElementById("selectCountrys");

//  Creo las opciones
for (const paisesDom of listCountrys){

    const option = document.createElement("option");
    option.innerText= paisesDom.pais;

    //Agrego opciones al select
    selectCountry.append(option);
}

//Agrego evento de change
selectCountry.addEventListener("change",(event) =>{
    const target = event.target;
    const valor = target.value;
});

                    
                // Tipo de moneda

const seleccionMoneda = document.getElementById("tipo_conversion");

//Creo las opciones
    for (const cambio of Cambios){
        const option = document.createElement("option");
        option.innerText = cambio;
        //Add options to a select
       seleccionMoneda.append(option);
    }


//Agregamos evento de change
seleccionMoneda.addEventListener("change", (event) => {
   const target = event.target;
   const valor = target.value;
});



        
                //Conversion

//capturo el form
const conversion = document.getElementById("conversion");


let enviarConversion = (event) =>  {
event.preventDefault();

//obtengo el monto a convertir
const enterAmount = document.getElementById("amount");
if (enterAmount.value.length === 0){
    alert("Ingrese un monto");
}

//busco pais por nombre
 const paises = buscarPais(selectCountry.value);

 let amount = enterAmount.value;
 //Hago la conversion y descuento el porcentaje
let descTotal = amount * desc;
let res = amount - descTotal;


if(seleccionMoneda.value === Cambios[0]){
    paises.convArg = (res * paises.convArg);
    mostrarInfo(paises);
    console.log("La ganancia es: $"+ descTotal + " pesos");

}else if(seleccionMoneda.value === Cambios[1]){
    paises.convDolar = (res * paises.convDolar);
    mostrarInfo2(paises);
   console.log("La ganancia es: $"+ descTotal + " dolares");

}else{
    alert("Por favor ingrese un tipo de moneda");
}

 //limpio el input 
enterAmount.value = "";
}

conversion.addEventListener("submit", enviarConversion);

                                   
                                        /*Funciones*/

function mostrarInfo(paises1){
    const p = document.getElementById("detalle_conversion");
    p.innerHTML = `Se van a mandar a <strong>${paises1.pais}</strong> la suma de: <strong>$${paises1.convArg.toFixed()}</strong> ${paises1.moneda}`
    paises1.convArg = 0;
    conversion;
} 

function mostrarInfo2(paises1){
    const p = document.getElementById("detalle_conversion");
    p.innerHTML = `Se van a mandar a <strong>${paises1.pais}</strong> la suma de: <strong>$${paises1.convDolar.toFixed()}</strong> ${paises1.moneda}`
    paises1.convDolar = 0;
    conversion;
} 


function buscarPais(pais){
    return listCountrys.find((el) =>{
       return el.pais === pais;
   });
}
