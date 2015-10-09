var ContentBuilder = function(servicoObject) {
	var docContent = [],
		servico = servicoObject;

	function addNewLine() {
		docContent.push('\n');
	}

	function buildCapaServico() {
		docContent.push({ text: servico.nome, style: 'header', pageBreak: 'after'});
	}

	function buildServicoInfo() {
		docContent.push({ text: 'O que é?', style: 'subheader' });
		addNewLine();
		docContent.push({ text: servicoObject.descricao, style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Como esse serviço é chamado?', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: servicoObject.nomesPopulares, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Este serviço é gratuito?', style: 'subheader' });
		addNewLine();
		docContent.push({ text: servicoObject.gratuito ? 'Sim' : 'Não', style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Quem pode utilizar este serviço?', style: 'subheader' });
		addNewLine();
		$(servicoObject.solicitantes).each(function(index, solicitante) {
			docContent.push({ text: solicitante.tipo , style: 'subheader' });
			docContent.push({ text: solicitante.requisitos , style: 'paragraph' });
			addNewLine();
		});

		docContent.push({ text: '', style: 'paragraph'});
		docContent.push({ text: 'Qual a sigla?', style: 'subheader' });
		addNewLine();
		docContent.push({ text: servicoObject.sigla, style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Quanto tempo demora esse serviço?', style: 'subheader' });
		addNewLine();
		docContent.push({ text: servicoObject.tempoTotalEstimado.max + ' ' + servicoObject.tempoTotalEstimado.unidade, style: 'paragraph' });
		addNewLine();
		docContent.push({ text: 'Para quais segmentos da sociedade esse serviço serve?', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: servicoObject.segmentos, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Quais áreas de interesse?', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: servicoObject.areasDeInteresse, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Quais palavras chaves?', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: servicoObject.palavrasChave, style: 'list' });
		addNewLine();
		docContent.push({ text: 'Quais legislações?', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: servicoObject.legislacoes, style: 'list', pageBreak: 'after' });
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
			docContent.push({ text: custo.descricao + ': ' + custo.valor, style: 'paragraph' });
			addNewLine();
		});

		$(custos.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1) + ' - ' + caso.descricao, style: 'thirdheader' });
			addNewLine();
			$(caso.items).each(function(index, custo) {
				docContent.push({ text: custo.descricao + ': ' + custo.valor, style: 'paragraph' });
				addNewLine();
			});
		});
	}

	function buildCanais(canais) {
		docContent.push({ text: 'Canais de comunicação com este serviço:', style: 'thirdheader' });
		addNewLine();
		$(canais.items).each(function(index, canal) {
			docContent.push({ text: canal.tipo, style: 'paragraph' });
			docContent.push({ text: canal.descricao, style: 'paragraph' });
			addNewLine();
		});

		$(canais.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1) + ' - ' + caso.descricao, style: 'thirdheader' });
			addNewLine();
			$(caso.items).each(function(index, canal) {
				docContent.push({ text: canal.tipo, style: 'paragraph' });
				docContent.push({ text: canal.descricao, style: 'paragraph' });
				addNewLine();
			});
		});
	}

	function buildContent() {
		buildCapaServico();
		buildServicoInfo();

		docContent.push({ text: 'Etapas para a realização desse serviço', style: 'subheader' });
		addNewLine();
		$(servico.etapas).each(function(index, etapa){
			buildEtapa(index, etapa);
		});

		return docContent;
	}

	return {
		buildContent: buildContent,
		buildCapaServico: buildCapaServico,
		documentContent: docContent
	};
};
