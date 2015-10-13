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
            content = [{ text: 'O QUE É?', style: 'subheader' }, { text: 'Descrição teste', style: 'paragraph' }];
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
            { text: 'QUANTO TEMPO LEVA?', style: 'subheader' },
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
            { text: 'LEGISLAÇÃO', style: 'subheader' },
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

    it('deve adicionar gratuidade', function () {
        var servico = {
            gratuito: true
        };
        var content = [
            { text: 'Este serviço é gratuito para o cidadão.', style: 'paragraph' }
        ];
        contentBuilder.servico = servico;

        contentBuilder.buildGratuidade();

        expect(contentBuilder.docContent).toEqual(aC(content));
    });

    it('deve adicionar outras informações', function () {
        var content = [
            { text: 'OUTRAS INFORMAÇÕES', style: 'subheader' }
        ];
        spyOn(contentBuilder, 'buildNomesPopulares');
        spyOn(contentBuilder, 'buildGratuidade');

        contentBuilder.buildOutrasInformacoes();

        expect(contentBuilder.buildNomesPopulares).toHaveBeenCalledWith();
        expect(contentBuilder.buildGratuidade).toHaveBeenCalledWith();
        expect(contentBuilder.docContent).toEqual(aC(content));
    });

    it('deve chamar todos os builders', function () {
        var each,
        builders = [
            'buildNome', 'buildDescricao', 'buildSolicitantes', 'buildEtapas',
            'buildTempoTotalEstimado', 'buildLegislacoes', 'buildOutrasInformacoes'
        ];

      for (each in builders) {
          spyOn(contentBuilder, builders[each]);
      }

      contentBuilder.buildContent();

      for (each in builders) {
          expect(contentBuilder[builders[each]]).toHaveBeenCalledWith();
      }
    });
});
