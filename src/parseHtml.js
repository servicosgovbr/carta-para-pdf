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

	function ParseElement(container, element, paragraph) {
	    switch (element.nodeName.toLowerCase()) {
	        case "#text": {
	            var text = { text: element.textContent.replace(/\n/g, "") };
	            paragraph.text.push(text);
	            container.push(paragraph);
	            break;
	        }
	        case "b":
	        case "strong": {
	            var stack = { text: $(element).html(), bold: true };
	            container.push(stack);
	            break;
	        }
	        case "u": {
	            var stack = { text: $(element).html(), decoration: 'underline' };
	            container.push(stack);
	            break;
	        }
	        case "i": {
	            var stack = { text: $(element).html(), italics: true };
	            container.push(stack);
	            break;
	        }
	        case "span": {
	            ParseContainer(container, element, paragraph);
	            break;
	        }
	        case "br": {
	            paragraph = CreateDocument();
	            container.push(paragraph);
	            break;
	        }
	        case "a": {
	            var stack = { stack: [{ text: $(element).html() + ' - ' + $(element).attr('href') }] };
	            container.push(stack);
	            break;
	        }
	        case "h2": {
	        	var stack = { stack: [{ text: $(element).html(), style: 'subheader' }] };
	            container.push(stack);
	            break;
	        }
	        case "h1": {
	        	var stack = { stack: [{ text: $(element).html(), style: 'header' }] };
	            container.push(stack);
	            break;
	        }
	        case "em": {
	        	var stack = { stack: [{ text: $(element).html(), style: 'paragraph' }] };
	            container.push(stack);
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
	            var stack = { stack: [] };
	            ParseContainer(stack.stack, element, paragraph);
	            
	            container.push(stack);
	            break;
	        }
	        default: {
	            console.log("Parsing for node " + element.nodeName + " not found");
	            break;
	        }
	    }

	    return paragraph;
	}

	function ParseHtml(container, htmlText) {
	    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
	    var docDefinition = CreateDocument();
	    
	    for (i = 0; i < html.length; i++) { 
	    	ParseElement(container, html.get(i), docDefinition);
	    }
	}

	function CreateDocument() {
	    return { text: [] };
	}

	return {
		parseHtml: ParseHtml
	};
};