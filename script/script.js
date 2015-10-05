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

$(function() {
 	$('#gerar-pdf').on('click', function() {
 		servicos = {};
		initialDocDefinition();

		var urlServico = $('#url-servico').val();
		
		$.ajax({ 
			method: 'GET',
		  url: 'https://api.github.com/repos/servicosgovbr/cartas-de-servico/contents/cartas-servico/v3/servicos'
		}).then(function(data) {
			var promises = [];

			$(data).each(function(index, file) {
				var promise = $.ajax({ 
					method: 'GET',
				 	url:"https://raw.githubusercontent.com/servicosgovbr/cartas-de-servico/master/cartas-servico/v3/servicos/" + file.name
				});

				promise.then(function(data) {
		    		var parser = new DOMParser();
		    		xmlDoc = parser.parseFromString(data, "text/xml");

		    		var orgaoId;

		    		if (xmlDoc && xmlDoc.getElementsByTagName('orgao')[0]) {
		    			orgaoId = xmlDoc.getElementsByTagName('orgao')[0].getAttribute('id');
		    		} else {
		    			orgaoId = '';
		    		}

		    		if (servicos[orgaoId]) {
		    			servicos[orgaoId].push(data);
		    		} else {
		    			servicos[orgaoId] = [data];
		    		};
				});

				promises.push(promise);
			});

			Q.all(promises).then(function() {
				$(servicos[urlServico]).each(function(index, xmlServico) {
					var servicoParser = new ServicoParser();
					var servicoDocument = servicoParser.parseXml(xmlServico);

					docDefinition.content = docDefinition.content.concat(servicoDocument);
				});
				
				pdfMake.createPdf(docDefinition).open();
			});
		});
	});
});
