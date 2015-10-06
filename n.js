var request = require('request-promise');
var xmldoc = require('xmldoc');
var Q = require('q');

function autoParse (body, response) {
  if (/application\/json */.test(response.headers['content-type'])) {
      return JSON.parse(body);
  } else {
   	return new xmldoc.XmlDocument(body);
  }
}

function criarOptions (url) {
	var options = {
	  url: url,
	  headers: {
	    'User-Agent': 'request'
	  },
	  transform: autoParse
	};

	return options;
}

function ehServico (nomeArquivo) {
	var regexArquivo = /.*\.xml/;
	return regexArquivo.test(nomeArquivo);
}

function servicoURL (nomeServico) {
	var urlBase = 'https://raw.githubusercontent.com/servicosgovbr/cartas-de-servico/master/cartas-servico/v3/servicos/';
	return urlBase + nomeServico;
}

function servicosURL (arquivos) {
	var servicos = [];

	arquivos.forEach(function (arquivo) {
		if (ehServico(arquivo.name)) {
			servicos.push(servicoURL(arquivo.name));
		}
	});

	return servicos;
}

function orgaoId (xml) {
	return xml.childNamed('orgao').attr.id;
}

function adicionaServico (xml, servicos) {
	var xmlData = xml.toString({compressed:true});
	var orgao = orgaoId(xml);

	if (servicos[orgao]) {
   	servicos[orgao].push(xmlData);
   } else {
    servicos[orgao] = [xmlData];
   }
}

function gerarCarta (orgaoId) {
	var promises = [], 
		promise = null,
		urlServicos = null,
		servicos = {};

	request.get(criarOptions('https://api.github.com/repos/servicosgovbr/cartas-de-servico/contents/cartas-servico/v3/servicos'))
		.then(function(jsonData) {
			urlServicos = servicosURL(jsonData);

			urlServicos.forEach(function (urlServico) {
				promise = request.get(criarOptions(urlServico)).then(function (xml) {
					adicionaServico(xml, servicos);
				});
				promises.push(promise);
			});

			Q.allSettled(promises).then(function () {
				console.log(servicos[orgaoId]);
			});
		});
}

(function () {
	orgao = 'http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/1930';
	gerarCarta(orgao);
})();