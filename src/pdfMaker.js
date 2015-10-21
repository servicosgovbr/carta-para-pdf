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
			    margin: [ 500, 20, 70, 0 ],
			    bold: true,
			    fontSize: 10
		  	};
		},
		pageSize: 'A4',
		pageMargins: [ 70, 70 ],
		pageOrientation: 'portrait',
		styles: {
		title: {
		   fontSize: 72,
		   bold: true,
		   color: '#2C66CE',
		   lineHeight: 0.64,
		   margin: [ 70, 150, 0, 0 ]
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
		   fontSize: 72,
		   color: '#606060',
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
		docDefinition.content.push({ text: 'Carta de Serviços', style: 'title'});
		docDefinition.content.push({ text: '__________', style: 'border', margin: [ 70, -40, 90, 0 ] });
		docDefinition.content.push('\n');
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: nome.toUpperCase(), style: 'subtitle', margin: [ 70, 0, 115, 0 ], pageBreak: 'after' });
	}

	function capaOrgao(nome, descricao) {
		docDefinition.content.push({ text: nome, style: 'header'});
		docDefinition.content.push({ text: 'O que é?', style: 'subheadermargin' });
		docDefinition.content.push('\n');

		var textoHtml = markdown.toHTML(descricao);
		var content = [];
		var parseHtml = new cartaParaPdf.ParseHtml();

		parseHtml.parseHtml(content, textoHtml);
		docDefinition.content = docDefinition.content.concat(content);


		docDefinition.content.push({ text: '', style: 'paragraph', pageBreak: 'after' });
	}

	function informacaoCartasDeServico() {
		docDefinition.content.push({ text: 'Carta de Serviços', style: 'header'});
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'O que é?', style: 'subheadermargin'});
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'Carta de serviços é um documento feito para informar o cidadão sobre os serviços públicos disponíveis pelo governo federal. Cada carta é sobre um orgão do governo e seus serviços disponíveis.', style: 'paragraph' });
		docDefinition.content.push('\n');
		docDefinition.content.push({ text: 'A Carta de serviços é baseada nas informações do portal de serviços do governo federal (www.servicos.gov.br). Esse documento foi gerado em ' + new cartaParaPdf.FormatterHelper().getCurrentDate() + '. O portal de serviços está sempre sendo atualizado, por isso é importante imprimir a carta de serviços com frequência.', style: 'paragraph', pageBreak: 'after' });
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
		docDefinition.content.push({ text: 'Quais os serviços disponíveis?', style: 'subheadermargin' });
		docDefinition.content.push('\n');
		docDefinition.content.push({ ul: nomesServicos , style: 'list', pageBreak: 'after' });
	}

	function geraPdf(jsonResponse) {
		initialDocDefinition(jsonResponse.nome);
		informacaoCartasDeServico();
		capaOrgao(jsonResponse.nome, jsonResponse.descricao);
		indice(jsonResponse.servicos, jsonResponse.nome);
		geraInformacoesDosServicos(jsonResponse.servicos);

		pdfMake.createPdf(docDefinition).open();
	}

	return {
		geraPdf: geraPdf,
		initialDocDefinition: initialDocDefinition,
		docDefinition: docDefinition,
		capaOrgao: capaOrgao,
		informacaoCartasDeServico: informacaoCartasDeServico,
		geraInformacoesDosServicos: geraInformacoesDosServicos
	};
};