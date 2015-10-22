[![Status da construção](https://snap-ci.com/servicosgovbr/carta-para-pdf/branch/master/build_image)](https://snap-ci.com/servicosgovbr/carta-para-pdf/branch/master)
[![Coverage Status](https://coveralls.io/repos/servicosgovbr/carta-para-pdf/badge.svg?branch=master&service=github)](https://coveralls.io/github/servicosgovbr/carta-para-pdf?branch=master)
[![Stories in Ready](https://badge.waffle.io/servicosgovbr/carta-para-pdf.png?label=ready&title=Ready)](https://waffle.io/servicosgovbr/carta-para-pdf)
[![Join the chat at https://gitter.im/servicosgovbr/carta-para-pdf](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/servicosgovbr/carta-para-pdf?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# carta-para-pdf

Aplicação para geração de um documento .pdf para impressão da Carta de Serviços de cada órgão a partir do conteúdo do Portal de Serviços.

## Instalações para rodar localmente

- baixe o repositório para sua máquina local
- rode 'npm install' no diretório raiz
- abra o arquivo index.html

## Como rodar os testes localmente

- baixe o repositório para sua máquina local
- rode 'npm install' no diretório raiz
- rode 'gulp' no diretório raiz

## Como gerar o arquivo final minificado

- baixe o repositório para sua máquina local
- rode "npm install" no diretório raiz
- rode "gulp bundle" no diretório raiz

## Como usar o arquivo final para gerar as cartas em DPF

- Importe o arquivo cartaParaPdf.min.js para seu projeto.
- O objeto esperado pela biblioteca é no seguinte formato:
'var jsonResponse = {'
    'nome: "Ministério da Educação (MEC)",'
    'descricao: "Descrição do orgão",'
    'servicos: ['
      'xml1,'
      'xml2,'
      'xml3'
    ']};'
- Os xmls devem ser no mesmo formato do repositório carta-de-serviços (https://github.com/servicosgovbr/cartas-de-servico/tree/master/cartas-servico/v3/servicos)
- Crie um objeto pdkMaker 'var pdfMaker = new cartaParaPdf.PdfMaker();'
- Chame o método 'pdfMaker.geraPdf(jsonResponse);'