cartaParaPdf.ParseHtml = function() {
	function parseContainer(container, element, docDefinition) {
	    var elements = [];
	    var children = element.childNodes;

	    if (children.length !== 0) {
	        for (i = 0; i < children.length; i++) {
	        	docDefinition = parseElement(elements, children[i], docDefinition);
	        }
	    }

	    if (elements.length !== 0) {
	        for (i = 0; i < elements.length; i++) {
	        	container.push(elements[i]);
	        }
	    }
	}

	function parseItem(container, element, docDefinition, listType) {
		var list = [],
			content = {};

        $(element).find('li').each(function(index, listItem) {
			if (listItem.children.length !== 0) {
	            parseContainer(list, listItem, docDefinition);
			} else {
        		list.push($(listItem).html());
			}
        });

        content = { style: 'listMargin' };
		content[listType] = list;

        container.push(content);
	}

	function parseElement(container, element, docDefinition) {
		var content,
			stack,
			text;
	    switch (element.nodeName.toLowerCase()) {
	        case "#text": {
              if (container.length) {
                container[container.length - 1].text = container[container.length - 1].text + element.textContent.replace(/\n/g, "");
              } else {
	              text = { text: element.textContent.replace(/\n/g, ""), style: 'text', headlineLevel: 2 };
	              container.push(text);
              }
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
	            parseContainer(container, element, docDefinition);
	            break;
	        }
	        case "code": {
	        	container.push({ text: $(element).html(), style: 'code' });
	        	break;
	        }
	        case "br": {
	            docDefinition = createDocument();
	            container.push(docDefinition);
	            break;
	        }
	        case "a": {
              container[container.length - 1].text = container[container.length - 1].text + $(element).html();
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
				parseItem(container, element, docDefinition, 'ul');
	            break;
	        }
	        case "ol": {
				parseItem(container, element, docDefinition, 'ol');
	            break;
	        }
	        case "div":
	        case "blockquote":
	        case "p": {
	            stack = [];
	            parseContainer(stack, element, docDefinition);
	            container.push(stack);
	            break;
	        }
	        default: {
              container[container.length - 1].text = container[container.length - 1].text + $(element).html();
	            break;
	        }
	    }

	    return docDefinition;
	}

	function parseHtml(container, htmlText) {
	    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
	    var docDefinition = CreateDocument();

	    for (var i = 0; i < html.length; i++) {
	    	parseElement(container, html[i], docDefinition);	
	    }
	}

	function CreateDocument() {
	    return [];
	}

	return {
		parseHtml: parseHtml
	};
};
