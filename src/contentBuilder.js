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
	}

	function buildContent() {
		buildCapaServico();
		buildPrimeiraPagina();

		return docContent;
	}

	return {
		buildContent: buildContent,
		buildCapaServico: buildCapaServico,
		documentContent: docContent
	}
};