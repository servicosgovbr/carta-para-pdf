describe("Servico Parser", function () {
    var servicoParser = new ServicoParser();

    describe("Parse data", function () {
        it("should return servico name", function () {
            expect(servicoParser.parseXml(
                   "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" +
                  "<servico xmlns=\"http://servicos.gov.br/v3/schema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://servicos.gov.br/v3/schema ../servico.xsd\">" +
                  "<nome>Ministério da cultura</nome></servico>")).toEqual({ nome: 'Ministério da cultura' });
        });
    });
});