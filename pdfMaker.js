var servicoParser = require("./servicoParser.js");
var Q = require('q');
var pdfMake = require('pdfmake');
var request = require('request-promise');
var $ = require('jquery');
var GitHubApi = require("github");


var xmlDoc;
var servicos = {};

var docDefinition = {
	content: [],
	styles: {
	title: {
       fontSize: 30,
       bold: true,
       color: '#2c66ce'
     },
     header: {
       fontSize: 22,
       bold: true
     },
     subheader: {
       fontSize: 18,
       bold: true
     },
     list: {
     	fontSize: 14,
     	blod: true
     },
     paragraph: {
     	fontSize: 16
     }
   }
};

var initialDocDefinition = function() {	
	docDefinition.content.push('\n');
	docDefinition.content.push('\n');
	docDefinition.content.push({ text: 'Carta do serviço', style: 'title', alignment: 'center'});
	docDefinition.content.push('\n');
	docDefinition.content.push('\n');
	docDefinition.content.push({ text: 'Ministério da educação MEC', style: 'header', pageBreak: 'after', alignment: 'center'});
}

exports.generatePdf = function() {
	servicos = {};
	initialDocDefinition();

	var urlServico = 'http://estruturaorganizacional.dados.gov.br/id/unidade-organizacional/1930';

	var github = new GitHubApi({
	    version: "3.0.0",
	    debug: true,
	    protocol: "https",
	    host: "api.github.com",
	    timeout: 5000,
	    headers: {
	        "user-agent": "carta-para-pdf"
	    }
	});

	// github.authenticate({
	//     type: "basic",
	//     username: '',
	//     password: ''
	// });

	github.repos.getContent({
	    user: "servicosgovbr",
	    repo: "cartas-de-servico",
	    path: "cartas-servico/v3/servicos"
	}, function(err, data) {
	    var promises = [];

	    console.log('caiu aqui ');
		for (var index in data) {
			console.log("cartas-servico/v3/servicos/" + data[index].name);

			github.repos.getContent({
			    user: "servicosgovbr",
			    repo: "cartas-de-servico",
			    path: "cartas-servico/v3/servicos/" + data[index].name
			}, function(error, data) {
				var content = new Buffer(data.content, 'base64').toString("ascii");
				console.log(content);
			});

			promise.then(function(error, data) {
				var content = new Buffer(data.content, 'base64').toString("ascii");

				console.log(content);

	    		xmlDoc = $.parseXML(content);

	    		var orgaoId = $(xmlDoc).find("orgao").attr('id');

	    		if (servicos[orgaoId]) {
	    			servicos[orgaoId].push(content);
	    		} else {
	    			servicos[orgaoId] = [content];
	    		};
			});

			promises.push(promise);
		};

		Q.all(promises).then(function() {
			$(servicos[urlServico]).each(function(index, xmlServico) {
				servicoParser.parseXml(xmlServico);

				docDefinition.content = docDefinition.content.concat(servicoDocument);
			});
			
			//pdfMake.createPdf(docDefinition).open();
		});
	});
};