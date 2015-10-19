describe('Montar objeto pdfmake inicial', function () {
    var pdfMaker;
    pdfMake = {};

    beforeEach(function(){
      pdfMaker = new PdfMaker();
    });

    it('cria capa', function () {
        pdfMaker.initialDocDefinition('Ministério da educação (MEC)');
        expect(pdfMaker.docDefinition.content).toEqual([ { text: 'Carta de serviços', style: 'title' }, { text: '__________', style: 'border', margin: [ 70, -40, 90, 0 ] }, '\n', '\n', { text: 'MINISTÉRIO DA EDUCAÇÃO (MEC)', style: 'subtitle', margin: [ 70, 0, 115, 0 ], pageBreak: 'after' } ]);
    });
});
