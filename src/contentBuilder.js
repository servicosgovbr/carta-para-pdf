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

		if(etapa.documentos.items.length > 0) { buildDocumentos(etapa.documentos) };
		if(etapa.custos.items.length > 0) { buildCustos(etapa.custos) };
		if(etapa.canaisDePrestacao.items.length > 0) { buildCanais(etapa.canaisDePrestacao) };
	}

	function buildDocumentos(documentos) {
		docContent.push({ text: 'Documentos necessários para esta etapa:', style: 'thirdheader' });
		addNewLine();
		docContent.push({ ul: documentos.items, style: 'list' });
		addNewLine();

		$(documentos.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1) + ' - ' + caso.descricao, style: 'thirdheader' });
			addNewLine();
			docContent.push({ ul: caso.items, style: 'list' });
			addNewLine();
		});
	}

	function buildCustos(custos) {
		docContent.push({ text: 'Custos para esta etapa:', style: 'thirdheader' });
		addNewLine();
		$(custos.items).each(function(index, custo) {
			docContent.push({ ul: [ custo.descricao + ': ' + custo.valor ], style: 'list' });
		});

		addNewLine();

		$(custos.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1) + ' - ' + caso.descricao, style: 'thirdheader' });
			addNewLine();
			$(caso.items).each(function(index, custo) {
				docContent.push({ ul: [ custo.descricao + ': ' + custo.valor ], style: 'list' });
			});
			addNewLine();
		});
	}

	function buildCanais(canais) {
		docContent.push({ text: 'Canais de comunicação com este serviço:', style: 'thirdheader' });
		addNewLine();
		$(canais.items).each(function(index, canal) {
			docContent.push({ ul: [ canal.tipo + ': ' + canal.descricao ], style: 'list' });
		});
		addNewLine();

		$(canais.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1) + ' - ' + caso.descricao, style: 'thirdheader' });
			addNewLine();
			$(caso.items).each(function(index, canal) {
				docContent.push({ ul: [ canal.tipo + ': ' + canal.descricao ], style: 'list' });
			});
			addNewLine();
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
