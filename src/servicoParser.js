var ServicoParser = function() {
	var segmentosDaSociedade, areasDeInteresse, canaisDePrestacao, orgao, xmlDoc;
	var docContent = [];
	var returnObject = {};

	function parseNome(xmlDoc) {
		return $(xmlDoc).find("nome").html();
	}

	function parseDescricao(xmlDoc) {
		return $(xmlDoc).find("descricao").html();
	}

	function parseAreasDeInteresse() {
		var values = [];

		$(xmlDoc).find("areas-de-interesse item").each(function(index, item) {
			values.push($(item).html());
		});

		return values;
	}
	function parseEtapas(xmlDoc) {
		var etapas = [];

		$(xmlDoc).find("etapa").each(function(index, etapa) {
			etapas.push({'titulo': $(etapa).find('titulo').html(),
				'descricao': $(etapa).find('descricao').html(),
				'documentos': parseDocumentos(etapa),
				'custos': parseCustos(etapa),
				'canaisDePrestacao': parseCanaisDePrestacao(etapa)
			});
		});

		return etapas;
	}

	function parseDocumentos(etapa) {
		var documentos = {};
		documentos.items = [];
		documentos.casos = [];

		$(etapa).find('documentos default item').each(function(index, item) {
			documentos.items.push($(item).html());
		});

		$(etapa).find('documentos caso').each(function(index, caso) {
			var casoObj = { descricao: $(caso).attr('descricao'), items: [] };

			$(caso).find('item').each(function(index, item) {
				casoObj.items.push($(item).html());
			});

			documentos.casos.push(casoObj);
		});

		return documentos;
	}

	function parseCustos(etapa) {
		var custos = {};
		custos.items = [];
		custos.casos = [];

		$(etapa).find('custos default custo').each(function(index, item) {
			var custo = {descricao: $(item).find('descricao').html(), valor: $(item).find('valor').html() };
			custos.items.push(custo);
		});

		$(etapa).find('custos caso').each(function(index, caso) {
			var casoObj = { descricao: $(caso).attr('descricao'), items: [] };

			$(caso).find('custo').each(function(index, item) {
				var custoObj = {descricao: $(item).find('descricao').html(), valor: $(item).find('valor').html() }
				casoObj.items.push(custoObj);
			});

			custos.casos.push(casoObj);
		});

		return custos;
	}

	function parseCanaisDePrestacao(etapa) {
		var canaisDePrestacao = {};
		canaisDePrestacao.items = [];
		canaisDePrestacao.casos = [];

		$(etapa).find("canais-de-prestacao default canal-de-prestacao").each(function(index, item) {
			canaisDePrestacao.items.push({ 'tipo': $(item).attr('tipo'), 'descricao': $(item).find('descricao').html() });
		});

		$(etapa).find('canais-de-prestacao caso').each(function(index, caso) {
			var casoObj = { descricao: $(caso).attr('descricao'), items: [] };

			$(caso).find('canal-de-prestacao').each(function(index, item) {
				var canalDePrestacaoObj = {tipo: $(item).attr('tipo'), descricao: $(item).find('descricao').html() }
				casoObj.items.push(canalDePrestacaoObj);
			});

			canaisDePrestacao.casos.push(casoObj);
		});

		return canaisDePrestacao;
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

	function parseXml(data) {
		xmlDoc = $.parseXML(data);

	  returnObject.nome = parseNome(xmlDoc);
		returnObject.descricao = parseDescricao(xmlDoc);
		returnObject.canaisDePrestacao = parseCanaisDePrestacao(xmlDoc);

		// segmentosDaSociedade = '';
		// areasDeInteresse = parseAreasDeInteresse();
	 //  canaisDePrestacao = parseCanalDePrestacao();
	 //  orgao = parseOrgao();

	  console.log(returnObject);
	  return returnObject;
	}

	return {
		parseXml: parseXml,
		parseNome: parseNome,
		parseDescricao: parseDescricao,
		parseCanaisDePrestacao: parseCanaisDePrestacao,
		parseEtapas: parseEtapas
	}
};