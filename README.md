# Grilo

Grilo é um aplicativo desenvolvido com o objetivo de apresentar, de maneira dinâmica e transparente, os convênios cadastrados no SICONV (Sistema de Convênios do Ministério do Planejamento).  
No Grilo, o usuário pode ver os gastos realizados pelo governo na área da educação, saúde, esporte, entre outras. O usuário também pode fazer comentários/enviar fotos sobre os projetos do convênio e visualizar um "feed bancário" dos repasses feitos aos convênios.

O aplicativo foi desenvolvido como proposta para a "Hackathon sobre Participação no Combate à Corrupção" do Ministério da Justiça, utilizando os dados abertos do SICONV.

### O projeto se divide em duas partes:
- Webservice
    - Feito em linguagem PHP  para facilitar o consumo dos dados dos convênios para ser utilizado na aplicação;
    - Foi utilizado o [dump](http://repositorio.dados.gov.br/economia-financas/encargos-financeiros/transferencias-financeiras/API_siconv_140515.zip) do banco de dados em PostgreSQL com a versão datada de 15/05/2014, fornecido pela [API de convênios](http://api.convenios.gov.br/siconv/doc/).

- Grilo
    - Aplicação feita em HTML5 com AngularJS e Angular Material que o torna apto para acesso em plataformas móveis como Android e iOS;
    - Pode ser exibida em qualquer navegador (browser) ou "compilada" para Android/IOS utilizando o phonegap ou cordova.

### Instalação
Requisitos: Apache, PHP e PostgreSQL

Baixe o projeto ou clone o repositório, baixe o [dump](http://repositorio.dados.gov.br/economia-financas/encargos-financeiros/transferencias-financeiras/API_siconv_140515.zip) do banco do SICONV em PostgreSQL.

Copie os arquivos para o www do apache, pasta \grilo\grilo-ws é o serviço que será utilizado pela aplicação na pasta grilo.

Altere o arquivo conexao.php na pasta \grilo\grilo-ws com os dados de conexão ao banco de dados.

Altere o arquivo app.filters.js na pasta \grilo\grilo\app com os dados de conexão do serviço.

Acesse localhost/grilo para navegar na aplicação.

# License
GNU General Public License v 3.0

### Version
1.0
