var ContentBuilder = function(servicoObject) {
	var docContent = [],
		servico = servicoObject;

	function addNewLine() {
		docContent.push('\n');
	}

	function buildCapaServico() {
		docContent.push({ text: servico.nome, style: 'header', pageBreak: 'after'});
	}

	function buildPrimeiraPagina() {
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

		docContent.push({ text: '', style: 'paragraph', pageBreak: 'after'});
	}

	function buildSegundaPagina() {
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
		docContent.push({ text: 'Etapa ' + (index + 1) + ' - ' + etapa.titulo, style: 'subheader' });
		addNewLine();
		docContent.push({ text: etapa.descricao, style: 'paragraph' });
		addNewLine();
		
		buildDocumentos(etapa.documentos);
		buildCustos(etapa.custos);
		buildCanais(etapa.canaisDePrestacao)
	}

	function buildDocumentos(documentos) {
		docContent.push({ text: 'Quais são os documentos necessários?', style: 'subheader' });
		addNewLine();
		docContent.push({ ul: documentos.items, style: 'list' });
		addNewLine();

		$(documentos.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1), style: 'subheader' });
			addNewLine();
			docContent.push({ text: caso.descricao, style: 'paragraph' });
			addNewLine();
			docContent.push({ text: 'Quais são os documentos necessários para este caso?', style: 'subheader' });
			addNewLine();
			docContent.push({ ul: caso.items, style: 'list' });
			addNewLine();
		});
	}

	function buildCustos(custos) {
		docContent.push({ text: 'Quais são os custos?', style: 'subheader' });
		addNewLine();
		$(custos.items).each(function(index, custo) {
			docContent.push({ text: custo.descricao, style: 'paragraph' });
			docContent.push({ text: custo.valor, style: 'paragraph' });
			addNewLine();
		});

		$(custos.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1), style: 'subheader' });
			addNewLine();
			docContent.push({ text: caso.descricao, style: 'paragraph' });
			addNewLine();
			docContent.push({ text: 'Quais são os custos para este caso?', style: 'subheader' });
			addNewLine();
			$(caso.items).each(function(index, custo) {
				docContent.push({ text: custo.descricao, style: 'paragraph' });
				docContent.push({ text: custo.valor, style: 'paragraph' });
				addNewLine();
			});
		});
	}

	function buildCanais(canais) {
		docContent.push({ text: 'Quais são os canais de prestação?', style: 'subheader' });
		addNewLine();
		$(canais.items).each(function(index, canal) {
			docContent.push({ text: canal.tipo, style: 'paragraph' });
			docContent.push({ text: canal.descricao, style: 'paragraph' });
			addNewLine();
		});

		$(canais.casos).each(function(index, caso) {
			docContent.push({ text: 'Caso ' + (index + 1), style: 'subheader' });
			addNewLine();
			docContent.push({ text: caso.descricao, style: 'paragraph' });
			addNewLine();
			docContent.push({ text: 'Quais são os canais de prestação para este caso?', style: 'subheader' });
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
		buildPrimeiraPagina();
		buildSegundaPagina();

		$(servico.etapas).each(function(index, etapa){
			buildEtapa(index, etapa);
		});

		return docContent;
	}

	return {
		buildContent: buildContent,
		buildCapaServico: buildCapaServico,
		documentContent: docContent
	}
};