cartaParaPdf.ParseHtml = function () {
  function parseContainer(container, element, docDefinition, contact) {
    var elements = [];
    var children = element.childNodes;

    if (children.length !== 0) {
      for (var i = 0; i < children.length; i++) {
        docDefinition = parseElement(elements, children[i], docDefinition, contact);
      }
    }

    if (elements.length !== 0) {
      for (var j = 0; j < elements.length; j++) {
        container.push(elements[j]);
      }
    }
  }

  function parseItem(container, element, docDefinition, listType, contact) {
    var list = [],
      content = {};

    $(element).find('li').each(function (index, listItem) {
      if (listItem.children.length !== 0) {
        parseContainer(list, listItem, docDefinition, contact);
      } else {
        list.push($(listItem).html());
      }
    });

    content = {
      style: 'listMargin'
    };
    content[listType] = list;

    container.push(content);
  }

  function parseElement(container, element, docDefinition, contact) {
    var stack,
      text;
    switch (element.nodeName.toLowerCase()) {
    case '#text':
      {
        if (container.length) {
          container[container.length - 1].text = container[container.length - 1].text + element.textContent.replace(/\n/g, '');
        } else {
          text = {
            text: element.textContent.replace(/\n/g, ''),
            style: 'text',
            headlineLevel: 2
          };
          container.push(text);
        }
        break;
      }
    case 'b':
    case 'strong':
      {
        container.push({
          text: $(element).html(),
          bold: true
        });
        break;
      }
    case 'u':
      {
        container.push({
          text: $(element).html(),
          decoration: 'underline'
        });
        break;
      }
    case 'i':
      {
        container.push({
          text: $(element).html(),
          italics: true
        });
        break;
      }
    case 'span':
      {
        parseContainer(container, element, docDefinition);
        break;
      }
    case 'code':
      {
        container.push({
          text: $(element).html(),
          style: 'code'
        });
        break;
      }
    case 'br':
      {
        docDefinition = window.createDocument();
        container.push(docDefinition);
        break;
      }
    case 'a':
      {
        if (contact) {
          container.push({
            text: $(element).html() + ': ' + $(element).attr('href'),
            style: 'text'
          });
        } else {
          if (container.length) {
            container[container.length - 1].text = container[container.length - 1].text + ' ' + $(element).html();
          } else {
            container.push({
              text: $(element).html(),
              style: 'text'
            });
          }
        }
        break;
      }
    case 'h6':
    case 'h5':
    case 'h4':
    case 'h3':
    case 'h2':
      {
        container.push({
          text: $(element).html(),
          style: 'thirdheader'
        });
        break;
      }
    case 'h1':
      {
        container.push({
          text: $(element).html(),
          style: 'subheader'
        });
        break;
      }
    case 'em':
      {
        container.push({
          text: $(element).html(),
          style: 'paragraph'
        });
        break;
      }
    case 'ul':
      {
        parseItem(container, element, docDefinition, 'ul', contact);
        break;
      }
    case 'ol':
      {
        parseItem(container, element, docDefinition, 'ol', contact);
        break;
      }
    case 'div':
    case 'blockquote':
    case 'p':
      {
        stack = [];
        parseContainer(stack, element, docDefinition, contact);
        container.push(stack);
        break;
      }
    default:
      {
        container[container.length - 1].text = container[container.length - 1].text + $(element).html();
        break;
      }
    }

    return docDefinition;
  }

  function parseHtml(container, htmlText, contact) {
    var html = $(htmlText.replace(/\t/g, '').replace(/\n/g, ''));
    var docDefinition = new CreateDocument();
    for (var i = 0; i < html.length; i++) {
      parseElement(container, html[i], docDefinition, contact);
    }
  }

  function CreateDocument() {
    return [];
  }

  return {
    parseHtml: parseHtml
  };
};
