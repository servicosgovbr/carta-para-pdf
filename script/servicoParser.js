var ServicoParser = function() {
	var nome, descricao, segmentosDaSociedade, areasDeInteresse, canalDePrestacao, tipoCanalDePrestacao, orgao;
	var parser = new DOMParser();
	var xmlDoc;
	var docContent = [];

	function parseNome() {
		return xmlDoc.getElementsByTagName("nome")[0].childNodes[0].nodeValue;
	}

	function parseDescricao() {
		return xmlDoc.getElementsByTagName("descricao")[0].childNodes[0].nodeValue;
	}

	function parseAreasDeInteresse() {
		return xmlDoc.getElementsByTagName('areas-de-interesse')[0].childNodes[1].childNodes[0].nodeValue;
	}

	function parseCanalDePrestacao() {
		return xmlDoc.getElementsByTagName('canais-de-prestacao')[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].nodeValue;
	}

	function parseTipoCanalDePrestacao() {
		return xmlDoc.getElementsByTagName('canais-de-prestacao')[0].childNodes[1].childNodes[1].getAttribute('tipo');
	}

	function parseOrgao() {
		return xmlDoc.getElementsByTagName('orgao')[0].getAttribute('id');
	}

	function addNewLine() {
		docContent.push('\n');
	}

	function addValuesIntoDocument() {
		docContent.push({ text: nome, style: 'header'});
		addNewLine();
		docContent.push({ text: descricao, style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Etapas para a realização deste serviço', style: 'subheader' });
		addNewLine();
		docContent.push({ text: 'Etapa 1', style: 'subheader' });
		addNewLine();
		docContent.push({ text: 'Canais de Prestação', style: 'subheader'});
		addNewLine();
		docContent.push({ text: tipoCanalDePrestacao + ' - ' + canalDePrestacao, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Segmentos da Sociedade', style: 'subheader'});
		addNewLine();
		docContent.push({ ul: [ segmentosDaSociedade ], style: 'list' });
		addNewLine();
		docContent.push({ text: 'Áreas de Interesse', style: 'subheader'});
		addNewLine();
		docContent.push({ ul: [ areasDeInteresse ], style: 'list' });
		addNewLine();
		docContent.push({ text: 'Orgão responsável', style: 'subheader'});
		addNewLine();
		docContent.push({ ul: [ orgao ], style: 'paragraph', pageBreak: 'after' });
	}

	function parseXml(data) {
		xmlDoc = parser.parseFromString(data, "text/xml");

		nome = parseNome();
		descricao = parseDescricao();
		segmentosDaSociedade = '';
		areasDeInteresse = parseAreasDeInteresse();
        canalDePrestacao = parseCanalDePrestacao();
        tipoCanalDePrestacao = parseTipoCanalDePrestacao();
        orgao = parseOrgao();

        addValuesIntoDocument();

        return docContent;
	}

	return {
		parseXml: parseXml
	};
};