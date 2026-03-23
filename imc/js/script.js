/**
 * Configura a data limite do nascimento
 * @author Richard Rafael <richard.sales@fatec.sp.gov.br>
 * @since 26-02-24
 * @version 1.0.0
 * @description Esta Função busca o campo data pelo id e aplica o atributo max com o dia atual. 
 */
function configureDataLimite(){
    const limite = new Date ().toISOString().split("T")[0]
    const inputNasc = document.getElementById('nascimento')
    if(inputNasc){
        inputNasc.setAttribute('max', limite)
         inputNasc.setAttribute('min', '1980-01-01')
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', configureDataLimite)

/**
* Calcula o Indece de Massa Corporal (IMC)
* @author Richard Rafael F. Sales
* @since 2026-02-24
* @version 1.0.0
* @description Essa funcao calcula o IMC com base no peso e altura fornecido pelo user
* @param {number} peso - O peso da pessoa em kg
* @param {number} altura - A altura da pessoa em metros
* @returns {number} O valor do IMC calculado
*/

function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura)
    return imc
}
// console.log(calcularIMC(79,1.70))
    
/**
* Calcula a Clssificação do (IMC)
* @author Richard Rafael F. Sales
* @since 2026-02-24
* @version 1.0.0
* @description Essa funcao calcula a calssificação do IMC a partir do IMC informado
* @param {imc} imc - O valor do IMC
* @returns {string} A classificação do IMC, ex: Peso normal, sobrepeso, etc.
*/

function obterClassificacaoIMC(imc) {
    let  resultado = ""
    if (imc < 18.5) {
        resultado = "Abaixo do Peso"
    } else if (imc <25) {
        resultado = "Peso Normal"
    } else if (imc <30) {
        resultado = "Sobrepeso"
    } else {
        resultado = "Obesidade"
    }
    return resultado
}
// console.log(obterClassificacaoIMC(24.9)) 

/**
 * Funcao que processa o calculo e exibe ao usaario na UI
 * @param {event} event - O evento de submissão do Formulario
 */

function processaCalculo(event) {
    if (event) event.preventDefault () // evita o carregamento da pagina
    // captura dos campos
    const nome = document.getElementById('nome').value
    const nascimento = document.getElementById('nascimento').value
    const peso = document.getElementById('peso').value
    const altura = document.getElementById('altura').value
    const divResultado = document.getElementById('resultado')

    //validacao basica
    if (!nome || !nascimento || isNaN (peso) || isNaN (altura) ) {
        alert('Por favor, preencha todos os campos corretamente')
        return
    }

    //efetuando os calculos com as funcoes criadas
    const imc = calcularIMC (peso, altura)
    const classificacao = obterClassificacaoIMC (imc)
    const idade = calcularIdade(nascimento)
    //mostrando o resultado na div
    divResultado.style.display = 'block' //exibe a div novamente na UI
    divResultado.innerHTML = `
                            Resultado para <strong>${nome}</strong>: <br>
                            IMC: <strong>${imc.toFixed(2)}</strong><br>
                            idade : <strong>${idade}</strong><br>
                            Status : <strong>${classificacao}</strong>
                            `
}

/**
 * Calcula a idade de uma pessoa apartir de seu nascimento
 * @param {string} nascimento - A data de nascimento no formato YYYY-MM-DD
 * @returns {number} a idade calculada em anos
 */

function calcularIdade(nascimento){
    const dataNasc = new Date(nascimento)
    const hoje = new Date ()
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate()< dataNasc.getDate())){
        idade -- // diminui um ano da idade pois ainda nao chegou a data do niver
    }
    return idade

}

//Limpar o resultado
document.addEventListener('reset', () => { //arrow function
    const divResultado = document.getElementById('resultado')
    //limpa o texto da div
    divResultado.innerHTML = ''
    //oculta o elemento
    divResultado.style.display = 'none'
})
