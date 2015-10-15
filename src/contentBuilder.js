function ContentBuilder (servicoObject) {
	var servico = servicoObject,
		docContent = [],
		api = {},
		parseHtml = new ParseHtml();

	function addContent(content) {
		docContent.push(content);
	}

	function addNewLine () {
		addContent('\n');
	}

	buildNome = function () {
		addContent({ text: servico.nome + ' (' + servico.sigla + ')', style: 'header' });
		addNewLine();
	};

	buildDescricao = function () {
		addContent({ text: 'O QUE É?', style: 'subheader' });
		addNewLine();
		addContent({ text: servico.descricao, style: 'paragraph', margin: [ 40, 0, 20, 15 ] });
		addNewLine();
	};

	buildSolicitantes = function () {
		addContent({ text: 'Quem pode utilizar este serviço?', style: 'subheader' });
		addNewLine();

		$(servico.solicitantes).each(function(index, solicitante) {
			addContent({ text: solicitante.tipo , style: 'thirdheader' });
			addContent({ text: solicitante.requisitos , style: 'paragraph', margin: [ 40, 0, 20, 15 ] });
			addNewLine();
		});
	};

	buildTempoTotalEstimado = function () {
		addContent({ text: 'QUANTO TEMPO LEVA?', style: 'subheader' });
		addNewLine();
		addContent({ text: servico.tempoTotalEstimado.max + ' ' + servico.tempoTotalEstimado.unidade, style: 'paragraph', margin: [ 40, 0, 40, 15 ] });
		addNewLine();
	};

	buildLegislacoes = function () {
		var content = [];
		var textoHtml = markdown.toHTML(servico.legislacoes[0]);

		addContent({ text: 'LEGISLAÇÃO', style: 'subheader' });
		addNewLine();

		parseHtml.parseHtml(content, textoHtml);
		docContent = docContent.concat(content);
		addNewLine();
	};

	buildNomesPopulares = function () {
		addContent({ text: 'Você também pode conhecer este serviço como: ' + servico.nomesPopulares.join(', ') + '.', style: 'paragraph', margin: [ 40, 0, 100, 15 ] });
		addNewLine();
	};

	buildGratuidade = function () {
		addContent({ text: servico.gratuito ? 'Este serviço é gratuito para o cidadão.' : '', style: 'paragraph', margin: [ 40, 0, 100, 15 ] });
	};

	buildOutrasInformacoes = function () {
		addContent({ text: 'OUTRAS INFORMAÇÕES', style: 'subheader' });
		addNewLine();
		buildNomesPopulares();
		buildGratuidade();
	};

	function buildEtapa(index, etapa) {
		addContent({ text: 'Etapa ' + (index + 1) + ' - ' + etapa.titulo, style: 'thirdheader' });
		addNewLine();
		addContent({ text: etapa.descricao, style: 'paragraph', margin: [ 40, 0, 100, 15 ] });
		addNewLine();

		if(etapa.documentos.items.length > 0) { buildDocumentos(etapa.documentos); }
		if(etapa.custos.items.length > 0) { buildCustos(etapa.custos); }
		if(etapa.canaisDePrestacao.items.length > 0) { buildCanais(etapa.canaisDePrestacao); }
	}

	function buildDocumentos (documentos) {
		addContent({ text: 'Documentos necessários para esta etapa:', style: 'thirdheader' });
		addNewLine();

		var documentosDoc = [];

		documentosDoc.push({ text: 'Documentação comum para todos', style: 'thirdheaderTable' });
		documentosDoc.push({ ul: documentos.items, style: 'list' });
		documentosDoc.push('\n');

		$(documentos.casos).each(function(index, caso) {
			documentosDoc.push({ text: caso.descricao, style: 'thirdheaderTable' });
			documentosDoc.push({ ul: caso.items, style: 'list' });
		});

		buildTable(documentosDoc);
	}

	function buildCustos (custos) {
		addContent({ text: 'Custos para esta etapa:', style: 'thirdheader' });
		addNewLine();

		var custosDoc = [];

		custosDoc.push({ text: 'Custos padrão', style: 'thirdheaderTable' });

		$(custos.items).each(function(index, custo) {
			custosDoc.push({ ul: [ custo.descricao + ': ' + custo.valor ], style: 'list' });
		});

		custosDoc.push('\n');

		$(custos.casos).each(function(index, caso) {
			custosDoc.push({ text: caso.descricao, style: 'thirdheaderTable' });
			$(caso.items).each(function(index, custo) {
				custosDoc.push({ ul: [ custo.descricao + ': ' + custo.valor ], style: 'list' });
			});
		});

		buildTable(custosDoc);
	}

	function buildCanais(canais) {
		addContent({ text: 'Canais de comunicação com este serviço:', style: 'thirdheader' });
		addNewLine();

		var canaisDoc = [];

		canaisDoc.push({ text: 'Canais de prestação padrão', style: 'thirdheaderTable' });

		$(canais.items).each(function(index, canal) {
			canaisDoc.push({ ul: [ canal.tipo + ': ' + canal.descricao ], style: 'list' });
		});

		canaisDoc.push('\n');

		$(canais.casos).each(function(index, caso) {
			canaisDoc.push({ text: caso.descricao, style: 'thirdheaderTable' });
			$(caso.items).each(function(index, canal) {
				canaisDoc.push({ ul: [ canal.tipo + ': ' + canal.descricao ], style: 'list' });
			});
		});

		buildTable(canaisDoc);
	}

	function buildTable(documento) {
		addContent({
			style: 'tableExample',
			table: {
				widths: [ '*' ],
				body: [
					[{ stack: documento}]
				]
			},
			layout: {
	            paddingLeft: function(i, node) { return 25; },
	            paddingRight: function(i, node) { return 25; },
	            paddingTop: function(i, node) { return 20; },
	            paddingBottom: function(i, node) { return 20; },
	            hLineWidth: function(i, node) { return 1; },
				vLineWidth: function(i, node) { return 1; },
				hLineColor: function(i, node) { return '#ddd'; },
				vLineColor: function(i, node) { return '#ddd'; },
	        }
		});
	}

	buildEtapas = function () {
		addContent({ text: 'Etapas para a realização desse serviço', style: 'subheader' });
		addNewLine();

		$(servico.etapas).each(function(index, etapa){
			buildEtapa(index, etapa);
		});
	};

	api.buildContent = function () {
		buildNome();
		buildDescricao();
		buildSolicitantes();
		buildEtapas();
		buildTempoTotalEstimado();
		buildLegislacoes();
		buildOutrasInformacoes();

		return docContent;
	};
	return api;
}
