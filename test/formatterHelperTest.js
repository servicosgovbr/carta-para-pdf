describe('Formatador do valores para o PDF', function () {
    var formatterHelper;

    beforeEach(function(){
      formatterHelper = new FormatterHelper();
    });

    it('formata data', function () {
        expect(formatterHelper.formatDate(new Date(2015, 2, 03))).toEqual('3 Março de 2015');
    });

    it('formata data 2', function () {
        expect(formatterHelper.formatDate(new Date(2015, 11, 3))).toEqual('3 Dezembro de 2015');
    });

    it('formata data 2', function () {
        expect(formatterHelper.formatDate(new Date(2014, 0, 22))).toEqual('22 Janeiro de 2014');
    });
});
