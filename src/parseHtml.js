var ParseHtml = function() {
	function ParseContainer(container, element, paragraph, styles) {
	    var elements = [];
	    var children = element.childNodes;

	    if (children.length !== 0) {
	        for (i = 0; i < children.length; i++) { 
	        	paragraph = ParseElement(elements, children[i], paragraph, styles); 
	        }
	    }
	    
	    if (elements.length !== 0) {            
	        for (i = 0; i < elements.length; i++) { 
	        	container.push(elements[i]); 
	        }
	    }
	    
	    return paragraph;
	}

	function ComputeStyle(object, styles) {
	    for (i = 0; i < styles.length; i++) {
	        var styleArray = styles[i].trim().toLowerCase().split(":");
	        
	        if (styleArray.length === 2) {
	            switch (styleArray[0]) {
	                case "font-size":{
	                    object.fontSize = parseInt(styleArray[1]);
	                    break;
	                }
	                case "text-align": {
	                    switch (styleArray[1]) {
	                        case "right": object.alignment = 'right'; break;
	                        case "center": object.alignment = 'center'; break;
	                    }
	                    break;
	                }
	                case "font-weight": {
	                    switch (styleArray[1]) {
	                        case "bold": object.bold = true; break;
	                    }
	                    break;
	                }
	                case "text-decoration": {
	                    switch (styleArray[1]) {
	                        case "underline": object.decoration = "underline"; break;
	                    }
	                    break;
	                }
	                case "font-style": {
	                    switch (styleArray[1]) {
	                        case "italic": object.italics = true; break;
	                    }
	                    break;
	                }
	            }
	        }
	    }
	}

	function ParseElement(container, element, paragraph, styles) {
	    if (!styles) { styles = []; };

	    if (element.getAttribute) {
	        var nodeStyle = element.getAttribute("style");

	        if (nodeStyle) {
	            var nodeStyleArray = nodeStyle.split(";");

	            for (k = 0; k < nodeStyleArray.length; k++) { 
	            	styles.push(nodeStyleArray[k]);
	            }
	        }
	    }

	    switch (element.nodeName.toLowerCase()) {
	        case "#text": {
	            var text = { text: element.textContent.replace(/\n/g, "") };

	            if (styles) { 
	            	ComputeStyle(text, styles); 
	            }

	            paragraph.text.push(text);

	            break;
	        }
	        case "b":
	        case "strong": {
	            ParseContainer(container, element, paragraph, styles.concat(["font-weight:bold"]));
	            break;
	        }
	        case "u": {
	            ParseContainer(container, element, paragraph, styles.concat(["text-decoration:underline"]));
	            break;
	        }
	        case "i": {
	            ParseContainer(container, element, paragraph, styles.concat(["font-style:italic"]));
	            break;
	        }
	        case "span": {
	            ParseContainer(container, element, paragraph, styles);
	            break;
	        }
	        case "br": {
	            paragraph = CreateDocument();
	            container.push(paragraph);
	            break;
	        }
	        case "table": {
	                var table = { table: { body: [] } };
	                
	                ParseContainer(table.table.body, element, paragraph, styles);
	                
	                container.push(table);
	                break;
	            }
	        case "tbody": {
	            ParseContainer(container, element, paragraph, styles);
	            break;
	        }
	        case "tr": {
	            var row = [];
	            ParseContainer(row, element, paragraph, styles);
	            container.push(row);
	            break;
	        }
	        case "td": {
	            paragraph = CreateDocument();
	            var stack = {stack: []};
	            stack.stack.push(paragraph);
	            
	            ParseContainer(stack.stack, element, paragraph, styles);
	            container.push(stack);
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
	            paragraph = CreateDocument();
	            var stack = { stack: [] };
	            stack.stack.push(paragraph);
	            ComputeStyle(stack, styles);
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
	    var paragraph = CreateDocument();
	    
	    for (i = 0; i < html.length; i++) { 
	    	console.log('Entrou aqui ', i);
	    	ParseElement(container, html.get(i), paragraph);
	    }
	}

	function CreateDocument() {
	    return { text: [] };
	}

	return {
		parseHtml: ParseHtml
	};
};