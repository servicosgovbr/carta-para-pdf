cartaParaPdf.OrgaoParser = function() {
  var api = {};

  api.parseNome = function (xmlDoc) {
    return $(xmlDoc).find('nome').html().replace('<![CDATA[', '').replace(']]>', '');
  };

  api.parseDescricao = function (xmlDoc) {
    var descricao = $(xmlDoc).find('conteudo').html() || '';
    return descricao.replace('<![CDATA[', '')
                    .replace('<!--[CDATA[', '')
                    .replace(']]>', '')
                    .replace(']]-->', '');
  };

  api.parseContato = function (xmlDoc) {
    var contato = $(xmlDoc).find('contato').html() || '';
    return contato.replace('<![CDATA[', '')
                  .replace('<!--[CDATA[', '')
                  .replace(']]>', '')
                  .replace(']]-->', '');
  };

  api.parseXml = function (data) {
    var xmlDoc = $.parseXML(data),
      orgao = {
        nome: api.parseNome(xmlDoc),
        descricao: api.parseDescricao(xmlDoc),
        contato: api.parseContato(xmlDoc)
      };

      return orgao;
  };

  return api;
};
