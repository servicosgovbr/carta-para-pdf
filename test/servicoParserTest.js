describe("O parse do xml do serviço", function () {
  var servicoParser,
    xml, xml2;

  beforeEach(function () {
    servicoParser = new cartaParaPdf.ServicoParser();
    xml = '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <servico xmlns="http://servicos.gov.br/v3/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://servicos.gov.br/v3/schema ../servico.xsd"> <nome>Serviço teste</nome> <sigla>STST</sigla> <nomes-populares> <item>Serviço para teste</item> <item>Testando a interface</item> </nomes-populares><contato>Em caso de dúvidas sobre o Prouni, ligue para 156.</contato> <descricao>O Programa Universidade para Todos - Prouni tem como finalidade a concessão de bolsas de estudo integrais e parciais em cursos de graduação e sequenciais de formação específica, em instituições de ensino superior privadas. Criado pelo Governo Federal em 2004 e institucionalizado pela Lei nº 11.096, em 13 de janeiro de 2005 oferece, em contrapartida, isenção de tributos àquelas instituições que aderem ao Programa.</descricao> <gratuito>false</gratuito> <solicitantes> <solicitante> <tipo>Estudantes egressos do ensino médio da rede pública</tipo> <requisitos>Na condição de bolsistas integrais: * Com renda familiar per capita máxima de três salários mínimos. * Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação.</requisitos> </solicitante> <solicitante> <tipo>Estudantes egressos do ensino médio da rede particular</tipo> <requisitos>Na condição de bolsistas parciais: * Com renda familiar per capita máxima de seis salários mínimos. * Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação.</requisitos> </solicitante> <solicitante> <tipo>Pessoa com deficiência</tipo> <requisitos/> </solicitante> <solicitante> <tipo>Professor da rede pública de ensino</tipo> <requisitos>No efetivo exercício do magistério da educação básica e integrando o quadro de pessoal permanente da instituição pública e concorrer a bolsas exclusivamente nos cursos de licenciatura.</requisitos> </solicitante> </solicitantes> <tempo-total-estimado> <ate max="40" unidade="dias-uteis"/> <descricao/> </tempo-total-estimado> <etapas> <etapa> <titulo>Agendamento</titulo> <descricao>Inscrições abertas a partir de 11/08 até 31/08, o prazo final para inscrição de candidato ainda não matriculado na instituição de educação superior em que deseja se inscrever.</descricao> <documentos> <default> <item>CPF</item> <item>RG</item> <item>Comprovante de renda</item> </default> <caso descricao="Professores"> <item>Comprovante do exercício do magistério</item> </caso> </documentos> <custos> <default> <custo> <descricao>Taxa de inscrição</descricao> <moeda/> <valor>90,00</valor> </custo> </default> <caso descricao="Estudantes da rede pública de ensino"> <custo> <descricao>Taxa de inscrição</descricao> <moeda/> <valor>0,00</valor> </custo> </caso> </custos> <canais-de-prestacao> <default> <canal-de-prestacao tipo="postal"> <descricao>Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900</descricao> </canal-de-prestacao> <canal-de-prestacao tipo="e-mail"> <descricao>brasil@gov.br</descricao> </canal-de-prestacao> <canal-de-prestacao tipo="web-agendar"> <descricao>http://siteprouni.mec.gov.br/</descricao> </canal-de-prestacao> </default><caso descricao="Estudantes da rede pública de ensino"><canal-de-prestacao tipo="postal"><descricao>Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900</descricao></canal-de-prestacao></caso> </canais-de-prestacao> </etapa> <etapa> <titulo>Inscrição no SisFIES</titulo> <descricao>Pode se inscrever às bolsas remanescentes do Prouni 2º/2015 o candidato que atenda a uma das condições a seguir.</descricao> <documentos> <default/> </documentos> <custos> <default/> </custos> <canais-de-prestacao> <default/> </canais-de-prestacao> </etapa> </etapas> <orgao id="http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/61283"></orgao> <orgao-contato/> <segmentos-da-sociedade> <item>Cidadãos</item> </segmentos-da-sociedade> <areas-de-interesse> <item>Agropecuária</item> <item>Politica econômica</item> </areas-de-interesse> <palavras-chave> <item>Teste</item> <item>Prouni</item> <item>Bolsa de estudos</item> </palavras-chave> <legislacoes> <item>[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)</item> </legislacoes> </servico>';
    xml2 = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><servico xmlns="http://servicos.gov.br/v3/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://servicos.gov.br/v3/schema ../servico.xsd"><nome>Serviço Testes</nome><sigla>TESTE</sigla><nomes-populares><item>Serviço para teste</item><item>Testando a interface</item></nomes-populares><descricao>TESTE O Programa Universidade para Todos - Prouni tem como finalidade a concessão de bolsas de estudo integrais e parciais em cursos de graduação e sequenciais de formação específica, em instituições de ensino superior privadas. Criado pelo Governo Federal em 2004 e institucionalizado pela Lei nº 11.096, em 13 de janeiro de 2005 oferece, em contrapartida, isenção de tributos àquelas instituições que aderem ao Programa.</descricao><gratuito>false</gratuito><solicitantes><solicitante><tipo>Estudantes egressos do ensino médio da rede pública</tipo><requisitos>Na condição de bolsistas integrais:\n* Com renda familiar per capita máxima de três salários mínimos.\n* Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação.</requisitos></solicitante><solicitante><tipo>Estudantes egressos do ensino médio da rede particular</tipo><requisitos>Na condição de bolsistas parciais:\n\n* Com renda familiar per capita máxima de seis salários mínimos.\n* Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação.</requisitos></solicitante><solicitante><tipo>Pessoa com deficiência</tipo><requisitos/></solicitante><solicitante><tipo>Professor da rede pública de ensino</tipo><requisitos>No efetivo exercício do magistério da educação básica e integrando o quadro de pessoal permanente da instituição pública e concorrer a bolsas exclusivamente nos cursos de licenciatura.</requisitos></solicitante></solicitantes><tempo-total-estimado><entre max="15" min="10" unidade="dias-corridos"/><descricao>Exceção: Pode demorar de 20 a 25 dias corridos</descricao></tempo-total-estimado><etapas><etapa><titulo>Agendamento</titulo><descricao>Inscrições abertas a partir de 11/08 até 31/08, o prazo final para inscrição de candidato ainda não matriculado na instituição de educação superior em que deseja se inscrever.</descricao><documentos><default><item>CPF</item><item>RG</item><item>Comprovante de renda</item></default><caso descricao="Professores"><item>Comprovante do exercício do magistério</item></caso></documentos><custos><default><custo><descricao>Taxa de inscrição</descricao><moeda/><valor>90,00</valor></custo></default><caso descricao="Estudantes da rede pública de ensino"><custo><descricao>Taxa de inscrição</descricao><moeda/><valor>0,00</valor></custo></caso></custos><canais-de-prestacao><default><canal-de-prestacao tipo="postal"><descricao>Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900</descricao></canal-de-prestacao><canal-de-prestacao tipo="e-mail"><descricao>brasil@gov.br</descricao></canal-de-prestacao><canal-de-prestacao tipo="web-agendar"><descricao>http://siteprouni.mec.gov.br/</descricao></canal-de-prestacao><canal-de-prestacao tipo="fax"><descricao>123456</descricao></canal-de-prestacao></default><caso descricao="Estudantes de primeiro grau"><canal-de-prestacao tipo="e-mail"><descricao>estudantes@gov.br</descricao></canal-de-prestacao><canal-de-prestacao tipo="fax"><descricao>3434234242342342</descricao></canal-de-prestacao></caso></canais-de-prestacao></etapa><etapa><titulo>Inscrição no SisFIES</titulo><descricao>Pode se inscrever às bolsas remanescentes do Prouni 2º/2015 o candidato que atenda a uma das condições a seguir.</descricao><documentos><default/></documentos><custos><default/></custos><canais-de-prestacao><default/></canais-de-prestacao></etapa></etapas><orgao id="http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/61283"><contato>Em caso de dúvidas sobre o Prouni, ligue para [156](www.brasil.com.br).</contato></orgao><segmentos-da-sociedade><item>Cidadãos</item></segmentos-da-sociedade><areas-de-interesse><item>Agropecuária</item><item>Politica econômica</item></areas-de-interesse><palavras-chave><item>Teste</item><item>Prouni</item><item>Bolsa de estudos</item></palavras-chave><legislacoes><item>[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)</item><item>[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)</item></legislacoes></servico>';
  });

  it("deve retornar o nome", function () {
    expect(servicoParser.parseNome(xml)).toEqual('Serviço teste');
  });

  it("deve retornar a sigla", function () {
    expect(servicoParser.parseSigla(xml)).toEqual('STST');
  });

  it("deve retornar o contato", function () {
    expect(servicoParser.parseContato(xml)).toEqual('Em caso de dúvidas sobre o Prouni, ligue para 156.');
  });

  it("deve retornar o orgão", function () {
    expect(servicoParser.parseOrgao(xml)).toEqual({
      id: 'http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/61283'
    });
  });

  it("deve retornar a descriçãos", function () {
    var descricao = 'O Programa Universidade para Todos - Prouni tem como finalidade a concessão de bolsas de estudo integrais e parciais em cursos de graduação e sequenciais de formação específica, em instituições de ensino superior privadas. Criado pelo Governo Federal em 2004 e institucionalizado pela Lei nº 11.096, em 13 de janeiro de 2005 oferece, em contrapartida, isenção de tributos àquelas instituições que aderem ao Programa.';
    expect(servicoParser.parseDescricao(xml)).toEqual(descricao);
  });

  it("deve retornar os nomes populares", function () {
    expect(servicoParser.parseNomesPopulares(xml)).toEqual(['Serviço para teste', 'Testando a interface']);
  });

  it("deve retornar o custo", function () {
    expect(servicoParser.parseGratuito(xml)).toEqual(false);
  });

  it("deve retornar que é grauito", function () {
    expect(servicoParser.parseGratuito('<servico><gratuito/></servico>')).toEqual(true);
  });

  it("deve retornar que não é grauito", function () {
    expect(servicoParser.parseGratuito('<servico><gratuito>false</gratuito></servico>')).toEqual(false);
  });

  it("deve retornar os segmentos", function () {
    var segmentos = ["Cidadãos"];
    expect(servicoParser.parseSegmentos(xml)).toEqual(segmentos);
  });

  it("deve retornar as palavras chave", function () {
    var palavras = ["Teste", "Prouni", "Bolsa de estudos"];
    expect(servicoParser.parsePalavrasChave(xml)).toEqual(palavras);
  });

  it("deve retornar os solicitante", function () {
    var solicitantes = [{
        tipo: "Estudantes egressos do ensino médio da rede pública",
        requisitos: "Na condição de bolsistas integrais: * Com renda familiar per capita máxima de três salários mínimos. * Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação."
      },
      {
        tipo: "Estudantes egressos do ensino médio da rede particular",
        requisitos: "Na condição de bolsistas parciais: * Com renda familiar per capita máxima de seis salários mínimos. * Tenha participado do Exame Nacional do Ensino Médio - Enem, a partir da edição de 2010, e obtido, em uma mesma edição do referido exame, média das notas nas provas igual ou superior a 450 pontos e nota superior a zero na redação."
      },
      {
        tipo: "Pessoa com deficiência",
        requisitos: ""
      },
      {
        tipo: "Professor da rede pública de ensino",
        requisitos: "No efetivo exercício do magistério da educação básica e integrando o quadro de pessoal permanente da instituição pública e concorrer a bolsas exclusivamente nos cursos de licenciatura."
      }];
    expect(servicoParser.parseSolicitantes(xml)).toEqual(solicitantes);
  });

  it("deve retornar tempo total estimado", function () {
    expect(servicoParser.parseTempoTotalEstimado(xml)).toEqual({
      min: undefined,
      max: '40',
      unidade: 'dias-uteis',
      descricao: ''
    });
  });

  it("deve retornar tempo total estimado 2 com exceção", function () {
    expect(servicoParser.parseTempoTotalEstimado(xml2)).toEqual({
      min: '10',
      max: '15',
      unidade: 'dias-corridos',
      descricao: 'Exceção: Pode demorar de 20 a 25 dias corridos'
    });
  });

  it("deve retornar as lesgilações", function () {
    var legislacoes = ["[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)"];
    expect(servicoParser.parseLegislacoes(xml)).toEqual(legislacoes);
  });

  it("deve retornar as lesgilações 2", function () {
    var legislacoes = ["[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)", "[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)"];
    expect(servicoParser.parseLegislacoes(xml2)).toEqual(legislacoes);
  });

  it("deve retornar as àreas de interesse", function () {
    var areas = ["Agropecuária", "Politica econômica"];
    expect(servicoParser.parseAreasDeInteresse(xml)).toEqual(areas);
  });

  describe("primeira etapa", function () {
    it("deve retornar o nome", function () {
      expect(servicoParser.parseEtapas(xml)[0].titulo).toEqual('Agendamento');
    });

    it("deve retornar a descrição", function () {
      var descricao = 'Inscrições abertas a partir de 11/08 até 31/08, o prazo final para inscrição de candidato ainda não matriculado na instituição de educação superior em que deseja se inscrever.';
      expect(servicoParser.parseEtapas(xml)[0].descricao).toEqual(descricao);
    });

    it("deve retornar os documentos", function () {
      var documentos = {
        items: ['CPF', 'RG', 'Comprovante de renda'],
        casos: [{
          descricao: 'Professores',
          items: ['Comprovante do exercício do magistério']
        }]
      };
      expect(servicoParser.parseEtapas(xml)[0].documentos).toEqual(documentos);
    });

    it("deve retornar os custos", function () {
      var custos = {
        items: [{
          descricao: 'Taxa de inscrição',
          valor: '90,00'
        }],
        casos: [{
          descricao: 'Estudantes da rede pública de ensino',
          items: [{
            descricao: 'Taxa de inscrição',
            valor: '0,00'
          }]
        }]
      };
      expect(servicoParser.parseEtapas(xml)[0].custos).toEqual(custos);
    });

    it("deve retorar os canais", function () {
      var canaisDePrestacao = {
        items: [{
          tipo: 'postal',
          descricao: 'Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900'
        }, {
          tipo: 'e-mail',
          descricao: 'brasil@gov.br'
        }, {
          tipo: 'web-agendar',
          descricao: 'http://siteprouni.mec.gov.br/'
        }],
        casos: [{
          descricao: 'Estudantes da rede pública de ensino',
          items: [{
            tipo: 'postal',
            descricao: 'Av. Ipiranga 6681 - Prédio 99A - sala 218 – 2º andar. Porto Alegre - RS - Brasil. CEP 90619-900'
          }]
        }]
      };
      expect(servicoParser.parseEtapas(xml)[0].canaisDePrestacao).toEqual(canaisDePrestacao);
    });
  });

  describe("segunda etapa", function () {
    it("deve retornar o nome", function () {
      expect(servicoParser.parseEtapas(xml)[1].titulo).toEqual('Inscrição no SisFIES');
    });

    it("deve retornar a descrição", function () {
      var descricao = 'Pode se inscrever às bolsas remanescentes do Prouni 2º/2015 o candidato que atenda a uma das condições a seguir.';
      expect(servicoParser.parseEtapas(xml)[1].descricao).toEqual(descricao);
    });
  });

  it("deve chamar todos os subparsers", function () {
    var xmlData = $.parseXML(xml),
      each,
      parsers = [
            'parseNome', 'parseDescricao', 'parseSigla', 'parseGratuito', 'parseNomesPopulares',
            'parseSegmentos', 'parsePalavrasChave', 'parseSolicitantes',
            'parseAreasDeInteresse', 'parseCanaisDePrestacao', 'parseTempoTotalEstimado',
            'parseLegislacoes', 'parseEtapas', 'parseOrgao'
        ];

    for (each in parsers) {
      spyOn(servicoParser, parsers[each]);
    }

    servicoParser.parseXml(xml);

    for (each in parsers) {
      expect(servicoParser[parsers[each]]).toHaveBeenCalledWith(xmlData);
    }
  });
});
