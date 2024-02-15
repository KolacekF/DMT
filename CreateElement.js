function CreateElement(DOM_name, id = false, inner = false){
    let element = document.createElement(DOM_name);
    if(id) element.id = id;
    if(inner) element.innerHTML = inner;
    return element;
}