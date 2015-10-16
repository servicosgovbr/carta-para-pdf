function FormatterHelper() {
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

	function getCurrentDate() {
		return formatDate(new Date());
	}

	return {
		getCurrentDate: getCurrentDate,
		formatDate: formatDate
	};
}