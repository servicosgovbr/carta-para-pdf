cartaParaPdf.PdfMaker = function() {
	var docDefinition = {
		content: [],
			defaultStyle: {
			font: 'OpenSans'
		},
		footer: function(currentPage, pageCount) { 
			return {
			    columns: currentPage !== 1 ? [currentPage.toString()] : [''],
			    color: '#606060',
			    margin: [ 513, 20, 70, 0 ],
			    bold: true,
			    fontSize: 10
		  	};
		},
		header: function(currentPage, pageCount) { 
			return {
			    columns: currentPage === 1 ? ['__________________________________________________________________'] : [''],
			    color: '#2C66CE',
			    background: '#2C66CE',
			    margin: [ 0, 0, 0, 0 ],
			    bold: true,
			    fontSize: 26
		  	};
		},
		pageSize: 'A4',
		pageMargins: [ 70, 70 ],
		pageOrientation: 'portrait',
		styles: {
		title: {
		   fontSize: 55,
		   bold: true,
		   color: '#2C66CE',
		   lineHeight: 0.7,
		   margin: [ 0, 60, 0, 0 ]
		 },
		 code: {
		 	fontSize: 12,
		  	color: '#606060',
		  	margin: [ 0, 0, 0, 5 ],
		  	italics: true
		 },
		 text: {
		  fontSize: 12,
		  color: '#606060',
		  margin: [ 0, 0, 0, 5 ]
		 },
		 border: {
		   fontSize: 30,
		   color: '#dddddd',
		   lineHeight: 0.64
		 },
		 subtitle: {
		   fontSize: 25,
		   bold: true,
		   color: '#606060',
		   lineHeight: 0.8
		 },
		 header: {
		   fontSize: 32,
		   bold: true,
		   color: '#2C66CE',
		   lineHeight: 0.8,
		   margin: [ 0, 40, 0, 30 ]
		 },
		 subheader: {
		   fontSize: 22,
		   bold: true,
		   color: '#606060',
		   lineHeight: 0.8,
		   margin: [ 0, 0, 0, 7 ]
		 },
		 subheadermargin: {
		   fontSize: 22,
		   bold: true,
		   color: '#606060',
		   lineHeight: 0.8,
		   margin: [ 0, 90, 0, 7 ]
		 },
		 thirdheader: {
		   fontSize: 15,
		   italics: true,
		   color: '#606060',
		 },
		 thirdheaderTable: {
		   fontSize: 12,
		   italics: true,
		   margin: [ 0, 0, 0, 5 ],
		   color: '#606060'
		 },
		 tableExample: {
		  margin: [0, 5, 0, 15],
		  color: '#606060'
		 },
		 list: {
		  fontSize: 12,
		  blod: true,
		  color: '#606060',
		  margin: [ 10, 0, 0, 0 ]
		 },
		 listMargin: {
		  fontSize: 12,
		  blod: true,
		  color: '#606060',
		  margin: [ 10, 0, 0, 0 ]
		 },
		 paragraph: {
		  fontSize: 12,
		  color: '#606060',
		  margin: [ 0, 0, 0, 15 ]
		 }
		}
	};

	pdfMake.fonts = {
		OpenSans: {
			normal: 'OpenSans-Regular.ttf',
			italics: 'OpenSans-BoldItalic.ttf',
			bold: 'OpenSans-ExtraBold.ttf'
		}
	};

	function initialDocDefinition(nome) {
		docDefinition.content = [];
		docDefinition.content.push({ text: nome, style: 'title'});
		docDefinition.content.push({ text: '__________________________________', style: 'border', margin: [ 0, 30, 0, 0 ] });
		docDefinition.content.push('\n');
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'Carta de Serviços', style: 'subtitle', margin: [ 0, 20, 0, 0 ] });
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'A Carta de Serviços é um instrumento de gestão pública, que contém informações sobre os serviços públicos prestados de forma direta ou indireta pelos órgãos e entidades da administração pública.', style: 'paragraph' });
		docDefinition.content.push({ text: 'Ela contempla as formas de acesso, padrões de qualidade e compromissos de atendimento aos usuários. Ela é baseada nas informações do Portal de Serviços do Governo Federal (www.servicos.gov.br).', style: 'paragraph' });
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'Documento gerado em ' + new cartaParaPdf.FormatterHelper().getCurrentDate(), margin: [ 0, 220, 0, 0 ], fontStyle: 50, style: 'paragraph', pageBreak: 'after' });
	}

	function capaOrgao(nome, descricao) {
		docDefinition.content.push({ text: nome, style: 'header'});
		docDefinition.content.push({ text: 'Quem somos?', style: 'subheadermargin' });
		docDefinition.content.push('\n');

		var textoHtml = markdown.toHTML(descricao);
		var content = [];
		var parseHtml = new cartaParaPdf.ParseHtml();

		parseHtml.parseHtml(content, textoHtml);
		docDefinition.content = docDefinition.content.concat(content);


		docDefinition.content.push({ text: '', style: 'paragraph', pageBreak: 'after' });
	}

	function geraInformacoesDosServicos(servicos) {
		var servicoParser = new cartaParaPdf.ServicoParser();

		$(servicos).each(function(index, xml) {
			var servicoObject = servicoParser.parseXml(xml);

			var contentBuilder = new cartaParaPdf.ContentBuilder(servicoObject);
			var servicoDocument = contentBuilder.buildContent();

			if (index < servicos.length - 1) {
				servicoDocument.push({ text: '' , pageBreak: 'after' });
			}

			docDefinition.content = docDefinition.content.concat(servicoDocument);
		});
	}

	function indice(servicos, orgao) {
		var nomesServicos = [];
		var servicoParser = new cartaParaPdf.ServicoParser();

		$(servicos).each(function(index, xml) {
			var servicoObject = servicoParser.parseXml(xml);
			nomesServicos.push(servicoObject.nome);			
		});

		docDefinition.content.push({ text: orgao, style: 'header' });
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'Serviços disponíveis', style: 'subheadermargin' });
		docDefinition.content.push('\n');
		docDefinition.content.push({ ul: nomesServicos , style: 'list', pageBreak: 'after' });
	}

	function geraPdf(jsonResponse) {
		initialDocDefinition(jsonResponse.nome);
		capaOrgao(jsonResponse.nome, jsonResponse.descricao);
		indice(jsonResponse.servicos, jsonResponse.nome);
		geraInformacoesDosServicos(jsonResponse.servicos);

		pdfMake.createPdf(docDefinition).download(jsonResponse.nome.toLowerCase().replace(/ /g, '-'));
	}

	return {
		geraPdf: geraPdf,
		initialDocDefinition: initialDocDefinition,
		docDefinition: docDefinition,
		capaOrgao: capaOrgao,
		geraInformacoesDosServicos: geraInformacoesDosServicos
	};
};