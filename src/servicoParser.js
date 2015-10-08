var ServicoParser = function() {
	var segmentosDaSociedade, areasDeInteresse, canaisDePrestacao, orgao, xmlDoc;
	var docContent = [];
	var returnObject = {};

	function parseNome(xmlDoc) {
		return $(xmlDoc).find("nome").html();
	}

	function parseSigla(xmlDoc) {
		return $(xmlDoc).find('sigla').html();
	}

	function parseDescricao(xmlDoc) {
		return $(xmlDoc).find("descricao").html();
	}

	function parseNomesPopulares(xmlDoc) {
		var nomesPopulares = [];

		$(xmlDoc).find("nomes-populares item").each(function(index, item) {
			nomesPopulares.push($(item).html());
		});

		return nomesPopulares;
	}

	function parseSegmentos(xmlDoc) {
		var segmentos = [];

		$(xmlDoc).find("segmentos-da-sociedade item").each(function(index, item) {
			segmentos.push($(item).html());
		});

		return segmentos;	
	} 

	function parsePalavrasChave(xmlDoc) {
		var palavras = [];

		$(xmlDoc).find("palavras-chave item").each(function(index, item) {
			palavras.push($(item).html());
		});

		return palavras;	
	} 

	function parseSolicitantes(xmlDoc) {
		var solicitantes = [];

		$(xmlDoc).find("solicitantes solicitante").each(function(index, item) {
			solicitantes.push({tipo: $(item).find("tipo").html(), requisitos: $(item).find("requisitos").html()});
		});

		return solicitantes;
	}

	function parseLegislacoes(xmlDoc) {
		var legislacoes = [];

		$(xmlDoc).find("legislacoes item").each(function(index, item) {
			legislacoes.push($(item).html());
		});

		return legislacoes;
	}

	function parseTempoTotalEstimado(xmlDoc) {
		return { max: $(xmlDoc).find('tempo-total-estimado ate').attr('max'), unidade: $(xmlDoc).find('tempo-total-estimado ate').attr('unidade'), descricao: $(xmlDoc).find('tempo-total-estimado descricao').html() }
	}

	function parseGratuito(xmlDoc) {
		return $(xmlDoc).find("gratuito").html() !== 'false';
	}

	function parseAreasDeInteresse(xmlDoc) {
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

	function parseOrgao(xmlDoc) {
		return { id: $(xmlDoc).find("orgao").attr('id'), contato: $(xmlDoc).find("orgao contato").html() };
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
	  	returnObject.sigla = parseSigla(xmlDoc);
	  	returnObject.gratuito = parseGratuito(xmlDoc);
	  	returnObject.nomesPopulares = parseNomesPopulares(xmlDoc);
	  	returnObject.segmentos = parseSegmentos(xmlDoc);
	  	returnObject.palavrasChave = parsePalavrasChave(xmlDoc);
	  	returnObject.solicitantes = parseSolicitantes(xmlDoc);
	  	returnObject.areasDeInteresse = parseAreasDeInteresse(xmlDoc);
		returnObject.canaisDePrestacao = parseCanaisDePrestacao(xmlDoc);
		returnObject.tempoTotalEstimado = parseTempoTotalEstimado(xmlDoc);
		returnObject.legislacoes = parseLegislacoes(xmlDoc);
		returnObject.etapas = parseEtapas(xmlDoc);
		returnObject.orgao = parseOrgao(xmlDoc);

		return returnObject;
	}

	return {
		parseXml: parseXml,
		parseNome: parseNome,
		parseDescricao: parseDescricao,
		parseSigla: parseSigla,
		parseGratuito: parseGratuito,
		parseNomesPopulares: parseNomesPopulares,
		parseSegmentos: parseSegmentos,
		parsePalavrasChave: parsePalavrasChave,
		parseSolicitantes: parseSolicitantes,
		parseAreasDeInteresse: parseAreasDeInteresse,
		parseCanaisDePrestacao: parseCanaisDePrestacao,
		parseTempoTotalEstimado: parseTempoTotalEstimado,
		parseLegislacoes: parseLegislacoes,
		parseEtapas: parseEtapas,
		parseOrgao: parseOrgao
	}
};