describe('Montar objeto pdfmake', function () {
    var parseHtml;

    beforeEach(function(){
      parseHtml = new ParseHtml();
    });

    it('parse link', function () {
        var html = '<p><a href="http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766">TítuloLei nº 6.766, de 19 de Dezembro de 1979</a></p>';
        var container = [];
        var result = [[{ text: 'TítuloLei nº 6.766, de 19 de Dezembro de 1979 - http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766' }]];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse span', function () {
        var html = '<p><span>Test</span></p>';
        var container = [];
        var result = [[{ 'text': [{ text: 'Test' }]}]];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse bold', function () {
        var html = '<p><b>Test</b></p>';
        var container = [];
        var result = [[{ text: 'Test', bold: true }]];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse underline', function () {
        var html = '<p><u>Test</u></p>';
        var container = [];
        var result = [[{ text: 'Test', decoration: 'underline' }]];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse italic', function () {
        var html = '<p><i>Test</i></p>';
        var container = [];
        var result = [[{ text: 'Test', italics: true }]];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse links', function () {
        var html = '<p><a href="www.google.com">Test</a><a href="www.yahoo.com">Test 2</a></p>';
        var container = [];
        var result = [[{ text: 'Test - www.google.com' }, { text: 'Test 2 - www.yahoo.com' }]];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse h2', function () {
        var html = '<h2>Ministério da Educação (MEC)</h2>';
        var container = [];
        var result = [{ text: 'Ministério da Educação (MEC)', style: 'subheader' }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse h1', function () {
        var html = '<h1>Ministério da Educação (MEC)</h1>';
        var container = [];
        var result = [{ text: 'Ministério da Educação (MEC)', style: 'header' }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse ul', function () {
        var html = '<ul><li>Bla</li><li>Bla 2</li></ul>';
        var container = [];
        var result = [{ ul: [ 'Bla', 'Bla 2' ], style: 'list' }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse orgao', function () {
        var html = '<h2>Ministério da Educação (MEC)</h2><p>Órgão do governo federal que trata da política nacional de educação em geral, compreendendo:</p><ul><li>ensino fundamental, médio e superior;</li><li>educação de jovens e adultos, seja profissional, especial ou à distância;</li><li>informação e pesquisa educacional;</li><li>pesquisa e extensão universitária; e</li><li>magistério.</li></ul>';
        var container = [];
        var result = [{ text: 'Ministério da Educação (MEC)', style: 'subheader' }, [{ text: [{ text: 'Órgão do governo federal que trata da política nacional de educação em geral, compreendendo:' }] }], { ul: [ 'ensino fundamental, médio e superior;', 'educação de jovens e adultos, seja profissional, especial ou à distância;', 'informação e pesquisa educacional;', 'pesquisa e extensão universitária; e', 'magistério.' ], style: 'list' }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });

    it('parse orgao 2', function () {
        var markdownString = 'Ministério da Educação (MEC) \n Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: \n\n * ensino fundamental, médio e superior; \n * educação de jovens e adultos, seja profissional, especial ou à distância; \n * informação e pesquisa educacional; \n * pesquisa e extensão universitária; e \n * magistério.';
        var html = markdown.toHTML(markdownString);;
        var container = [];
        var result = [[{ text: [{ text: 'Ministério da Educação (MEC)  Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: ' }, { text: '' } ]}], { text: [{ text: 'Ministério da Educação (MEC)  Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: ' }, { text: '' }]}, { ul: [ 'ensino fundamental, médio e superior; ', 'educação de jovens e adultos, seja profissional, especial ou à distância; ', 'informação e pesquisa educacional; ', 'pesquisa e extensão universitária; e ', 'magistério.' ], style: 'list' }];

        parseHtml.parseHtml(container, html);
            
        expect(container).toEqual(result);
    });
});
