// ----------------------- VALIDACIÓN DE TARJETA DE CRÉDITO -----------------------
// Dato: La mayoría de las tarjetas tienen 16 dígitos.
function validarTarjeta() {
    // Nos debemos asegurar de que la alerta no sea visible antes de terminar de validar.
    let alerta = document.getElementById("alerta");
    alerta.innerText = "";
    alerta.className = "";

    let numero = document.getElementById("numero-tarjeta");
    let digitosTC = numero.value;
    if (digitosTC.length == 0) {
        alerta.innerText = "Tarjeta Inválida";
        alerta.className = "alerta-error";
        return false;
    }

    // PASO 1: Almacenamiento en un arreglo de los dígitos en orden inverso
    let arrTC = Array.from(digitosTC);  // Almacena cada caracter de un string como un elemento en un arreglo
    let arrInverso = arrTC.reverse();  // Invierte el orden de los elementos de un arreglo.

    // PASO 2: Multiplicar elementos en posiciones pares (contadas desde 1, no 0) por 2. 
    // Si el número resultante es de 2 dígitos, se deben sumar ambos dígitos.
    let digitoPar = -1;
    for (let i = 1; i <= arrInverso.length; i += 2) {
        digitoPar = parseInt(arrInverso[i]);  // Recordar que los elementos de arrInverso son de tipo string.
        digitoPar *= 2;
        if (digitoPar >= 10) {
            digitoPar = digitoPar.toString();  // Se convierte a string para poder seleccionar cada dígito y sumarlos.
            digitoPar = parseInt(digitoPar[1]) + parseInt(digitoPar[0]);
        }
        arrInverso[i] = digitoPar.toString();
    }

    // PASO 3: Sumar todos los dígitos de la tarjeta, considerando los valores obtenidos en el paso 2.
    let suma = 0;
    for (let j = 0; j < arrInverso.length; j++) {
        if (typeof arrInverso[j] == "string") {
            suma += parseInt(arrInverso[j]);
        } else {
            suma += arrInverso[j];
        }
    }

    // PASO 4: Validar que el número obtenido es divisible por 10.
    if (suma % 10 == 0) {
        alerta.innerText = "Tarjeta Válida";
        alerta.className = "alerta-valida";
        return true;
    } else {
        alerta.innerText = "Tarjeta Inválida";
        alerta.className = "alerta-error";
        return false;
    }
}
// ----------------------- ENMASCARADO DE LOS DÍGITOS -----------------------
// Se deben ocultar todos los dígitos ingresados por el usuario menos los últimos 4.
function enmascarar() {
    let numero = document.getElementById("numero-tarjeta");
    let digitosTC = numero.value;
    let cantidadDigitos = digitosTC.length;
    // Si se tienen más de 4 dígitos se debe realizar el enmascarado.
    if (cantidadDigitos > 4) {
        let digitosAEnmascarar = cantidadDigitos - 4;
        for (let i = 0; i < digitosAEnmascarar; i++) {
            digitosTC = digitosTC.replace(digitosTC[i], "*");
        }
    }
    document.getElementById("svgnumber").innerHTML = digitosTC;
}

document.getElementById("btn-validar").addEventListener("click", function() {
    let valida = validarTarjeta();
    if (valida) {
        enmascarar();
        document.getElementById("numero-tarjeta").value = "";
        this.hidden = true;  // Se esconde el botón

    }
})