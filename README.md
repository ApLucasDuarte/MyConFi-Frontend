#MyConFi - frontend

Frontend da aplicação MyConFi, um sistema de controle financeiro pessoal desenvolvido para
organizar receitas, despesas e investimentos e obter um resumos financeiro.

#Tecnologias utilizadas

- HTML
- CSS
- JavaScript

#Funcionalidades
O frontend permite:

- cadastrar receitas, despesas e investimentos;
- Visualizar os lançamentos cadastrados;
- Excluir lançamentos já feitos;
- Filtrar lançamentos por período de data e por tipo de lançamento (receita, despesa ou investimento);
- Visualizar resumos financeiros;
- Consultar resumo por período selecionado;
- Atualizar os dados da página após lançamento registrado;

#Como exercutar?

Basta abrir o arquivo: index.html

#Integração

O frontend realiza requisições HTTP para a APO do myConFi utilizando Fetch API.

A aplicação utiliza os endpoints para:

- Receitas;
- Despesas;
- Investimentos;
- Resumo financeiro;

Para utilizar todas as funcionaliades do frontend, o backend deve estar em execução.
Por padrão, a aplicação utiliza a API disponível em: http://127.0.0.1:5000

#O front foi estruturado separando:

- index.html: estrutura da página;
- style.css: estilos e apresentação visual;
- scripts.js: lógica da aplicação e integração com a API.


#Observações

O projeto está sendo desenvolvido como parte de uma atividade acadêmica.

#Autor

Lucas Duarte