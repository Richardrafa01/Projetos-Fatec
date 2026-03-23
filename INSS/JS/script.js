/*
@author Richard Rafael
@since 2026-03-17
@version 1.0.0
@description esta função realiza o calculo do INSS
*/

function calcularINSS (salario) {
    let inss = 0

    if (salario < 1621.01) {
        inss = salario * 0.075
    } else if (salario <= 2902.85) {
        inss = salario * 0.09 
    } else if (salario <= 4354.28) {
        inss = salario * 0.12 
    } else {
        inss = salario * 0.14
    }

    if (inss > 988.09) {
        inss = 988.09
    }

    return inss
}

/*
@author Richard Rafael
@since 2026-03-17
@version 1.0.0
@description esta função realiza o calculo do IRRF
*/

function calcularIRRF (salario, inss) {
    
    let salarioBruto = salario - inss
    let irrf = 0

    if (salarioBruto <= 2259.20 ) {
        irrf = 0;
    } else if (salarioBruto <= 2828.65) {
        irrf = salarioBruto *0.075 - 169.44;
    } else if (salarioBruto <= 3751.05) {
        irrf = salarioBruto * 0.15 - 381.59;
    } else if (salarioBruto <= 4664.68) {
        irrf = salarioBruto * 0.225 - 662.92;
    } else {
        irrf = salarioBruto * 0.275 - 896.15;
    }
    return irrf
}

/*
*@Author Richard Rafael Fagundes Sales
*@Since 2026-03-23
*@version 1.0.0
*@Description Essa função realiza o calculo do salario liquido
*@param {number} salario
*@param {number} INSS
*@param {number} o valor da do IRRF
*@return {number} salario liquido
*/

function calculoHolerite(salario) {
    let valorinss = calcularINSS(salario);
    let valorirrf = calcularIRRF(salario, valorinss);
    let liquido = salario - valorinss - valorirrf;

    return {salarioBruto: salario, inss : valorinss, irrf : valorirrf, salarioLiquido : liquido};
}


document.getElementById('botaoCalcular').addEventListener('click',function(){
    let salarioInput = document.getElementById('salarioBruto').value;
    let salario = parseFloat(salarioInput);
    let resultado = calculoHolerite(salario);

    document.getElementById('inss').value = resultado.inss.toFixed(2);
    document.getElementById('irrf').value = resultado.irrf.toFixed(2);
    document.getElementById('resultado').innerHTML = `<h3>Salário Líquido: R$ ${resultado.salarioLiquido.toFixed(2)}</h3>`;
    document.getElementById('resultado').style.display = "block";
})

document.getElementById('botaoLimpar').addEventListener('click', function(){
    document.getElementById('formulario').reset();
    document.getElementById('inss').value = '';
    document.getElementById('irrf').value = '';
    document.getElementById('resultado').innerHTML = ``;
    document.getElementById('resultado').style.display = "none";
})