describe('Montar objeto pdfmake', function () {
    var parseHtml;

    beforeEach(function(){
      parseHtml = new ParseHtml();
    });

    it('parse link', function () {
        var html = '<p><a href="http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766">TítuloLei nº 6.766, de 19 de Dezembro de 1979</a></p>';
        var content = [];
        var result = [
            { "stack": [
                { "text": [] },
                {"stack": [
                    { "text": [{ "text": "TítuloLei nº 6.766, de 19 de Dezembro de 1979" }]}
                ]}
            ]}
        ];

        parseHtml.parseHtml(content, html);
            
        expect(content).toEqual(result);
    });
});
