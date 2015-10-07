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

function generatePdf(orgao) {
	initialDocDefinition();
	servicoParser.parseXml(xmlServico);

	docDefinition.content = docDefinition.content.concat(servicoDocument);	
	//pdfMake.createPdf(docDefinition).open();
};