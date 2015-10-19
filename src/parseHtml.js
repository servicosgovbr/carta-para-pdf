var ParseHtml = function() {
	function ParseContainer(container, element, docDefinition) {
	    var elements = [];
	    var children = element.childNodes;

	    if (children.length !== 0) {
	        for (i = 0; i < children.length; i++) {
	        	docDefinition = ParseElement(elements, children[i], docDefinition);
	        }
	    }

	    if (elements.length !== 0) {
	        for (i = 0; i < elements.length; i++) {
	        	container.push(elements[i]);
	        }
	    }
	}

	function ParseItem(container, element, docDefinition, listType) {
		var list = [],
			content = {};

        $(element).find('li').each(function(index, listItem) {
			if (listItem.children.length !== 0) {
	            ParseContainer(list, listItem, docDefinition);
			} else {
        		list.push($(listItem).html());
			}
        });

        content = { style: 'listMargin' };
		content[listType] = list;

        container.push(content);
	}

	function ParseElement(container, element, docDefinition) {
		var content,
			stack,
			text;

	    switch (element.nodeName.toLowerCase()) {
	        case "#text": {
	            text = { text: element.textContent.replace(/\n/g, ""), style: 'text' };
	            container.push(text);
	            break;
	        }
	        case "b":
	        case "strong": {
	            container.push({ text: $(element).html(), bold: true });
	            break;
	        }
	        case "u": {
	            container.push({ text: $(element).html(), decoration: 'underline' });
	            break;
	        }
	        case "i": {
	            container.push({ text: $(element).html(), italics: true });
	            break;
	        }
	        case "span": {
	            ParseContainer(container, element, docDefinition);
	            break;
	        }
	        case "code": {
	        	container.push({ text: $(element).html(), style: 'code' });
	        }
	        case "br": {
	            docDefinition = CreateDocument();
	            container.push(docDefinition);
	            break;
	        }
	        case "a": {
	            container.push({ text: $(element).html() + ' - ' + $(element).attr('href'), style: "text"});
	            break;
	        }
			case "h6":
			case "h5":
			case "h4":
			case "h3":
	        case "h2": {
	            container.push({ text: $(element).html(), style: 'thirdheader' });
	            break;
	        }
	        case "h1": {
	            container.push({ text: $(element).html(), style: 'subheader' });
	            break;
	        }
	        case "em": {
	            container.push({ text: $(element).html(), style: 'paragraph' });
	            break;
	        }
	        case "ul": {
				ParseItem(container, element, docDefinition, 'ul');
	            break;
	        }
	        case "ol": {
				ParseItem(container, element, docDefinition, 'ol');
	            break;
	        }
	        case "div":
	        case "blockquote":
	        case "p": {
	            stack = [];
	            ParseContainer(stack, element, docDefinition);
	            container.push(stack);
	            break;
	        }
	        default: {
	            container.push({ text: $(element).html(), style: 'text' });
	            break;
	        }
	    }

	    return docDefinition;
	}

	function ParseHtml(container, htmlText) {
	    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
	    var docDefinition = CreateDocument();

	    for (var i = 0; i < html.length; i++) {
	    	ParseElement(container, html[i], docDefinition);	
	    }
	}

	function CreateDocument() {
	    return [];
	}

	return {
		parseHtml: ParseHtml
	};
};
