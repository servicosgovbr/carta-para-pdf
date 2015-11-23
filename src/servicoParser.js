cartaParaPdf.ServicoParser = function() {
	var api = {};

	function parseArray(xmlDoc, selector) {
		var values = [];

		$(xmlDoc).find(selector).each(function(index, item) {
			values.push($(item).html());
		});

		return values;
	}

	api.parseNome = function (xmlDoc) {
		return $(xmlDoc).find('nome').html();
	};

	api.parseSigla = function (xmlDoc) {
		return $(xmlDoc).find('sigla').html();
	};

	api.parseContato = function (xmlDoc) {
		return $(xmlDoc).find('contato').html();
	}

	api.parseDescricao = function (xmlDoc) {
		return $(xmlDoc).find('descricao').html();
	};

	api.parseNomesPopulares = function (xmlDoc) {
		return parseArray(xmlDoc, 'nomes-populares item');
	};

	api.parseSegmentos = function (xmlDoc) {
		return parseArray(xmlDoc, 'segmentos-da-sociedade item');
	};

	api.parsePalavrasChave = function (xmlDoc) {
		return parseArray(xmlDoc, 'palavras-chave item');
	};

	api.parseLegislacoes = function (xmlDoc) {
		return parseArray(xmlDoc, 'legislacoes item');
	};

	api.parseAreasDeInteresse = function (xmlDoc) {
		return parseArray(xmlDoc, 'areas-de-interesse item');
	};

	api.parseSolicitantes = function (xmlDoc) {
		var solicitantes = [];

		$(xmlDoc).find('solicitantes solicitante').each(function(index, item) {
			solicitantes.push({
				tipo: $(item).find('tipo').html(),
				requisitos: $(item).find('requisitos').html()
			});
		});

		return solicitantes;
	};

	api.parseTempoTotalEstimado = function (xmlDoc) {
		return {
			min: $(xmlDoc).find('tempo-total-estimado').children(0).attr('min'),
			max: $(xmlDoc).find('tempo-total-estimado').children(0).attr('max'),
			unidade: $(xmlDoc).find('tempo-total-estimado').children(0).attr('unidade'),
			descricao: $(xmlDoc).find('tempo-total-estimado descricao').html()
		};
	};

	api.parseGratuito = function (xmlDoc) {
		return $(xmlDoc).find('gratuito').html() !== 'false';
	};

	api.parseDocumentos = function (etapa) {
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
	};

	api.parseEtapas = function (xmlDoc) {
		var etapas = [];

		$(xmlDoc).find('etapa').each(function(index, etapa) {
			etapas.push({
				titulo: $(etapa).find('titulo').html(),
				descricao: $(etapa).find('descricao').html(),
				documentos: api.parseDocumentos(etapa),
				custos: api.parseCustos(etapa),
				canaisDePrestacao: api.parseCanaisDePrestacao(etapa)
			});
		});

		return etapas;
	};

	api.parseCustos = function (etapa) {
		var custos = {};
		custos.items = [];
		custos.casos = [];

		$(etapa).find('custos default custo').each(function(index, item) {
			var custo = {
				descricao: $(item).find('descricao').html(),
				valor: $(item).find('valor').html()
			};
			custos.items.push(custo);
		});

		$(etapa).find('custos caso').each(function(index, caso) {
			var casoObj = { descricao: $(caso).attr('descricao'), items: [] };

			$(caso).find('custo').each(function(index, item) {
				var custoObj = {
					descricao: $(item).find('descricao').html(),
					valor: $(item).find('valor').html()
				};
				casoObj.items.push(custoObj);
			});

			custos.casos.push(casoObj);
		});

		return custos;
	};

	api.parseCanaisDePrestacao = function (etapa) {
		var canaisDePrestacao = {};
		canaisDePrestacao.items = [];
		canaisDePrestacao.casos = [];

		$(etapa).find('canais-de-prestacao default canal-de-prestacao').each(function(index, item) {
			canaisDePrestacao.items.push({
				tipo: $(item).attr('tipo'),
				descricao: $(item).find('descricao').html()
			});
		});

		$(etapa).find('canais-de-prestacao caso').each(function(index, caso) {
			var casoObj = { descricao: $(caso).attr('descricao'), items: [] };

			$(caso).find('canal-de-prestacao').each(function(index, item) {
				var canalDePrestacaoObj = {
					tipo: $(item).attr('tipo'),
					descricao: $(item).find('descricao').html()
				};
				casoObj.items.push(canalDePrestacaoObj);
			});

			canaisDePrestacao.casos.push(casoObj);
		});

		return canaisDePrestacao;
	};

	api.parseOrgao = function (xmlDoc) {
		return {
			id: $(xmlDoc).find('orgao').attr('id')
		};
	};

	api.parseXml = function (data) {
		var xmlDoc = $.parseXML(data),
			servico = {
		  		nome: api.parseNome(xmlDoc),
		  		descricao: api.parseDescricao(xmlDoc),
		  		contato: api.parseContato(xmlDoc),
			  	sigla: api.parseSigla(xmlDoc),
			  	gratuito: api.parseGratuito(xmlDoc),
			  	nomesPopulares: api.parseNomesPopulares(xmlDoc),
			  	segmentos: api.parseSegmentos(xmlDoc),
			  	palavrasChave: api.parsePalavrasChave(xmlDoc),
			  	solicitantes: api.parseSolicitantes(xmlDoc),
			  	areasDeInteresse: api.parseAreasDeInteresse(xmlDoc),
				canaisDePrestacao: api.parseCanaisDePrestacao(xmlDoc),
				tempoTotalEstimado: api.parseTempoTotalEstimado(xmlDoc),
				legislacoes: api.parseLegislacoes(xmlDoc),
				etapas: api.parseEtapas(xmlDoc),
				orgao: api.parseOrgao(xmlDoc)
			};

		return servico;
	};

	return api;
};