describe('Montar objeto pdfmake inicial', function () {
    var pdfMaker;

    beforeEach(function(){
      pdfMaker = new PdfMaker();
    });

    it('cria capa', function () {
        pdfMaker.initialDocDefinition('Ministério da educação (MEC)');
        expect(pdfMaker.docDefinition.content).toEqual(
          [ 
            { text: 'Carta de serviços', style: 'title' }, 
            { text: '__________', style: 'border', margin: [ 70, -40, 90, 0 ] },
            '\n',
            '\n', 
            { text: 'MINISTÉRIO DA EDUCAÇÃO (MEC)', style: 'subtitle', margin: [ 70, 0, 115, 0 ], pageBreak: 'after' } 
          ]);
    });

    it('cria capa do orgão', function () {
        pdfMaker.capaOrgao('Ministério da educação (MEC)', 'Órgão do governo federal que trata da política nacional de educação em geral.');
        expect(pdfMaker.docDefinition.content).toEqual([
          { text: 'Ministério da educação (MEC)', style: 'header' },
          { text: 'O que é?', style: 'subheader' },
          '\n',
          [ [ { text: 'Órgão do governo federal que trata da política nacional de educação em geral.', style: 'text' } ] ],
          { text: '', style: 'paragraph', pageBreak: 'after' } 
        ]);
    });

    it('cria info sobre carta de serviços', function () {
        pdfMaker.informacaoCartasDeServico();
        expect(pdfMaker.docDefinition.content).toEqual([
          { text: 'O que é uma carta de serviços?', style: 'header'},
          '\n',
          { text: 'Carta de serviços é um documento feito para informar o cidadão sobre os serviços públicos disponíveis pelo governo federal. Cada carta é sobre um orgão do governo e seus serviços disponíveis.', style: 'paragraph' },
          '\n',
          { text: 'A Carta de serviços é baseada nas informações do portal de serviços do governo federal (www.servicos.gov.br). Esse documento foi gerado em ' + new FormatterHelper().getCurrentDate() + '. O portal de serviços está sempre sendo atualizado, por isso é importante imprimir a carta de serviços com frequência.', style: 'paragraph', pageBreak: 'after' }
        ]);
    });

    it('cria info sobre serviços', function () {
        ContentBuilder = function () { 
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
