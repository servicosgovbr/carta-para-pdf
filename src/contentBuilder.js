var ContentBuilder = function(servicoObject) {
	var docContent = [],
		servico = servicoObject;

	function addNewLine() {
		docContent.push('\n');
	}

	function buildServicoInfo() {
		docContent.push({ text: servico.nome + ' (' + servicoObject.sigla + ')' , style: 'header' });
		addNewLine();
		docContent.push({ text: 'O que é?', style: 'subheader' });
		addNewLine();
		docContent.push({ text: servicoObject.descricao, style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Quem pode utilizar este serviço?', style: 'subheader' });
		addNewLine();

		$(servicoObject.solicitantes).each(function(index, solicitante) {
			docContent.push({ text: solicitante.tipo , style: 'thirdheader' });
			docContent.push({ text: solicitante.requisitos , style: 'paragraph' });
			addNewLine();
		});

		docContent.push({ text: '', style: 'paragraph', pageBreak: 'after' });
	}

	function buildFooter() {
		docContent.push({ text: 'Quanto tempo leva?', style: 'subheader' });
		addNewLine();
		docContent.push({ text: servicoObject.tempoTotalEstimado.max + ' ' + servicoObject.tempoTotalEstimado.unidade, style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Legislação', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: servicoObject.legislacoes, style: 'list' });
		addNewLine();
	}

	function buildOutrasInformacoes() {
		docContent.push({ text: 'Outras informações', style: 'subheader' });
		addNewLine();
		docContent.push({ text: 'Você também pode conhecer este serviço como: ' + servicoObject.nomesPopulares.join(', ') + '.', style: 'paragraph' });
		addNewLine();
		docContent.push({ text: servicoObject.gratuito ? 'Este serviço é gratuito para o cidadão.' : '', style: 'paragraph' });
	}

	function buildEtapa(index, etapa) {
		docContent.push({ text: (index + 1) + ' ' + etapa.titulo, style: 'thirdheader' });
		addNewLine();
		docContent.push({ text: etapa.descricao, style: 'paragraph' });
		addNewLine();

		if(etapa.documentos.items.length > 0) { buildDocumentos(etapa.documentos); }
		if(etapa.custos.items.length > 0) { buildCustos(etapa.custos); }
		if(etapa.canaisDePrestacao.items.length > 0) { buildCanais(etapa.canaisDePrestacao); }
	}

	function buildDocumentos(documentos) {
		docContent.push({ text: 'Documentos necessários para esta etapa:', style: 'thirdheader' });
		addNewLine();

		var documentosDoc = [];

		documentosDoc.push({ text: 'Documentação comum para todos', style: 'thirdheader' });
		documentosDoc.push({ ul: documentos.items, style: 'list' });
		documentosDoc.push('\n');

		$(documentos.casos).each(function(index, caso) {
			documentosDoc.push({ text: caso.descricao, style: 'thirdheader' });
			documentosDoc.push({ ul: caso.items, style: 'list' });
		});

		docContent.push({
			style: 'tableExample',
			table: {
				body: [
					[{ stack: documentosDoc}]
				]
			},
			layout: {
                paddingLeft: function(i, node) { return 10; },
                paddingRight: function(i, node) { return 10; },
                paddingTop: function(i, node) { return 10; },
                paddingBottom: function(i, node) { return 10; }
            }
		});
	}

	function buildCustos(custos) {
		docContent.push({ text: 'Custos para esta etapa:', style: 'thirdheader' });
		addNewLine();

		var custosDoc = [];

		custosDoc.push({ text: 'Custos padrão', style: 'thirdheader' });

		$(custos.items).each(function(index, custo) {
			custosDoc.push({ ul: [ custo.descricao + ': ' + custo.valor ], style: 'list' });
		});

		custosDoc.push('\n');

		$(custos.casos).each(function(index, caso) {
			custosDoc.push({ text: caso.descricao, style: 'thirdheader' });
			$(caso.items).each(function(index, custo) {
				custosDoc.push({ ul: [ custo.descricao + ': ' + custo.valor ], style: 'list' });
			});
		});

		docContent.push({
			style: 'tableExample',
			table: {
				body: [
					[{ stack: custosDoc}]
				]
			},
			layout: {
                paddingLeft: function(i, node) { return 10; },
                paddingRight: function(i, node) { return 10; },
                paddingTop: function(i, node) { return 10; },
                paddingBottom: function(i, node) { return 10; }
            }
		});
	}

	function buildCanais(canais) {
		docContent.push({ text: 'Canais de comunicação com este serviço:', style: 'thirdheader' });
		addNewLine();

		var canaisDoc = [];

		canaisDoc.push({ text: 'Canais de prestação padrão', style: 'thirdheader' });

		$(canais.items).each(function(index, canal) {
			canaisDoc.push({ ul: [ canal.tipo + ': ' + canal.descricao ], style: 'list' });
		});

		canaisDoc.push('\n');

		$(canais.casos).each(function(index, caso) {
			canaisDoc.push({ text: caso.descricao, style: 'thirdheader' });
			$(caso.items).each(function(index, canal) {
				canaisDoc.push({ ul: [ canal.tipo + ': ' + canal.descricao ], style: 'list' });
			});
		});

		docContent.push({
			style: 'tableExample',
			table: {
				body: [
					[{ stack: canaisDoc}]
				]
			},
			layout: {
                paddingLeft: function(i, node) { return 10; },
                paddingRight: function(i, node) { return 10; },
                paddingTop: function(i, node) { return 10; },
                paddingBottom: function(i, node) { return 10; }
            }
		});
	}

	function buildContent() {
		buildServicoInfo();

		docContent.push({ text: 'Etapas para a realização desse serviço', style: 'subheader' });
		addNewLine();

		$(servico.etapas).each(function(index, etapa){
			buildEtapa(index, etapa);
		});

		buildFooter();
		buildOutrasInformacoes();

		return docContent;
	}

	return {
		buildContent: buildContent,
		documentContent: docContent
	};
};
