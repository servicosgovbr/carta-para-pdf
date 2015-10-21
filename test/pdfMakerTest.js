describe('Montar objeto pdfmake inicial', function () {
    var pdfMaker;
    var formatterHelper = new cartaParaPdf.FormatterHelper();

    beforeEach(function(){
      pdfMaker = new cartaParaPdf.PdfMaker();
    });

    it('cria capa', function () {
        pdfMaker.initialDocDefinition('Ministério da educação (MEC)');
        expect(pdfMaker.docDefinition.content).toEqual(
          [ 
            { text: 'Ministério da educação (MEC)', style: 'title'},
            { text: '__________________________________', style: 'border', margin: [ 0, 30, 0, 0 ] },
            '\n',
            '\n',
            { text: 'Carta de Serviços', style: 'subtitle', margin: [ 0, 20, 0, 0 ] },
            '\n',
            { text: 'Carta de serviços é um documento feito para informar o cidadão sobre os serviços públicos disponíveis pelo Governo Federal. Cada carta é sobre um orgão do governo e seus serviços disponíveis.', style: 'paragraph' },
            { text: 'A Carta de serviços é baseada nas informações do portal de serviços do Governo Federal (www.servicos.gov.br).', style: 'paragraph' },
            '\n',
            { text: 'Documento impresso em ' + new cartaParaPdf.FormatterHelper().getCurrentDate(), margin: [ 0, 230, 0, 0 ], fontStyle: 50, style: 'paragraph', pageBreak: 'after' }
          ]);
    });

    it('cria capa do orgão', function () {
        pdfMaker.capaOrgao('Ministério da educação (MEC)', 'Órgão do governo federal que trata da política nacional de educação em geral.');
        expect(pdfMaker.docDefinition.content).toEqual(
          [{ text: 'Ministério da educação (MEC)', style: 'header' }, 
          { text: 'O que é?', style: 'subheadermargin' }, 
          '\n',
          [{ text: 'Órgão do governo federal que trata da política nacional de educação em geral.', style: 'text' }], 
          { text: '', style: 'paragraph', pageBreak: 'after' } ]);
    });

    it('cria info sobre serviços', function () {
        cartaParaPdf.ContentBuilder = function () { 
          return {
            buildContent: function() {
              return [{ text: 'test' }];
            } 
          };
        };

        pdfMaker.geraInformacoesDosServicos(['<xml>test</xml>', '<xml>test</xml>', '<xml>test</xml>']);
        expect(pdfMaker.docDefinition.content).toEqual([ 
          { text: 'test' }, 
          { text: '', pageBreak: 'after' }, 
          { text: 'test' }, 
          { text: '', pageBreak: 'after' }, 
          { text: 'test' } ]);
    });
});
