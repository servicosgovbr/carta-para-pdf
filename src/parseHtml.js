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
	        var st = styles[i].trim().toLowerCase().split(":");
	        
	        if (st.length === 2) {
	            switch (st[0]) {
	                case "font-size":{
	                    object.fontSize = parseInt(st[1]);
	                    break;
	                }
	                case "text-align": {
	                    switch (st[1]) {
	                        case "right": object.alignment = 'right'; break;
	                        case "center": object.alignment = 'center'; break;
	                    }
	                    break;
	                }
	                case "font-weight": {
	                    switch (st[1]) {
	                        case "bold": object.bold = true; break;
	                    }
	                    break;
	                }
	                case "text-decoration": {
	                    switch (st[1]) {
	                        case "underline": object.decoration = "underline"; break;
	                    }
	                    break;
	                }
	                case "font-style": {
	                    switch (st[1]) {
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
	            var ns = nodeStyle.split(";");

	            for (k = 0; k < ns.length; k++) { 
	            	styles.push(ns[k]);
	            }
	        }
	    }

	    switch (element.nodeName.toLowerCase()) {
	        case "#text": {
	            var text = { text: element.textContent.replace(/\n/g, "") };

	            if (styles) { 
	            	ComputeStyle(text, styles); 
	            }

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
	            paragraph = CreateParagraph();
	            cnt.push(paragraph);
	            break;
	        }
	        case "table": {
	                var table = {
	                    table: { widths: [], body: [] }
	                };
	                var border = element.getAttribute("border");
	                var isBorder = false;

	                if (border && parseInt(border) === 1) { 
	                	isBorder = true;
	                }
	                
	                if (!isBorder) { 
	                	table.layout = 'noBorders'; 
	                }
	                
	                ParseContainer(table.table.body, element, paragraph, styles);
	                
	                var widths = element.getAttribute("widths");

	                if (!widths) {
	                    if (table.table.body.length !== 0) {
	                        if (table.table.body[0].length !== 0) { 
	                        	for (k = 0; k < table.table.body[0].length; k++) { 
	                        		table.table.widths.push("*"); 
	                        	}
	                    	}
	                    }
	                } else {
	                    var width = widths.split(",");

	                    for (k = 0; k < width.length; k++)  { 
	                    	table.table.widths.push(width[k]);
	                    }
	                }
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
	            paragraph = CreateParagraph();
	            var stack = {stack: []};
	            stack.stack.push(paragraph);
	            
	            var rspan = element.getAttribute("rowspan");
	            if (rspan) { 
	            	stack.rowSpan = parseInt(rspan); 
	            }
	            
	            var cspan = element.getAttribute("colspan");
	            
	            if (cspan) { 
	            	stack.colSpan = parseInt(cspan); 
	            }
	            
	            ParseContainer(stack.stack, element, paragraph, styles);
	            container.push(stack);
	            break;
	        }
	        case "a": {
	            var stack = { stack: [{ text: $(element).html() + ' - ' + $(element).attr('href') }] };
	            container.push(stack);
	            break;
	        }
	        case "div":
	        case "p": {
	            paragraph = CreateParagraph();
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
	    var paragraph = CreateParagraph();
	    
	    for (i = 0; i < html.length; i++) { 
	    	ParseElement(container, html.get(i), paragraph);
	    }
	}

	function CreateParagraph() {
	    return { text: [] };
	}

	return {
		parseHtml: ParseHtml
	};
};