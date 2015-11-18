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

        return new cartaParaPdf.ContentBuilder(servico);
    }

    it('deve adicionar o nome', function () {
        var servico = { nome: 'Serviço teste', sigla:'STST' },
            content = [{ text: 'Serviço teste (STST)', style: 'header' }];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar descrição', function () {
        var servico = { descricao: 'Descrição teste'},
            content = [{ text: 'O que é?', style: 'subheader' }, { text: 'Descrição teste', style: 'paragraph' }];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar solicitantes', function () {
        var servico = { solicitantes: [
            { tipo: 'Com requisito',  requisitos: 'Requisito'},
            { tipo: 'Sem requisito', requisitos: ''}
        ]};
        var content = [
            { text: 'Com requisito', style: 'thirdheader', headlineLevel: 1 },
            [{ text: 'Requisito', style: 'text', headlineLevel: 2 }],
            { text: 'Sem requisito', style: 'thirdheader', headlineLevel: 1 },
            { text: '', style: 'paragraph' },
            { text: '', style: 'paragraph' }
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
            { text: 'Até 40 dias úteis é o tempo estimado para a prestação imediata deste serviço.', style: 'paragraph' },
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar tempo estimado 2', function () {
        var servico = {
            tempoTotalEstimado: { min: '10', max: '15', unidade: 'dias-corridos'}
        };
        var content = [
            { text: 'Quanto tempo leva?', style: 'subheader' },
            { text: 'Entre 10 e 15 dias corridos é o tempo estimado para a prestação imediata deste serviço.', style: 'paragraph' },
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar tempo estimado 3', function () {
        var servico = {
            tempoTotalEstimado: { min: '1', max: '5', unidade: 'meses'}
        };
        var content = [
            { text: 'Quanto tempo leva?', style: 'subheader' },
            { text: 'Entre 1 e 5 meses é o tempo estimado para a prestação imediata deste serviço.', style: 'paragraph' },
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

    it('deve adicionar legislações 2', function () {
        var servico = {
            legislacoes: [ '[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)', '[TítuloLei nº 6.766, de 19 de Dezembro de 1979](http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)' ]
        };
        var content = [
            { text: 'Legislação', style: 'subheader' },
            [ { text: 'TítuloLei nº 6.766, de 19 de Dezembro de 1979 (http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)', style: 'text' }], 
            [ { text: 'TítuloLei nº 6.766, de 19 de Dezembro de 1979 (http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766)', style: 'text' } ]
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar nomes populares', function () {
        var servico = {
            nomesPopulares: ['Serviço para teste', 'Testando a interface']
        };
        var content = [
            { text: 'Você também pode conhecer este serviço como: Serviço para teste, Testando a interface.', style: 'paragraph' }
        ];
        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });

    it('deve adicionar gratuidade', function () {
        var servico = {
            gratuito: true
        };
        var content = [
            { text: 'Este serviço é gratuito para o cidadão.', style: 'paragraph' }
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

    it('deve adicionar 1 etapa', function () {
        var servico = {
            gratuito: true,
            etapas: [{
                titulo: 'Agendamento',
                descricao: 'Inscrições abertas a partir de 11/08 até 31/08, o prazo final para inscrição de candidato ainda não matriculado na instituição de educação superior em que deseja se inscrever.',
                documentos: {
                    items: ['CPF'],
                    casos: [{
                        descricao: 'Professores',
                        items: ['Comprovante do exercício do magistério']
                    }]
                },
                custos: {
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
                },
                canaisDePrestacao: {
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
                }
            }],
        };

        var content = [
            {text: 'Etapas para a realização desse serviço',style:'subheader'},
            '\n',
            {text: 'Etapa 1 - Agendamento',style:'thirdheader'},
            '\n',
            {text: 'Inscrições abertas a partir de 11/08 até 31/08, o prazo final para inscrição de candidato ainda não matriculado na instituição de educação superior em que deseja se inscrever.',style:'paragraph'},
            '\n',{
                text: 'Documentos necessários para esta etapa:',
                style: 'thirdheader'
            }, '\n'
        ];

        contentBuilder = criarContentBuilder(servico);

        expect(contentBuilder.buildContent()).toEqual(arrayContaining(content));
    });
});
