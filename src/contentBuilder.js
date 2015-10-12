function ContentBuilder (servico) {
	this.servico = servico;
	this.docContent = [];
	this.parseHtml = new ParseHtml();
}

ContentBuilder.prototype.addContent = function (content) {
	this.docContent.push(content);
};

ContentBuilder.prototype.addNewLine = function () {
	this.addContent('\n');
};

ContentBuilder.prototype.buildNomeServico = function () {
	this.addContent({ text: this.servico.nome + ' (' + this.servico.sigla + ')', style: 'header' });
	this.addNewLine();
};

ContentBuilder.prototype.buildServicoInfo = function () {
	var builder = this;

	this.buildNomeServico();
	this.addContent({ text: 'O que é?', style: 'subheader' });
	this.addNewLine();
	this.addContent({ text: this.servico.descricao, style: 'paragraph' });
	this.addNewLine();
	this.addContent({ text: 'Quem pode utilizar este serviço?', style: 'subheader' });
	this.addNewLine();

	$(this.servico.solicitantes).each(function(index, solicitante) {
		builder.addContent({ text: solicitante.tipo , style: 'thirdheader' });
		builder.addContent({ text: solicitante.requisitos , style: 'paragraph' });
		builder.addNewLine();
	});

	this.addContent({ text: '', style: 'paragraph', pageBreak: 'after' });
};

ContentBuilder.prototype.buildFooter = function () {
	this.addContent({ text: 'Quanto tempo leva?', style: 'subheader' });
	this.addNewLine();
	this.addContent({ text: this.servico.tempoTotalEstimado.max + ' ' + this.servico.tempoTotalEstimado.unidade, style: 'paragraph' });
	this.addNewLine();
	this.addContent({ text: 'Legislação', style: 'subheader' });
	this.addNewLine();

	var content = [];
	var simpleHtm = markdown.toHTML(this.servico.legislacoes[0]);

	this.parseHtml.parseHtml(content, simpleHtm);
	this.docContent = this.docContent.concat(content);
	this.addNewLine();
};

ContentBuilder.prototype.buildOutrasInformacoes = function () {
	this.addContent({ text: 'Outras informações', style: 'subheader' });
	this.addNewLine();
	this.addContent({ text: 'Você também pode conhecer este serviço como: ' + this.servico.nomesPopulares.join(', ') + '.', style: 'paragraph' });
	this.addNewLine();
	this.addContent({ text: this.servico.gratuito ? 'Este serviço é gratuito para o cidadão.' : '', style: 'paragraph' });
};

ContentBuilder.prototype.buildEtapa = function (index, etapa) {
	this.addContent({ text: 'Etapa ' + (index + 1) + ' - ' + etapa.titulo, style: 'thirdheader' });
	this.addNewLine();
	this.addContent({ text: etapa.descricao, style: 'paragraph' });
	this.addNewLine();

	if(etapa.documentos.items.length > 0) { this.buildDocumentos(etapa.documentos); }
	if(etapa.custos.items.length > 0) { this.buildCustos(etapa.custos); }
	if(etapa.canaisDePrestacao.items.length > 0) { this.buildCanais(etapa.canaisDePrestacao); }
};

ContentBuilder.prototype.buildDocumentos = function (documentos) {
	this.addContent({ text: 'Documentos necessários para esta etapa:', style: 'thirdheader' });
	this.addNewLine();

	var documentosDoc = [];

	documentosDoc.push({ text: 'Documentação comum para todos', style: 'thirdheader' });
	documentosDoc.push({ ul: documentos.items, style: 'list' });
	documentosDoc.push('\n');

	$(documentos.casos).each(function(index, caso) {
		documentosDoc.push({ text: caso.descricao, style: 'thirdheader' });
		documentosDoc.push({ ul: caso.items, style: 'list' });
	});

	this.addContent({
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
};

ContentBuilder.prototype.buildCustos = function (custos) {
	this.addContent({ text: 'Custos para esta etapa:', style: 'thirdheader' });
	this.addNewLine();

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

	this.addContent({
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
};

ContentBuilder.prototype.buildCanais = function (canais) {
	this.addContent({ text: 'Canais de comunicação com este serviço:', style: 'thirdheader' });
	this.addNewLine();

	var canaisDoc = [];

	this.addContent({ text: 'Canais de prestação padrão', style: 'thirdheader' });

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

	this.addContent({
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
};

ContentBuilder.prototype.buildContent = function () {
	var builder = this;
	this.buildServicoInfo();

	this.addContent({ text: 'Etapas para a realização desse serviço', style: 'subheader' });
	this.addNewLine();

	$(this.servico.etapas).each(function(index, etapa){
		builder.buildEtapa(index, etapa);
	});

	this.buildFooter();
	this.buildOutrasInformacoes();

	return this.docContent;
};
