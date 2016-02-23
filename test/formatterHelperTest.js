describe('Formatador do valores para o PDF', function () {
  var formatterHelper;

  beforeEach(function () {
    formatterHelper = new cartaParaPdf.FormatterHelper();
  });

  it('formata data', function () {
    expect(formatterHelper.formatDate(new Date(2015, 2, 03))).toEqual('3 de Março de 2015');
    expect(formatterHelper.formatDate(new Date(2014, 0, 22))).toEqual('22 de Janeiro de 2014');
    expect(formatterHelper.formatDate(new Date(2015, 11, 3))).toEqual('3 de Dezembro de 2015');
  });

  it('formata canal', function () {
    expect(formatterHelper.formatarCanalDeComunicacao('web-agendar')).toEqual('Web');
    expect(formatterHelper.formatarCanalDeComunicacao('postal')).toEqual('Postal');
    expect(formatterHelper.formatarCanalDeComunicacao('e-mail')).toEqual('E-mail');
    expect(formatterHelper.formatarCanalDeComunicacao('fax')).toEqual('Fax');
  });
});
