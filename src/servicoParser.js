function ServicoParser() {
}

ServicoParser.prototype.parseNome = function (xmlDoc) {
	return $(xmlDoc).find('nome').html();
};

ServicoParser.prototype.parseArray = function (xmlDoc, selector) {
	var values = [];

	$(xmlDoc).find(selector).each(function(index, item) {
		values.push($(item).html());
	});

	return values;
};

ServicoParser.prototype.parseSigla = function (xmlDoc) {
	return $(xmlDoc).find('sigla').html();
};

ServicoParser.prototype.parseDescricao = function (xmlDoc) {
	return $(xmlDoc).find('descricao').html();
};

ServicoParser.prototype.parseNomesPopulares = function (xmlDoc) {
	return this.parseArray(xmlDoc, 'nomes-populares item');
};

ServicoParser.prototype.parseSegmentos = function (xmlDoc) {
	return this.parseArray(xmlDoc, 'segmentos-da-sociedade item');
};

ServicoParser.prototype.parsePalavrasChave = function (xmlDoc) {
	return this.parseArray(xmlDoc, 'palavras-chave item');
};

ServicoParser.prototype.parseLegislacoes = function (xmlDoc) {
	return this.parseArray(xmlDoc, 'legislacoes item');
};

ServicoParser.prototype.parseAreasDeInteresse = function (xmlDoc) {
	return this.parseArray(xmlDoc, 'areas-de-interesse item');
};

ServicoParser.prototype.parseSolicitantes = function (xmlDoc) {
	var solicitantes = [];

	$(xmlDoc).find('solicitantes solicitante').each(function(index, item) {
		solicitantes.push({
			tipo: $(item).find('tipo').html(),
			requisitos: $(item).find('requisitos').html()
		});
	});

	return solicitantes;
};

ServicoParser.prototype.parseTempoTotalEstimado = function (xmlDoc) {
	return {
		max: $(xmlDoc).find('tempo-total-estimado ate').attr('max'),
		unidade: $(xmlDoc).find('tempo-total-estimado ate').attr('unidade'),
		descricao: $(xmlDoc).find('tempo-total-estimado descricao').html()
	};
};

ServicoParser.prototype.parseGratuito = function (xmlDoc) {
	return $(xmlDoc).find('gratuito').html() !== 'false';
};

ServicoParser.prototype.parseDocumentos = function (etapa) {
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

ServicoParser.prototype.parseEtapas = function (xmlDoc) {
	var etapas = [],
		parser = this;

	$(xmlDoc).find('etapa').each(function(index, etapa) {
		etapas.push({
			titulo: $(etapa).find('titulo').html(),
			descricao: $(etapa).find('descricao').html(),
			documentos: parser.parseDocumentos(etapa),
			custos: parser.parseCustos(etapa),
			canaisDePrestacao: parser.parseCanaisDePrestacao(etapa)
		});
	});

	return etapas;
};

ServicoParser.prototype.parseCustos = function (etapa) {
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

ServicoParser.prototype.parseCanaisDePrestacao = function (etapa) {
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

ServicoParser.prototype.parseOrgao = function (xmlDoc) {
	return {
		id: $(xmlDoc).find('orgao').attr('id'),
		contato: $(xmlDoc).find('orgao contato').html()
	};
};

ServicoParser.prototype.parseXml = function (data) {
	var xmlDoc = $.parseXML(data),
		servico = {
	  		nome: this.parseNome(xmlDoc),
	  		descricao: this.parseDescricao(xmlDoc),
		  	sigla: this.parseSigla(xmlDoc),
		  	gratuito: this.parseGratuito(xmlDoc),
		  	nomesPopulares: this.parseNomesPopulares(xmlDoc),
		  	segmentos: this.parseSegmentos(xmlDoc),
		  	palavrasChave: this.parsePalavrasChave(xmlDoc),
		  	solicitantes: this.parseSolicitantes(xmlDoc),
		  	areasDeInteresse: this.parseAreasDeInteresse(xmlDoc),
			canaisDePrestacao: this.parseCanaisDePrestacao(xmlDoc),
			tempoTotalEstimado: this.parseTempoTotalEstimado(xmlDoc),
			legislacoes: this.parseLegislacoes(xmlDoc),
			etapas: this.parseEtapas(xmlDoc),
			orgao: this.parseOrgao(xmlDoc)
		};

	return servico;
};
