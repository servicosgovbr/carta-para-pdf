[![Status da construção](https://snap-ci.com/servicosgovbr/carta-para-pdf/branch/master/build_image)](https://snap-ci.com/servicosgovbr/carta-para-pdf/branch/master)
[![Coverage Status](https://coveralls.io/repos/servicosgovbr/carta-para-pdf/badge.svg?branch=master&service=github)](https://coveralls.io/github/servicosgovbr/carta-para-pdf?branch=master)
[![Stories in Ready](https://badge.waffle.io/servicosgovbr/carta-para-pdf.png?label=ready&title=Ready)](https://waffle.io/servicosgovbr/carta-para-pdf)
[![Join the chat at https://gitter.im/servicosgovbr/carta-para-pdf](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/servicosgovbr/carta-para-pdf?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Carta Para PDF

Biblioteca para gerar PDF da Carta de Serviços de um órgão a partir das informações do Portal de Serviços.

### Instalações para rodar localmente

- Baixe o repositório para sua máquina local
- **npm install**
- Abra o arquivo **index.html**

### Como rodar os testes localmente

- Baixe o repositório para sua máquina local
- **npm install**
- **gulp**

### Como gerar o arquivo final minificado

- Baixe o repositório para sua máquina local
- **npm install**
- **gulp bundle**


### Como usar o arquivo final para gerar as cartas em PDF

- Importe o arquivo **bin/cartaParaPdf.min.js** para seu projeto.
- O objeto esperado pela biblioteca é no seguinte formato:
```
var jsonResponse = {
    nome: "Ministério da Educação (MEC)",
    descricao: "Descrição do orgão",
    servicos: [
      xml1,
      xml2,
      xml3
    ]};
```
- Os xmls devem ser no mesmo formato do repositório carta-de-serviços (https://github.com/servicosgovbr/cartas-de-servico/tree/master/cartas-servico/v3/servicos)
- Crie um objeto **PdfMaker**
```
var pdfMaker = new cartaParaPdf.PdfMaker();
```
- Chame o método geraPdf
```
pdfMaker.geraPdf(jsonResponse);
```
