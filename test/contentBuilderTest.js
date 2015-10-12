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

        contentBuilder.buildNome();

        expect(contentBuilder.docContent).toEqual(aC([{ text: 'Serviço teste (STST)', style: 'header' }]));
    });

    it('deve adicionar descrição', function () {
        var servico = { descricao: 'Descrição teste'},
            content = [{ text: 'O que é?', style: 'subheader' }, { text: 'Descrição teste', style: 'paragraph' }];
        contentBuilder.servico = servico;

        contentBuilder.buildDescricao();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

});
