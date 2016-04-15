# Grilo

**link demo**: http://cpro26850.publiccloud.com.br/grilo/

**link do vídeo**: http://cpro26850.publiccloud.com.br/Grilo_-_Video_explicativo.mp4

O projeto se divide em duas partes:
- Webservice
    - Feito em linguagem PHP  para facilitar o consumo dos dados dos convênios para ser utilizado na aplicação.
    - Foi utilizado o [dump](http://repositorio.dados.gov.br/economia-financas/encargos-financeiros/transferencias-financeiras/API_siconv_140515.zip) do banco de dados em PostgreSQL com a versão datada de 15/05/2014, fornecido pela [API de convênios](http://api.convenios.gov.br/siconv/doc/).

- Grilo
    - Aplicação feita em HTML5 com AngularJS e Angular Material que o torna apto para acesso em plataformas móveis como Android e IOS
    - Pode ser exibida em qualquer navegador (browser) ou "compilada" para Android/IOS utilizando o phonegap ou cordova

### Instalação
Requisitos: Apache, PHP e PostgreSQL

Baixe o projeto ou clone o repositório, baixe o dump do banco do SICONV [dump](http://repositorio.dados.gov.br/economia-financas/encargos-financeiros/transferencias-financeiras/API_siconv_140515.zip) em PostgreSQL.

Copie os arquivos para o WWW do apache, pasta mp-ws é o serviço que será utilizado pela aplicação na pasta grilo.

Altere o arquivo conexao.php na pasta mp-ws com os dados de conexão ao banco de dados.

Acesse localhost/grilo para navegar na aplicação.

# License
GNU General Public License v 3.0

### Version
1.0
