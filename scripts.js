//Mostrar o forms selecionado
const tipo = document.getElementById('tipo')
const formReceita = document.getElementById('form-receita')
const formInvestimento = document.getElementById('form-investimento')
const formDespesa= document.getElementById('form-despesa')

formReceita.style.display = 'none';
formInvestimento.style.display = 'none';
formDespesa.style.display = 'none';

tipo.addEventListener('change', () => {

    formReceita.style.display = tipo.value === 'receita' ? 'block' : 'none';
    formInvestimento.style.display = tipo.value === 'investimento' ? 'block' : 'none';
    formDespesa.style.display = tipo.value === 'despesa' ? 'block' : 'none';

});

//atualizar as categorias que aparecem em despesas
const tipoDespesa = document.getElementById('tipo-despesa')
const categoriaDespesa = document.getElementById('categoria-despesa')

const categoriaPorTipo = {
    'Fixa':['Habitação', 'Transporte', 'Saúde', 'Educação', 'Outros'],
    'Variável':['Habitação', 'Transporte', 'Alimentação', 'Saúde', 'Cuidados pessoais', 'Outros'],
    'Extra':['Saúde', 'Manutenção/prevenção', 'Educação', 'Lazer', 'Vestuário', 'Presentes', 'Fatura do cartão de crédito'],
};

function atualizarCategorias(){
    const listaCategorias = categoriaPorTipo[tipoDespesa.value] || [];

    const optionsHTML = listaCategorias
        .map(cat => `<option value= "${cat}">${cat}</option>`)
        .join('');

        categoriaDespesa.innerHTML = '<option value="">Selecione uma categoria</option>' + optionsHTML;
}
tipoDespesa.addEventListener('change', atualizarCategorias);


//Atualizar as subcategorias que aparecem nas categorias das despesas
const subcategoriaDespesa = document.getElementById('subcategoria-despesa');

const subcategoriaPorCategoria = {
    Fixa: { Habitação: ['Aluguel', 'Condomínio','Prestação da casa','Seguro da casa','Diarista','Mensalista','Empregado','Outros'],
            Transporte: ['Prestação do carro','Seguro do carro','Estacionamento mensal'],
            Saúde: ['Seguro saúde','Plano de saúde'],
            Educação: ['Colégio','Faculdade','Curso'],
            Outros: ['IPTU','IPVA','Empréstimos']
        },
    Variável: {
        Habitação: ['Luz','Água','Telefone celular','Gás','Mensalidade TV','Internet'],
        Transporte: ['Metrô','Ônibus','Transporte por app','Combustível','Estacionamento'],
        Alimentação: ['Supermercado','Feira','Padaria'],
        Saúde: ['Medicamento'],
        'Cuidados pessoais': ['Cabeleireiro','Manicure','Esteticista','Academia','Clube','Futebol','Outros']
    },
    Extra: {
        Saúde: ['Médico','Dentista','Hospital'],
        'Manutenção/prevenção': ['Carro','Casa'],
        Educação: ['Material escolar','Uniforme'],
        Lazer: ['Viagem','Shopping/cinema','Restaurante/bar','Lanche'],
        Vestuário: ['Roupa','Calçado','Acessórios'],
        Presentes: ['Presentes'],
        'Fatura do cartão de crédito': ['Fatura do cartão de crédito']
    }
};

function atualizarSubcategorias() {
    const tipo = tipoDespesa.value;
    const categoria = categoriaDespesa.value;
    const listaSubCategoria =subcategoriaPorCategoria[tipo]?.[categoria] ||  [];

    const optionsHTML = listaSubCategoria
        .map(sub => `<option value="${sub}">${sub}</option>`)
        .join('')

    subcategoriaDespesa.innerHTML = '<option value="">Selecione uma subcategoria</option>' + optionsHTML;
}

categoriaDespesa.addEventListener('change', atualizarSubcategorias);

//Mascara para o valor monetario R$ 0 000,00 no fornt e 0000.00 para o flask e converter valor para mostrar
function mascara(valor) {
    var valorAlterado = valor.value;
    valorAlterado = valorAlterado.replace(/\D/g, "");
    valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2");
    valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    valorAlterado = "R$" + valorAlterado;
    valor.value = valorAlterado;
}

function converterValor(valor) {
    var valorAlterado = valor; 
    valorAlterado = valorAlterado.replace("R$", ""); 
    valorAlterado = valorAlterado.replace(/\./g, ""); 
    valorAlterado = valorAlterado.replace(",", "."); 
    valorAlterado = Number(valorAlterado); 
    return valorAlterado; 
}

function mostrarValor(valor){
    var valorAlterado = valor;
    valorAlterado = Number(valorAlterado);
    valorAlterado = valorAlterado.toLocaleString('pt-BR', {
        style:'currency',
        currency:'BRL'
    });
    return valorAlterado;
}

//converter a data para o formato do banco
function converterData(data){
    var partesData = data.split('-');
    var dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    return dataFormatada;
}

//Adicionar Receita
formReceita.addEventListener('submit', async(event) => {
    event.preventDefault();
    const descricao = document.getElementById('descricao-receita').value;
    const valor = converterValor(document.getElementById('valor-receita').value);
    const data = converterData(document.getElementById('data-receita').value);

    const resposta = await fetch('http://127.0.0.1:5000/receitas',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            descricao: descricao,
            valor: valor,
            data: data
        })
    });
    if (resposta.ok) {
        alert('Receita adicionada com sucesso!');
        formReceita.reset();
        carregarLancamentos();
    } else {
        alert('Erro ao adicionar receita.');
    }
});

//Adicionar Investimento
formInvestimento.addEventListener('submit', async(event) => {
    event.preventDefault();
    const tipo = document.getElementById('descricao-investimento').value;
    const valor = converterValor(document.getElementById('valor-investimento').value);
    const data = converterData(document.getElementById('data-investimento').value);

    const resposta = await fetch('http://127.0.0.1:5000/investimentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tipo: tipo,
            valor: valor,
            data: data,
        })
    });
    if (resposta.ok){
        alert('Investimento adicionado com sucesso!');
        formInvestimento.reset();
        carregarLancamentos();
    } else {
        alert('Erro ao adicionar investimento.');
    }
});

//Adicionar Despesas
formDespesa.addEventListener('submit', async(event) => {
    event.preventDefault();
    const tipo = document.getElementById('tipo-despesa').value;
    const categoria = document.getElementById('categoria-despesa').value;
    const subcategoria = document.getElementById('subcategoria-despesa').value;
    const valor = converterValor(document.getElementById('valor-despesa').value);
    const data = converterData(document.getElementById('data-despesa').value);

    const resposta = await fetch('http://127.0.0.1:5000/despesas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tipo: tipo,
            categoria: categoria,
            subcategoria: subcategoria,
            valor: valor,
            data: data,
        })
    });
    if (resposta.ok){
        alert('Despesa adicionada com sucesso!');
        formDespesa.reset();
        carregarLancamentos();
    } else {
        alert('Erro ao adicionar despesa.');
    }
});

//Busca do que já foi cadastrado e mostrar na tabela.
async function buscarReceitas(){
    const resposta= await fetch('http://127.0.0.1:5000/receitas');
    const receitas = await resposta.json();
    return receitas;
}

async function buscarInvestimentos(){
    const resposta= await fetch('http://127.0.0.1:5000/investimentos');
    const investimentos = await resposta.json();
    return investimentos;
}

async function buscarDespesas(){
    const resposta= await fetch('http://127.0.0.1:5000/despesas');
    const despesas = await resposta.json();
    return despesas;
}

async function buscarLancamentos() {
    const receitas = await buscarReceitas();
    const investimentos = await buscarInvestimentos();
    const despesas = await buscarDespesas();

    const lancamentosReceitas = receitas.map(receita => ({
        id: receita.id,
        origem: 'receita',
        tipo: receita.descricao,
        valor: receita.valor,
        categoria: '',
        subcategoria: '',
        data: receita.data
    }));

    const lancamentosInvestimento = investimentos.map(investimento => ({
        id: investimento.id,
        origem: 'investimento',
        tipo: investimento.tipo,
        valor: investimento.valor,
        categoria: '',
        subcategoria: '',
        data: investimento.data,
    }));

    const lancamentosDespesa = despesas.map(despesa => ({
        id: despesa.id,
        origem: 'despesa',
        tipo: despesa.tipo,
        valor: despesa.valor,
        categoria: despesa.categoria,
        subcategoria: despesa.subcategoria,
        data: despesa.data,
    }))

    const lancamentos =[...lancamentosReceitas, ...lancamentosInvestimento, ...lancamentosDespesa];

    return lancamentos;
}
//separação dos dados por linha e coluna
const tabela = document.querySelector('#tabela tbody');
function mostrarLancamentos(lancamentos){
    tabela.innerHTML='';
    lancamentos.forEach(lancamento =>{
        const linha = document.createElement('tr');
        const tipo = document.createElement('td');
        tipo.textContent = lancamento.tipo;

        const valor = document.createElement('td');
        valor.textContent = mostrarValor(lancamento.valor);

        const categoria = document.createElement('td');
        categoria.textContent = lancamento.categoria;

        const subcategoria = document.createElement('td');
        subcategoria.textContent = lancamento.subcategoria;

        const data = document.createElement('td');
        data.textContent = lancamento.data;

        const acoes = document.createElement('td');
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', () => excluirLancamento(lancamento));

        acoes.append(botaoExcluir);

        linha.append(tipo, valor, categoria, subcategoria, data, acoes);

        tabela.appendChild(linha);

    });
}

async function carregarLancamentos(){
    const lancamentos = await buscarLancamentos();
    mostrarLancamentos(lancamentos);
}
carregarLancamentos();
buscarResumo();

//Funcionalidades do botão de editar e excluir
//function editarLancamento(lancamento){}

async function excluirLancamento(lancamento){
    let deletado;
    if (lancamento.origem === 'receita') {
        deletado = await fetch(`http://127.0.0.1:5000/receitas/${lancamento.id}`, {
            method: 'DELETE'
        });
    }

    if (lancamento.origem === 'despesa') {
        deletado = await fetch(`http://127.0.0.1:5000/despesas/${lancamento.id}`, {
            method: 'DELETE'
        });
    }

    if (lancamento.origem === 'investimento') {
        deletado = await fetch(`http://127.0.0.1:5000/investimentos/${lancamento.id}`, {
            method: 'DELETE'
        });
    }
    if(deletado.ok){
        carregarLancamentos();
    }
}

//Filtragem dos dados
function filtrarLancamentos(lancamentos){
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;
    const tipo = document.getElementById('tipo-filtro').value;

    return lancamentos.filter(lancamento => {
        const data = lancamento.data.split('-').reverse().join('-');
        const passouDataInicio = !dataInicio || data >= dataInicio;
        const passouDataFim = !dataFim || data <= dataFim;
        const passouTipo = !tipo || lancamento.origem === tipo;

        return passouDataInicio && passouDataFim && passouTipo;
    });
}
//Botão filtrar tabela e cards
const botaoFiltrar = document.getElementById('filtrar');
botaoFiltrar.addEventListener('click', async () => {
    const lancamentos = await buscarLancamentos();
    const lancamentosFiltrados = filtrarLancamentos(lancamentos);
    mostrarLancamentos(lancamentosFiltrados);
    buscarResumo();
});

//Cards mostra o resumo total e de acordo com a filtragem de data feita!
async function buscarResumo() {
    const inicio = document.getElementById('data-inicio').value;
    const fim = document.getElementById('data-fim').value;
    let resposta;
    try{
        if (inicio && fim){
            const dataInicio = converterData(inicio);
            const dataFim = converterData(fim);
            resposta = await fetch(`http://127.0.0.1:5000/resumo/periodo/${dataInicio}/${dataFim}`);
        }
        else{
            const hoje = new Date();
            const ano= hoje.getFullYear();
            const mes = String(hoje.getMonth()+1).padStart(2,'0');
            resposta = await fetch(`http://127.0.0.1:5000/resumo/mes/${ano}/${mes}`);
        }
        if (!resposta.ok){
            throw new Error('Erro ao buscar os dados do servidor.');
        }
        const resumo = await resposta.json();
        atualizarCards(resumo);
    } catch(erro){
        console.error("Falha ao buscar resumo:". erro);
        alert("Não foi possível carregar o resumo.")
    }
}

function atualizarCards(resumo) {
    document.getElementById('total-receitas').textContent =
    mostrarValor(resumo.total_receitas);

    document.getElementById('total-investimentos').textContent =
    mostrarValor(resumo.total_investimentos);

    document.getElementById('total-despesas').textContent =
    mostrarValor(resumo.total_despesas);

    document.getElementById('saldo').textContent =
    mostrarValor(resumo.saldo);
}