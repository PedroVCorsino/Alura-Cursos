var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", (event) => {
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteFormulario(form);
    var pacienteTr = montaTr(paciente);
    
    var erros = validaPacientes(paciente);
    console.log(erros);
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }
    
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);  
    
    form.reset();
    var mensagemDeErro = document.querySelector("#mensagens-erro");
    mensagemDeErro.innerHTML = "";

});

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);    
    });
};


function obtemPacienteFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        altura: form.altura.value,
        peso: form.peso.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome,"info-nome"));  
    pacienteTr.appendChild(montaTd(paciente.altura,"info-altura"));
    pacienteTr.appendChild(montaTd(paciente.peso,"info-peso"));  
    pacienteTr.appendChild(montaTd(paciente.gordura,"info-gordura"));  
    pacienteTr.appendChild(montaTd(paciente.imc,"info-imc"));

    return pacienteTr;
    
};

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;

};

function validaPacientes(paciente){
    var erros = [];

    if(paciente.nome.length == 0) erros.push("Nome não pode ser em branco");
    if(paciente.peso.length == 0) erros.push("O peso não pode ser em branco");
    if(paciente.altura.length == 0) erros.push("A altura não pode ser em branco");
    if(paciente.gordura.length == 0) erros.push("A gordura não pode ser em branco");

    if(!validaPeso(paciente.peso)) erros.push("Peso invalido!");
    if(!validaAltura(paciente.altura)) erros.push("Altura invalida!");

    

    return erros;
}