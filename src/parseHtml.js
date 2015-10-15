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

	function ParseElement(container, element, docDefinition) {
	    switch (element.nodeName.toLowerCase()) {
	        case "#text": {
	            var text = { text: element.textContent.replace(/\n/g, "") };
	            docDefinition.text.push(text);
	            container.push(docDefinition);
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
	        case "br": {
	            docDefinition = CreateDocument();
	            container.push(docDefinition);
	            break;
	        }
	        case "a": {
	            container.push({ text: $(element).html() + ' - ' + $(element).attr('href') });
	            break;
	        }
	        case "h2": {
	            container.push({ text: $(element).html(), style: 'subheader' });
	            break;
	        }
	        case "h1": {
	            container.push({ text: $(element).html(), style: 'header' });
	            break;
	        }
	        case "em": {
	            container.push({ text: $(element).html(), style: 'paragraph' });
	            break;
	        }
	        case "ul": {
	        	var list = [];
	            $(element).find('li').each(function(index, listItem) {
	            	list.push($(listItem).html());
	            });

	            var content = { ul: list, style: 'list' }

	            container.push(content);
	            break;
	        }
	        case "div":
	        case "p": {
	            var stack = [];
	            ParseContainer(stack, element, docDefinition);
	            container.push(stack);
	            break;
	        }
	        default: {
	            console.log("Parsing for node " + element.nodeName + " not found");
	            break;
	        }
	    }

	    return docDefinition;
	}

	function ParseHtml(container, htmlText) {
	    var html = $.parseHTML(htmlText);
	    var docDefinition = CreateDocument();
	    
	    $(html).each(function(i, element) {
		  ParseElement(container, element, docDefinition);
		});
	}

	function CreateDocument() {
	    return { text: [] };
	}

	return {
		parseHtml: ParseHtml
	};
};