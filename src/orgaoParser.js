cartaParaPdf.OrgaoParser = function() {
	var api = {};

	function parseArray(xmlDoc, selector) {
		var values = [];

		$(xmlDoc).find(selector).each(function(index, item) {
			values.push($(item).html());
		});

		return values;
	}

	api.parseNome = function (xmlDoc) {
		return $(xmlDoc).find('nome').text();
	};

	api.parseDescricao = function (xmlDoc) {
		return $(xmlDoc).find('conteudo').html().replace('<!--[CDATA[', '').replace(']]-->', '');
	};

	api.parseXml = function (data) {
		var xmlDoc = $.parseXML(data),
			orgao = {
		  		nome: api.parseNome(xmlDoc),
		  		descricao: api.parseDescricao(xmlDoc),
			};

		return orgao;
	};

	return api;
};
