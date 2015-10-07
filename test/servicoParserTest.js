describe("Servico Parser", function () {
    var servicoParser;

    beforeEach(function(){
      servicoParser = new ServicoParser();
    });

    describe("Parse data", function () {
        it("should return servico name", function () {
            expect(servicoParser.parseNome(
                   "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
                  "<servico xmlns=\"http://servicos.gov.br/v3/schema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://servicos.gov.br/v3/schema ../servico.xsd\">" +
                  "<nome>Ministério da cultura</nome></servico>")).toEqual('Ministério da cultura');
        });

        it("should return servico descricao", function () {
            expect(servicoParser.parseDescricao(
                   "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
                  "<servico xmlns=\"http://servicos.gov.br/v3/schema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://servicos.gov.br/v3/schema ../servico.xsd\">" +
                  "<descricao>Descricao</descricao></servico>")).toEqual('Descricao');
        });

        it("should return canais de prestacao", function () {
            expect(servicoParser.parseCanaisDePrestacao(
                   "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
                  "<servico xmlns=\"http://servicos.gov.br/v3/schema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://servicos.gov.br/v3/schema ../servico.xsd\">" +
                  "<canais-de-prestacao>" +
                    "<default>" + 
                      "<canal-de-prestacao tipo=\"web\">" +
                        "<descricao>http://bibspi.planejamento.gov.br</descricao>" +
                      "</canal-de-prestacao>" +
                    "</default>" +
                  "</canais-de-prestacao></servico>")).toEqual([{ tipo: 'web', descricao: 'http://bibspi.planejamento.gov.br' }]);
        });

    });
});