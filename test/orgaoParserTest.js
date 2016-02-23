describe("O parse do xml do orgão", function () {
  var orgaoParser, xmlSemContato, xmlComContato;

  beforeEach(function () {
    orgaoParser = new cartaParaPdf.OrgaoParser();
    xmlSemContato = '<orgao xmlns="http://servicos.gov.br/v3/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <url>http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/1986</url> <nome>Secretaria do Patrimônio da União (SPU)</nome> <conteudo><![CDATA[Unidade do [Ministério do Planejamento, Orçamento e Gestão] que tem como missão conhecer, zelar e garantir que cada imóvel da União cumpra sua função socioambiental, em harmonia com a função arrecadadora, em apoio aos programas estratégicos para a Nação. Dentre os serviços ofertados ao público estão a [emissão de certidão do imóvel](/servico/emissao-de-certidao-de-imovel-spu) e a [consulta aos dados do parcelamento do imóvel](/servico/consulta-dados-do-parcelamento-do-imovel). [Ministério do Planejamento, Orçamento e Gestão]:/orgao/ministerio-do-planejamento-orcamento-e-gestao-mpog]]></conteudo> </orgao>';
    xmlComContato = '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <orgao xmlns="http://servicos.gov.br/v3/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <url>http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/108999</url> <nome>Administração Central (AC)</nome> <conteudo><![CDATA[Orgão de Teste]]></conteudo> <contato><![CDATA[Em caso de dúvidas entre em contato.]]></contato> </orgao>';
  })

  it("deve retornar o nome", function () {
    expect(orgaoParser.parseNome(xmlComContato)).toEqual('Administração Central (AC)');
  });

  it("deve retornar a descricao", function () {
    expect(orgaoParser.parseDescricao(xmlComContato)).toEqual('Orgão de Teste');
  });

  it("deve retornar o contato quando disponivel", function () {
    expect(orgaoParser.parseContato(xmlComContato)).toEqual('Em caso de dúvidas entre em contato.');
  });

  it("não deve retornar o contato quando indisponivel", function () {
    expect(orgaoParser.parseContato(xmlSemContato)).toEqual('');
  });
});
