var ServicoParser = function() {
	var nome, descricao, segmentosDaSociedade, areasDeInteresse, canaisDePrestacao, orgao, xmlDoc;
	var docContent = [];
	var returnObject = {};

	function parseNome() {
		return $(xmlDoc).find("nome").html();
	}

	function parseDescricao() {
		return $(xmlDoc).find("descricao").html();
	}

	function parseAreasDeInteresse() {
		var values = [];

		$(xmlDoc).find("areas-de-interesse item").each(function(index, item) {
			values.push($(item).html());
		});

		return values;
	}

	function parseCanalDePrestacao() {
		var values = [];

		$(xmlDoc).find("canal-de-prestacao").each(function(index, item) {
			values.push($(item).attr('tipo') +  ' - ' + $(item).find('descricao').html());
		});

		return values;
	}

	function parseOrgao() {
		return $(xmlDoc).find("orgao").attr('id');
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
		docContent.push({ ul: canaisDePrestacao, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Segmentos da Sociedade', style: 'subheader'});
		addNewLine();
		docContent.push({ ul: [ segmentosDaSociedade ], style: 'list' });
		addNewLine();
		docContent.push({ text: 'Áreas de Interesse', style: 'subheader'});
		addNewLine();
		docContent.push({ ul: areasDeInteresse, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Orgão responsável', style: 'subheader'});
		addNewLine();
		docContent.push({ ul: [ orgao ], style: 'paragraph', pageBreak: 'after' });
	}

	function createReturnObject() {
		returnObject.nome = nome;
	}

	function parseXml(data) {
		xmlDoc = $.parseXML(data);

		nome = parseNome();
		// descricao = parseDescricao();
		// segmentosDaSociedade = '';
		// areasDeInteresse = parseAreasDeInteresse();
	 //  canaisDePrestacao = parseCanalDePrestacao();
	 //  orgao = parseOrgao();

	  createReturnObject();

	  return returnObject;
	}

	return {
		parseXml: parseXml
	}
};