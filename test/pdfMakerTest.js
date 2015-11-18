describe('Montar objeto pdfmake inicial', function () {
    var pdfMaker;
    var formatterHelper = new cartaParaPdf.FormatterHelper();

    beforeEach(function(){
      pdfMaker = new cartaParaPdf.PdfMaker();
    });

    function arrayContaining(data) {
        return jasmine.arrayContaining(data);
    }

    it('cria capa', function () {
        var result = [ 
          { text: 'Ministério da Educação (MEC)', style: 'title'},
          { text: '__________________________________', style: 'border', margin: [ 0, 30, 0, 0 ] },
          '\n',
          '\n',
          { text: 'Carta de Serviços', style: 'subtitle', margin: [ 0, 20, 0, 0 ] },
          { margin: [ 0, 10, 0, 0 ], fontSize: 11, text: 'Documento gerado em ' + new cartaParaPdf.FormatterHelper().getCurrentDate(), fontStyle: 50, style: 'paragraph' },
          '\n',
          { text: 'A Carta de Serviços é um instrumento de gestão pública, que contém informações sobre os serviços públicos prestados de forma direta ou indireta pelos órgãos e entidades da administração pública.', style: 'paragraph' },
          { text: 'Ela contempla as formas de acesso, padrões de qualidade e compromissos de atendimento aos usuários.', style: 'paragraph' }
        ];

        pdfMaker.initialDocDefinition('Ministério da Educação (MEC)');
        expect(pdfMaker.initialDocDefinition('Ministério da Educação (MEC)')).toEqual(arrayContaining(result));
    });

    it('cria capa do orgão', function () {
        expect(pdfMaker.capaOrgao('Ministério da educação (MEC)', 'Órgão do governo federal que trata da política nacional de educação em geral.')).toEqual(
          [{ text: 'Ministério da educação (MEC)', style: 'header' }, 
          { text: 'Quem somos?', style: 'subheadermargin' }, 
          '\n',
          [[{ text: 'Órgão do governo federal que trata da política nacional de educação em geral.', style: 'text', headlineLevel: 2 }]], 
          { text: '', style: 'paragraph' } ]);
    });

    it('cria info sobre serviços', function () {
        cartaParaPdf.ContentBuilder = function () { 
          return {
            buildContent: function() {
              return [{ text: 'test' }];
            } 
          };
        };

        expect(pdfMaker.geraInformacoesDosServicos(['<xml>test</xml>', '<xml>test</xml>', '<xml>test</xml>'])).toEqual([
          [{ text: 'test' }], 
          [{ text: 'test' }], 
          [{ text: 'test' }] 
		]);
    });
});
