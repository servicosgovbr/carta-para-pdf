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
	    		var parser = new DOMParser();
	    		xmlDoc = parser.parseFromString(data, "text/xml");

	    		var nome = xmlDoc.getElementsByTagName("nome")[0].childNodes[0].nodeValue;
				var descricao = xmlDoc.getElementsByTagName("descricao")[0].childNodes[0].nodeValue;
				//var segmentosDaSociedade = xmlDoc.getElementsByTagName('segmentos-da-sociedade')[0].childNodes[1].childNodes[0].nodeValue;
				var segmentosDaSociedade = '';
				var areasDeInteresse = xmlDoc.getElementsByTagName('areas-de-interesse')[0].childNodes[1].childNodes[0].nodeValue;
	            var canalDePrestacao = xmlDoc.getElementsByTagName('canais-de-prestacao')[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].nodeValue;
	            var tipoCanalDePrestacao = xmlDoc.getElementsByTagName('canais-de-prestacao')[0].childNodes[1].childNodes[1].getAttribute('tipo');
	            var orgao = xmlDoc.getElementsByTagName('orgao')[0].getAttribute('id');

				docDefinition.content.push({ text: nome, style: 'header'});
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: descricao, style: 'paragraph' });
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: 'Etapas para a realização deste serviço', style: 'subheader' });
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: 'Etapa 1', style: 'subheader' });
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: 'Canais de Prestação', style: 'subheader'});
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: tipoCanalDePrestacao + ' - ' + canalDePrestacao, style: 'list' });
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: 'Segmentos da Sociedade', style: 'subheader'});
				docDefinition.content.push('\n');
				docDefinition.content.push({ ul: [ segmentosDaSociedade ], style: 'list' });
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: 'Áreas de Interesse', style: 'subheader'});
				docDefinition.content.push('\n');
				docDefinition.content.push({ ul: [ areasDeInteresse ], style: 'list' });
				docDefinition.content.push('\n');
				docDefinition.content.push({ text: 'Orgão responsável', style: 'subheader'});
				docDefinition.content.push('\n');
				docDefinition.content.push({ ul: [ orgao ], style: 'paragraph', pageBreak: 'after' });
			});

			promises.push(promise);
		}

		Q.all(promises).then(function() {
			pdfMake.createPdf(docDefinition).open();
		});
	});
});
