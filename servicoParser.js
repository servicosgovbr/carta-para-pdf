var xmlParser = require('xmldoc');

var nome, descricao, segmentosDaSociedade, areasDeInteresse, canaisDePrestacao, orgao, xmlDoc;
var docContent = [];

function parseNome() {
	return xmlDoc.childNamed('nome').val;
}

function parseDescricao() {
	return xmlDoc.childNamed('descricao').val;
}

function parseAreasDeInteresse() {
	var values = [];

	xmlDoc.childNamed('areas-de-interesse').childrenNamed('item').forEach(function(item) {
		values.push(item.val);
	});

	return values;
}

function parseCanalDePrestacao() {
	var values = [];

	xmlDoc.childrenNamed('canal-de-prestacao').forEach(function(item) {
		values.push(item.attr.tipo +  ' - ' + item.childNamed('descricao').val);
	});

	return values;
}

function parseOrgao() {
	return xmlDoc.childNamed('orgao').attr.id;
}

function addNewLine() {
	docContent.push('\n');
}

function addValuesIntoDocument() {
	docContent.push({ text: nome, style: 'header'});
	addNewLine();
	docContent.push({ text: descricao, style: 'paragraph' });
	addNewLine();
	docContent.push({ text: 'Etapas para a realização deste serviço', style: 'subheader' });
	addNewLine();
	docContent.push({ text: 'Etapa 1', style: 'subheader' });
	addNewLine();
	docContent.push({ text: 'Canais de Prestação', style: 'subheader'});
	addNewLine();
	docContent.push({ ul: canaisDePrestacao, style: 'list' });
	addNewLine();
	docContent.push({ text: 'Segmentos da Sociedade', style: 'subheader'});
	addNewLine();
	docContent.push({ ul: [ segmentosDaSociedade ], style: 'list' });
	addNewLine();
	docContent.push({ text: 'Áreas de Interesse', style: 'subheader'});
	addNewLine();
	docContent.push({ ul: areasDeInteresse, style: 'list' });
	addNewLine();
	docContent.push({ text: 'Orgão responsável', style: 'subheader'});
	addNewLine();
	docContent.push({ ul: [ orgao ], style: 'paragraph', pageBreak: 'after' });
}

exports.parseXml = function(data) {
	xmlDoc = new xmlParser.XmlDocument(data);

	nome = parseNome();
	descricao = parseDescricao();
	segmentosDaSociedade = '';
	areasDeInteresse = parseAreasDeInteresse();
    canaisDePrestacao = parseCanalDePrestacao();
    orgao = parseOrgao();

    addValuesIntoDocument();

    return docContent;
}