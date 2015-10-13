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

    it('deve adicionar tempo estimado', function () {
        var servico = {
            tempoTotalEstimado: { max: '40', unidade: 'dias-uteis'}
        };
        var content = [
            { text: 'Quanto tempo leva?', style: 'subheader' },
            { text: '40 dias-uteis', style: 'paragraph' },
        ];
        contentBuilder.servico = servico;

        contentBuilder.buildTempoTotalEstimado();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

    it('deve adicionar legislações', function () {
        var servico = {
            legislacoes: [ '[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)' ]
        };
        var content = [
            { text: 'Legislação', style: 'subheader' },
        ];
        contentBuilder.servico = servico;

        contentBuilder.buildLegislacoes();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

    it('deve adicionar nomes populares', function () {
        var servico = {
            nomesPopulares: ['Serviço para teste', 'Testando a interface']
        };
        var content = [
            { text: 'Você também pode conhecer este serviço como: Serviço para teste, Testando a interface.', style: 'paragraph'}
        ];
        contentBuilder.servico = servico;

        contentBuilder.buildNomesPopulares();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

});
