var xmlDoc;
var servicos = [
	'banco-internacional-de-objetos-educacionais.xml',
	'ciencia-sem-fronteiras.xml',
	'dominio-publico-biblioteca-digital.xml',
	'enem-exame-nacional-do-ensino-medio.xml',
	'portal-do-professor.xml',
	'programa-de-financiamento-estudantil-fies.xml',
	'pronatec-programa-nacional-de-acesso-ao-ensino-profissional-e-emprego.xml',
	'prouni-programa-universidade-para-todos.xml',
	'sisu-sistema-de-selecao-unificada.xml',
	'sisutec-sistema-de-selecao-unificada-da-educacao-profissional-e-tecnologica.xml',
	'tv-escola.xml'
]

$(function() {
 	$('#gerar-pdf').on('click', function() {
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
		
		var promises = [];

		docDefinition.content.push('\n');
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'Carta do serviço', style: 'title', alignment: 'center'});
		docDefinition.content.push('\n');
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'Ministério da educação MEC', style: 'header', pageBreak: 'after', alignment: 'center'});

 		for (i = 0; i < servicos.length; i++) {
			var promise = $.ajax({ 
				method: 'GET',
			 	url:"https://raw.githubusercontent.com/servicosgovbr/cartas-de-servico/master/cartas-servico/v3/servicos/" + servicos[i]
			});

			promise.then(function(data) {
	    		var servicoParser = new ServicoParser();
	    		var servicoDocument = servicoParser.parseXml(data);

	    		docDefinition.content = docDefinition.content.concat(servicoDocument);
			});

			promises.push(promise);
		}

		Q.all(promises).then(function() {
			pdfMake.createPdf(docDefinition).open();
		});
	});
});
