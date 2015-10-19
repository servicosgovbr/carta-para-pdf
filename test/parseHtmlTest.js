describe('Montar objeto pdfmake', function () {
    var parseHtml;

    beforeEach(function(){
      parseHtml = new ParseHtml();
    });

    it('parse link', function () {
        var html = '<p><a href="http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766">TítuloLei nº 6.766, de 19 de Dezembro de 1979</a></p>';
        var container = [];
        var result = [[{ text: 'TítuloLei nº 6.766, de 19 de Dezembro de 1979 - http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1979-12-19;6766', style: 'text' }]];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse span', function () {
        var html = '<p><span>Test</span></p>';
        var container = [];
        var result = [[{ text: 'Test', style: 'text' }]];

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
        var result = [[{ text: 'Test - www.google.com', style: 'text' }, { text: 'Test 2 - www.yahoo.com', style: 'text' }]];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse h6', function () {
        var html = '<h6>Teste</h6>';
        var container = [];
        var result = [{ text: 'Teste', style: 'thirdheader' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse h2', function () {
        var html = '<h2>Ministério da Educação (MEC)</h2>';
        var container = [];
        var result = [{ text: 'Ministério da Educação (MEC)', style: 'thirdheader' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse h1', function () {
        var html = '<h1>Ministério da Educação (MEC)</h1>';
        var container = [];
        var result = [{ text: 'Ministério da Educação (MEC)', style: 'subheader' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse ul', function () {
        var html = '<ul><li>Bla</li><li>Bla 2</li></ul>';
        var container = [];
        var result = [{ ul: [ 'Bla', 'Bla 2' ], style: 'listMargin' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse ol', function () {
        var html = '<ol><li>Bla</li><li>Bla 2</li></ol>';
        var container = [];
        var result = [{ ol: [ 'Bla', 'Bla 2' ], style: 'listMargin' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse ol com bold', function () {
        var html = '<ol><li><b>Bold</b></li><li>Foo</li></ol>';
        var container = [];
        var result = [{ ol: [ { text: 'Bold', bold: true }, 'Foo' ], style: 'listMargin' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse ol com link', function () {
        var html = '<ol><li><i>Italic</i></li><li><a href="www.google.com">Test</a></li></ol>';
        var container = [];
        var result = [{ ol: [ 
            { text: 'Italic', italics: true }, 
            { text: 'Test - www.google.com', style: 'text' }], style: 'listMargin' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse orgao', function () {
        var html = '<h2>Ministério da Educação (MEC)</h2><p>Órgão do governo federal que trata da política nacional de educação em geral, compreendendo:</p><ul><li>ensino fundamental, médio e superior;</li><li>educação de jovens e adultos, seja profissional, especial ou à distância;</li><li>informação e pesquisa educacional;</li><li>pesquisa e extensão universitária; e</li><li>magistério.</li></ul>';
        var container = [];
        var result = [{ text: 'Ministério da Educação (MEC)', style: 'thirdheader' }, [{ text: 'Órgão do governo federal que trata da política nacional de educação em geral, compreendendo:', style: 'text' }], { ul: [ 'ensino fundamental, médio e superior;', 'educação de jovens e adultos, seja profissional, especial ou à distância;', 'informação e pesquisa educacional;', 'pesquisa e extensão universitária; e', 'magistério.' ], style: 'listMargin' }];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse orgao 2', function () {
        var markdownString = 'Ministério da Educação (MEC) \n Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: \n\n * ensino fundamental, médio e superior; \n * educação de jovens e adultos, seja profissional, especial ou à distância; \n * informação e pesquisa educacional; \n * pesquisa e extensão universitária; e \n * magistério.';
        var html = markdown.toHTML(markdownString);
        var container = [];
        var result = [ [ { text: 'Ministério da Educação (MEC)  Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: ', style: 'text' } ], { style: 'listMargin', ul: [ 'ensino fundamental, médio e superior; ', 'educação de jovens e adultos, seja profissional, especial ou à distância; ', 'informação e pesquisa educacional; ', 'pesquisa e extensão universitária; e ', 'magistério.' ] } ];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse orgao 3', function () {
        var markdownString = '# Ministério da Educação (MEC) \n Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: \n\n * ensino fundamental, médio e superior; \n * educação de jovens e adultos, seja profissional, especial ou à distância; \n * informação e pesquisa educacional; \n * pesquisa e extensão universitária; e \n * magistério.';
        var html = markdown.toHTML(markdownString);
        var container = [];
        var result = [ { text: 'Ministério da Educação (MEC)', style: 'subheader' }, [ { text: ' Órgão do governo federal que trata da política nacional de educação em geral, compreendendo: ', style: 'text' }], { style: 'listMargin', ul: [ 'ensino fundamental, médio e superior; ', 'educação de jovens e adultos, seja profissional, especial ou à distância; ', 'informação e pesquisa educacional; ', 'pesquisa e extensão universitária; e ', 'magistério.' ] } ];

        parseHtml.parseHtml(container, html);

        expect(container).toEqual(result);
    });

    it('parse markdown page example 1', function () {
        var markdownString = 'A First Level Header\n====================\n\nA Second Level Header\n---------------------\n\nNow is the time for all good men to come to\nthe aid of their country. This is just\nregular paragraph.\n\nThe quick brown fox jumped over the lazy\ndog\'s back.\n\n### Header 3\n\n> This is a blockquote.\n>\n> This is the second paragraph in the blockquote.\n>\n> ## This is an H2 in a blockquote';
        var html = markdown.toHTML(markdownString);
        console.log(html);
        var container = [];
        var result = [{ text: 'A First Level Header', style: 'subheader' }, 
            { text: 'A Second Level Header', style: 'thirdheader' }, 
            [{ text: 'Now is the time for all good men to come tothe aid of their country. This is justregular paragraph.', style: 'text' }], 
            [{ text: 'The quick brown fox jumped over the lazydog\'s back.', style: 'text' }], 
            { text: 'Header 3', style: 'thirdheader' }, 
            { text: '<p>This is a blockquote.</p><p>This is the second paragraph in the blockquote.</p><h2>This is an H2 in a blockquote</h2>', style: 'text' }];
        
        parseHtml.parseHtml(container, html);
        expect(container).toEqual(result);
    });
});
