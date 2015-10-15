var docDefinition = {
  content: [],
  defaultStyle: {
    font: 'OpenSans'
  },
  pageSize: 'A4',
  pageOrientation: 'portrait',
  styles: {
    title: {
       fontSize: 72,
       bold: true,
       color: '#2C66CE',
       lineHeight: 0.64,
       margin: [ 70, 150, 90, 0 ]
     },
     border: {
       fontSize: 72,
       color: '#606060',
       lineHeight: 0.64
     },
     subtitle: {
       fontSize: 25,
       bold: true,
       color: '#606060',
       lineHeight: 0.8
     },
     header: {
       fontSize: 32,
       bold: true,
       color: '#2C66CE',
       lineHeight: 0.8,
       margin: [ 40, 220, 40, 30 ]
     },
     subheader: {
       fontSize: 22,
       bold: true,
       color: '#2C66CE',
       margin: [ 40, 0, 40, 0 ],
       lineHeight: 0.5
     },
     thirdheader: {
       fontSize: 15,
       italics: true,
       color: '#606060',
       margin: [ 40, 10, 40, 0 ]
     },
     thirdheaderTable: {
       fontSize: 15,
       italics: true,
       color: '#606060'
     },
     tableExample: {
      margin: [40, 5, 40, 15],
      color: '#606060'
     },
     list: {
      fontSize: 12,
      blod: true,
      color: '#606060'
     },
     paragraph: {
      fontSize: 12,
      color: '#606060',
      margin: [ 40, 0, 40, 30 ]
     }
   }
};

pdfMake.fonts = {
   OpenSans: {
     normal: 'OpenSans-Regular.ttf',
     italics: 'OpenSans-BoldItalic.ttf',
     bold: 'OpenSans-ExtraBold.ttf'
   }
};

$(function() {
  var initialDocDefinition = function() {
    docDefinition.content = [];
    docDefinition.content.push({ text: 'Carta de serviços', style: 'title'});
    docDefinition.content.push({ text: '__________', style: 'border', margin: [ 70, -40, 90, 0 ] });
    docDefinition.content.push('\n');
    docDefinition.content.push('\n');
    docDefinition.content.push({ text: 'Ministério da educação MEC'.toUpperCase(), style: 'subtitle', margin: [ 70, 0, 115, 0 ], pageBreak: 'after' });
  };

  var capaOrgao = function() {
    docDefinition.content.push({ text: 'Ministério da educação MEC', style: 'header'});
    docDefinition.content.push({ text: 'O que é?'.toUpperCase(), style: 'subheader' });
    docDefinition.content.push('\n');

    var descricao = 'Ministério da Educação (MEC) \
      --- \
      \
      Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: \
      \
      * ensino fundamental, médio e superior; \
      * educação de jovens e adultos, seja profissional, especial ou à distância; \
      * informação e pesquisa educacional; \
      * pesquisa e extensão universitária; e \
      * magistério.';

    var textoHtml = markdown.toHTML(descricao);
    var content = [];
    var parseHtml = new ParseHtml();

    parseHtml.parseHtml(content, textoHtml);
    docDefinition.content = docDefinition.content.concat(content);


    docDefinition.content.push({ text: '', style: 'paragraph', pageBreak: 'after' });
  }

  function generatePdf() {
    initialDocDefinition();
    capaOrgao();
    var servicoParser = new ServicoParser();

    var servicoObject = servicoParser.parseXml('<?xml version="1.0" encoding="UTF-8" standalone="no"?> <servico xmlns="http://servicos.gov.br/v3/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://servicos.gov.br/v3/schema ../servico.xsd"> <nome>Serviço teste</nome> <sigla>STST</sigla> <nomes-populares> <item>Serviço para teste</item> <item>Testando a interface</item> </nomes-populares> <descricao>O Programa Universidade para Todos - Prouni tem como finalidade a concessão de bolsas de estudo integrais e parciais em cursos de graduação e sequenciais de formação específica, em instituições de ensino superior privadas. Criado pelo Governo Federal em 2004 e institucionalizado pela Lei nº 11.096, em 13 de janeiro de 2005 oferece, em contrapartida, isenção de tributos àquelas instituições que aderem ao Programa.</descricao> <gratuito>false</gratuito> <solicitantes> <solicitante> <tipo>Estudantes egressos do ensino médio da rede pública</tipo> <requisitos>Na condição de bolsistas integrais: * Com renda familiar per capita máxima de três salários mínimos. * Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação.</requisitos> </solicitante> <solicitante> <tipo>Estudantes egressos do ensino médio da rede particular</tipo> <requisitos>Na condição de bolsistas parciais: * Com renda familiar per capita máxima de seis salários mínimos. * Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação.</requisitos> </solicitante> <solicitante> <tipo>Pessoa com deficiência</tipo> <requisitos/> </solicitante> <solicitante> <tipo>Professor da rede pública de ensino</tipo> <requisitos>No efetivo exercício do magistério da educação básica e integrando o quadro de pessoal permanente da instituição pública e concorrer a bolsas exclusivamente nos cursos de licenciatura.</requisitos> </solicitante> </solicitantes> <tempo-total-estimado> <ate max="40" unidade="dias-uteis"/> <descricao/> </tempo-total-estimado> <etapas> <etapa> <titulo>Agendamento</titulo> <descricao>Inscrições abertas a partir de 11/08 até 31/08, o prazo final para inscrição de candidato ainda não matriculado na instituição de educação superior em que deseja se inscrever.</descricao> <documentos> <default> <item>CPF</item> <item>RG</item> <item>Comprovante de renda</item> </default> <caso descricao="Professores"> <item>Comprovante do exercício do magistério</item> </caso> </documentos> <custos> <default> <custo> <descricao>Taxa de inscrição</descricao> <moeda/> <valor>90,00</valor> </custo> </default> <caso descricao="Estudantes da rede pública de ensino"> <custo> <descricao>Taxa de inscrição</descricao> <moeda/> <valor>0,00</valor> </custo> </caso> </custos> <canais-de-prestacao> <default> <canal-de-prestacao tipo="postal"> <descricao>Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900</descricao> </canal-de-prestacao> <canal-de-prestacao tipo="e-mail"> <descricao>brasil@gov.br</descricao> </canal-de-prestacao> <canal-de-prestacao tipo="web-agendar"> <descricao>http://siteprouni.mec.gov.br/</descricao> </canal-de-prestacao> </default><caso descricao="Estudantes da rede pública de ensino"><canal-de-prestacao tipo="postal"><descricao>Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900</descricao></canal-de-prestacao></caso> </canais-de-prestacao> </etapa> <etapa> <titulo>Inscrição no SisFIES</titulo> <descricao>Pode se inscrever às bolsas remanescentes do Prouni 2º/2015 o candidato que atenda a uma das condições a seguir.</descricao> <documentos> <default/> </documentos> <custos> <default/> </custos> <canais-de-prestacao> <default/> </canais-de-prestacao> </etapa> </etapas> <orgao id="http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/61283"> <contato>Em caso de dúvidas sobre o Prouni, ligue para 156.</contato> </orgao> <orgao-contato/> <segmentos-da-sociedade> <item>Cidadãos</item> </segmentos-da-sociedade> <areas-de-interesse> <item>Agropecuária</item> <item>Politica econômica</item> </areas-de-interesse> <palavras-chave> <item>Teste</item> <item>Prouni</item> <item>Bolsa de estudos</item> </palavras-chave> <legislacoes> <item>[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)</item> </legislacoes> </servico>');

    var contentBuilder = new ContentBuilder(servicoObject);
    var servicoDocument = contentBuilder.buildContent();

    docDefinition.content = docDefinition.content.concat(servicoDocument);
    pdfMake.createPdf(docDefinition).open();
  }

  function gerarPDFNovo() {
      var doc = new jsPDF();
      doc.setFontSize(40);
      doc.setFontStyle('bold');
      doc.setTextColor(44, 102, 206);
      doc.text(70, 50, 'Carta de Serviços');
      doc.addPage();
      doc.fromHTML('<h1>Titulo</h1><ul><li>Um</li><Dois></ul>');
      doc.save('novo.pdf');
  }

  $('#antigo').click(function() {
    generatePdf();
  });

  $('#novo').click(function() {
    gerarPDFNovo();
  });
});
