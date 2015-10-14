describe('Montar objeto pdfmake', function () {
    var parseHtml;

    beforeEach(function(){
      parseHtml = new ParseHtml();
    });

    it('parse link', function () {
        var html = '<p><a href="http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766">TítuloLei nº 6.766, de 19 de Dezembro de 1979</a></p>';
        var container = [];
        var result = [
            { 'stack':
                {'stack': [
                    { 'text': [
                        { 'text': 'TítuloLei nº 6.766, de 19 de Dezembro de 1979 - http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766' }
                    ]}
                ]}
            ]}
        ];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse span', function () {
        var html = '<p><span>Test</span></p>';
        var container = [];
        var result = [{ 
            stack: [{ 'text': [{ text: 'Test' }] }]
        }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse bold', function () {
        var html = '<p><b>Test</b></p>';
        var container = [];
        var result = [{ 
            stack: [{ 'text': [{ text: 'Test', bold: true }] }]
        }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse underline', function () {
        var html = '<p><u>Test</u></p>';
        var container = [];
        var result = [{ stack: [{ text: [{ text: 'Test', decoration: 'underline' }] }] }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse italic', function () {
        var html = '<p><i>Test</i></p>';
        var container = [];
        var result = [{ stack: [{ text: [{ text: 'Test', italics: true }] }] }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse table', function () {
        var html = '<table><tr><td>Test</td></tr></table>';
        var container = [];
        var result = [{ table: { widths: [ '*' ],
            body: [[ { stack: [ { text: [ { text: 'Test' } ] }] }] ] }, 
            layout: 'noBorders' 
        }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });
});
