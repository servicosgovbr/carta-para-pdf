var ServicoParser = function() {
	var xmlDoc;
	var returnObject = {};

	function parseNome(xmlDoc) {
		return $(xmlDoc).find("nome").html();
	}

	function parseArray(xmlDoc, selector) {
		var values = [];

		$(xmlDoc).find(selector).each(function(index, item) {
			values.push($(item).html());
		});

		return values;
	}

	function parseSigla(xmlDoc) {
		return $(xmlDoc).find('sigla').html();
	}

	function parseDescricao(xmlDoc) {
		return $(xmlDoc).find("descricao").html();
	}

	function parseNomesPopulares(xmlDoc) {
		return parseArray(xmlDoc, "nomes-populares item");
	}

	function parseSegmentos(xmlDoc) {
		return parseArray(xmlDoc, "segmentos-da-sociedade item");
	} 

	function parsePalavrasChave(xmlDoc) {
		return parseArray(xmlDoc, "palavras-chave item");
	} 

	function parseLegislacoes(xmlDoc) {
		return parseArray(xmlDoc, "legislacoes item");
	}

	function parseAreasDeInteresse(xmlDoc) {
		return parseArray(xmlDoc, "areas-de-interesse item");
	}

	function parseSolicitantes(xmlDoc) {
		var solicitantes = [];

		$(xmlDoc).find("solicitantes solicitante").each(function(index, item) {
			solicitantes.push({tipo: $(item).find("tipo").html(), requisitos: $(item).find("requisitos").html()});
		});

		return solicitantes;
	}

	function parseTempoTotalEstimado(xmlDoc) {
		return { max: $(xmlDoc).find('tempo-total-estimado ate').attr('max'), unidade: $(xmlDoc).find('tempo-total-estimado ate').attr('unidade'), descricao: $(xmlDoc).find('tempo-total-estimado descricao').html() }
	}

	function parseGratuito(xmlDoc) {
		return $(xmlDoc).find("gratuito").html() !== 'false';
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