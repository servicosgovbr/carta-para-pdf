describe('Montar conteúdo do serviço', function () {
    var contentBuilder;

    function aC(data) {
        return jasmine.arrayContaining(data);
    }

    beforeEach(function(){
      contentBuilder = new ContentBuilder({});
    });

    it('deve adicionar o nome', function () {
        var servico = { nome: 'Serviço teste', sigla:'STST' },
            content = [{ text: 'Serviço teste (STST)', style: 'header' }];
        contentBuilder.servico = servico;

        contentBuilder.buildNome();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

    it('deve adicionar descrição', function () {
        var servico = { descricao: 'Descrição teste'},
            content = [{ text: 'O que é?', style: 'subheader' }, { text: 'Descrição teste', style: 'paragraph' }];
        contentBuilder.servico = servico;

        contentBuilder.buildDescricao();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

    it('deve adicionar solicitantes', function () {
        var servico = { solicitantes: [
            { tipo: 'Com requisito',  requisitos: 'Requisito'},
            { tipo: 'Sem requisito', requisitos: ''}
        ]};
        var content = [
            { text: 'Com requisito', style: 'thirdheader' },
            { text: 'Requisito', style: 'paragraph' },
            { text: 'Sem requisito', style: 'thirdheader' },
            { text: '', style: 'paragraph' },
            { text: '', style: 'paragraph', pageBreak: 'after' }
        ];
        contentBuilder.servico = servico;

        contentBuilder.buildSolicitantes();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

});
