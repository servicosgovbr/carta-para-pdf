cartaParaPdf.FormatterHelper = function() {
	function formatDate(date) {
		var months = [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'];
	    var year = date.getFullYear().toString();
	    var month = date.getMonth();
	    var day = date.getDate().toString();

	    return day + ' ' + months[month] + ' de ' + year;
	}

	function formatarCanalDeComunicacao(string) {
		if(string === 'web-agendar') {
			return 'Web';
		} else {
			return string.replace(string.charAt(0), function(letter) {
			    return letter.toUpperCase();
			});
		}
	}

	function formatarTempoEstimado(tempo) {
		if(tempo === 'dias-uteis') {
			return 'dias úteis';
		} else {
			return tempo;
		}
	}

	function getCurrentDate() {
		return formatDate(new Date());
	}

	return {
		getCurrentDate: getCurrentDate,
		formatDate: formatDate,
		formatarCanalDeComunicacao: formatarCanalDeComunicacao,
		formatarTempoEstimado: formatarTempoEstimado
	};
};