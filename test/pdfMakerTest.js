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
});
