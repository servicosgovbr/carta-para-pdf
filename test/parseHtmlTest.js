describe('Montar objeto pdfmake', function () {
    var parseHtml;

    beforeEach(function(){
      parseHtml = new ParseHtml();
    });

    it('parse link', function () {
        var html = '<p><a href="http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766">TítuloLei nº 6.766, de 19 de Dezembro de 1979</a></p>';
        var content = [];
        var result = [
            { 'stack': [
                { 'text': [] },
                {'stack': [
                    { 'text': [
                        { 'text': 'TítuloLei nº 6.766, de 19 de Dezembro de 1979' }
                    ]}
                ]}
            ]}
        ];

        parseHtml.parseHtml(content, html);
            
        expect(content).toEqual(result);
    });

    it('parse span', function () {
        var html = '<p><span>Test</span></p>';
        var content = [];
        var result = [{ 
            stack: [{ 'text': [{ text: 'Test' }] }]
        }];

        parseHtml.parseHtml(content, html);
            
        expect(content).toEqual(result);
    });

    it('parse bold', function () {
        var html = '<p><b>Test</b></p>';
        var content = [];
        var result = [{ 
            stack: [{ 'text': [{ text: 'Test', bold: true }] }]
        }];

        parseHtml.parseHtml(content, html);
            
        expect(content).toEqual(result);
    });

    it('parse underline', function () {
        var html = '<p><u>Test</u></p>';
        var content = [];
        var result = [{ stack: [{ text: [{ text: 'Test', decoration: 'underline' }] }] }];

        parseHtml.parseHtml(content, html);
            
        expect(content).toEqual(result);
    });
});
