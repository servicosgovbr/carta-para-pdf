describe('Montar conteúdo do serviço', function () {
    var contentBuilder;

    function aC(data) {
        return jasmine.arrayContaining(data);
    }

    beforeEach(function(){
      contentBuilder = new ContentBuilder({});
    });

    it('deve adicionar o nome', function () {
        var servico = { nome: 'Serviço teste', sigla:'STST' };
        contentBuilder.servico = servico;

        contentBuilder.buildNomeServico();

        console.log(contentBuilder.docContent);
        expect(contentBuilder.docContent).toEqual(aC([{ text: 'Serviço teste (STST)', style: 'header' }]));
    });
});
