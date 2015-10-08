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
		docContent.push({ ul: servicoObject.legislacoes, style: 'list' });
		addNewLine();
	}

	function buildContent() {
		buildCapaServico();
		buildPrimeiraPagina();
		buildSegundaPagina();

		return docContent;
	}

	return {
		buildContent: buildContent,
		buildCapaServico: buildCapaServico,
		documentContent: docContent
	}
};