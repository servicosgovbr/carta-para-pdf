describe('Montar conteúdo do serviço', function () {
    var contentBuilder;

    function arrayContaining(data) {
        return jasmine.arrayContaining(data);
    }

    function criarContentBuilder (novoServico) {
        var property,
            servico = {
                nome: '',
                sigla: '',
                descricao: '',
                solicitantes: [{ tipo: '', requisitos: '' }],
                tempoTotalEstimado: { max: '', unidade: '' },
                legislacoes: [''],
                nomesPopulares: ['']
        };

        for (property in novoServico) {
            servico[property] = novoServico[property];
        }

        return new ContentBuilder(servico);
    }

    it('deve adicionar o nome', function () {
        var servico = { nome: 'Serviço teste', sigla:'STST' },
            content = [{ text: 'Serviço teste (STST)', style: 'header' }];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar descrição', function () {
        var servico = { descricao: 'Descrição teste'},
            content = [{ text: 'O que é?', style: 'subheader' }, { text: 'Descrição teste', style: 'paragraph', margin: [ 40, 0, 20, 15 ] }];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar solicitantes', function () {
        var servico = { solicitantes: [
            { tipo: 'Com requisito',  requisitos: 'Requisito'},
            { tipo: 'Sem requisito', requisitos: ''}
        ]};
        var content = [
            { text: 'Com requisito', style: 'thirdheader' },
            { text: 'Requisito', style: 'paragraph', margin: [ 40, 0, 20, 15 ] },
            { text: 'Sem requisito', style: 'thirdheader' },
            { text: '', style: 'paragraph', margin: [ 40, 0, 20, 15 ] },
            { text: '', style: 'paragraph', margin: [ 40, 0, 20, 15 ] }
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar tempo estimado', function () {
        var servico = {
            tempoTotalEstimado: { max: '40', unidade: 'dias-uteis'}
        };
        var content = [
            { text: 'Quanto tempo leva?', style: 'subheader' },
            { text: '40 dias-uteis', style: 'paragraph', margin: [ 40, 0, 40, 15 ] },
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar legislações', function () {
        var servico = {
            legislacoes: [ '[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)' ]
        };
        var content = [
            { text: 'Legislação', style: 'subheader' },
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar nomes populares', function () {
        var servico = {
            nomesPopulares: ['Serviço para teste', 'Testando a interface']
        };
        var content = [
            { text: 'Você também pode conhecer este serviço como: Serviço para teste, Testando a interface.', style: 'paragraph', margin: [ 40, 0, 100, 15 ]}
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar gratuidade', function () {
        var servico = {
            gratuito: true
        };
        var content = [
            { text: 'Este serviço é gratuito para o cidadão.', style: 'paragraph', margin: [ 40, 0, 100, 15 ] }
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar outras informações', function () {
        var content = [
            { text: 'Outras informações', style: 'subheader' }
        ];

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });
});
