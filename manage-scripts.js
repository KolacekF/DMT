
let positions;
let text;

//BASIC ELEMENTS CREATION
let root = document.getElementById("root");
root.id = "root";

let import_file = document.createElement("input");
import_file.id = "import_file";
import_file.type = "file";
import_file.accept = "text/txt";
let import_label = CreateElement("label", "import_label", "<span>Přetáhněte soubor</span>");
import_label.htmlFor = "import_file";
import_label.appendChild(import_file)
let drop_BLOCK = CreateElement("div", "drop_BLOCK");
drop_BLOCK.appendChild(import_label);
//root.appendChild(import_file);
//root.appendChild(import_label);

let import_text = document.createElement("pre");
//import_text.id = "import_text";
//import_text.style = "display: none";

let export_text = document.createElement("pre");
//export_text.id = "export_text";
//export_text.style = "display: none";

let export_file = document.createElement("a");
export_file.innerHTML = "polohopis.asc";
//BASIC ELEMENTS CREATION   -END

import_file.onchange = function(){
    document.getElementById("import_file_BLOCK").classList.add("file_put");

    //const file = this.files[0];
    const file = document.getElementById("import_file").files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const contents = event.target.result;
        text = contents;
        
        import_text.innerHTML = text;
    };
    reader.readAsText(file);

    document.getElementById("import_text_BLOCK").classList.add("show-text");
    document.getElementById("import_text_BLOCK").classList.remove("hide-text");
};
import_file.ondrop = function(event){
    DropHandler(event);
    this.classList.remove("highlight");
};
import_file.ondragover = function(event){
    dragOverHandler(event);
    this.classList.add("highlight");
};

//RICH ELEMENTS CREATION
function ToogleVisibility(ele){
    ele.nextElementSibling.classList.toggle("hide");
}
let format_status_BLOCK = CreateElement("div", "format_status_BLOCK");
//FORMAT STATUS
let format_viceRadku = CreateElement("section", "format_viceRadku");
format_viceRadku.appendChild(CreateElement("div"));
format_viceRadku.appendChild(CreateElement("p", false, "Dokument ma >3 radky "));
let format_osamoceneRadky = CreateElement("section", "format_osamoceneRadky");
format_osamoceneRadky.appendChild(CreateElement("div"));
format_osamoceneRadky.appendChild(CreateElement("p", false, "Dokument nema prazdne radky "));
let format_velikostSloupcu = CreateElement("section", "format_velikostSloupcu");
format_velikostSloupcu.appendChild(CreateElement("div"));
format_velikostSloupcu.appendChild(CreateElement("p", false, "Dokument ma vsechny sloupce stejne "));
function FormatStatus(obj = "not_given"){
    const format_Array = [format_viceRadku, format_osamoceneRadky, format_velikostSloupcu];
    const dictionary = {true:"OK", false:"chyba", null:"netestovano"};
    if(obj == "not_given"){
        //POKUD JE FORMAT BEZ CHYBY
        format_viceRadku.appendChild(CreateElement("b", false, "OK"));
        format_osamoceneRadky.appendChild(CreateElement("b", false, "OK"));
        format_velikostSloupcu.appendChild(CreateElement("b", false, "OK"));
        
        for (const a of format_Array) {
            a.classList.add("true");    
        }
    } else{
        //POKUD JE FORMAT S CHYBOU
        format_viceRadku.appendChild(CreateElement("b", false, dictionary[obj.viceRadku]));
        format_osamoceneRadky.appendChild(CreateElement("b", false, dictionary[obj.osamoceneRadky]));
        format_velikostSloupcu.appendChild(CreateElement("b", false, dictionary[obj.velikostSloupcu]));
        
        format_viceRadku.classList.add(obj.viceRadku);
        format_osamoceneRadky.classList.add(obj.osamoceneRadky);
        format_velikostSloupcu.classList.add(obj.velikostSloupcu);
    }
    for (const a of format_Array) {
        format_status_BLOCK.appendChild(a);
    }
} 
//FORMAT STATUS END

let confirm_BLOCK = CreateElement("div", "confirm_BLOCK");
{
    let form_inside = `
    <div>
      <label for="negace">NEGACE</label>
      <input type="checkbox" id="negace" checked>
    </div><div>
      <label for="split">ODDĚLOVAČ</label>
      <input type="text" id="split" value=" "></input>
    </div><div>
      <input type="submit" value="Převést na .asc">
    </div>
      `
    let form = CreateElement("form", "options_form", form_inside);
    form.onsubmit = function(e){
        e.preventDefault();

        FileLoaded(this.negace.checked, this.split.value);
        document.getElementById("export_text_BLOCK").classList.add("show-text");

        return false;
    }
    confirm_BLOCK.appendChild(form);
}

let again_button = CreateElement("button", false, "Nahrat dalsi soubor");
again_button.onclick = function(){
    window.location.reload();
}

let import_file_BLOCK = CreateElement("div", "import_file_BLOCK");
let import_text_BLOCK = CreateElement("div", "import_text_BLOCK");
let export_text_BLOCK = CreateElement("div", "export_text_BLOCK");

import_file_BLOCK.classList.add("fileNotLoaded");

//import_file_BLOCK.appendChild(import_file);
import_file_BLOCK.appendChild(drop_BLOCK);
import_file_BLOCK.appendChild(confirm_BLOCK);
import_file_BLOCK.appendChild(again_button);

import_text_BLOCK.appendChild(CreateElement("h2", false, "VSTUPNI TEXT"));
{
    let b = CreateElement("button");
    b.onclick = function(){
        this.parentNode.classList.toggle("show-text");
        this.parentNode.classList.toggle("hide-text");
    }
    b.innerHTML = "⬇︎";
    import_text_BLOCK.appendChild(b);
    b.parentNode.classList.add("hide-text");
}
import_text_BLOCK.appendChild(import_text);

export_text_BLOCK.appendChild(CreateElement("h2", false, "UPRAVENY  TEXT"));
{
    let b = CreateElement("button");
    b.onclick = function(){
        this.parentNode.classList.toggle("show-text");
        this.parentNode.classList.toggle("hide-text");
    }
    b.innerHTML = "⬇︎";
    export_text_BLOCK.appendChild(b);
    b.parentNode.classList.add("hide-text");
}
export_text_BLOCK.appendChild(export_text);
//RICH ELEMENTS CREATION   -END

//VSECHNY FUNKCIONALITY SE SPOUSTI AZ PO NACTENI VSUPNIHO SOUBORU
function FileLoaded(neg, split){  
    document.getElementById("import_file_BLOCK").classList.replace("fileNotLoaded", "fileLoaded");
    let X = text_format(text, neg, split);
    //IF CONVERSION IS VALID / INVALID
    if (typeof(X) === "string"){
        export_text.innerHTML = X;
        FormatStatus();
        CreateExportFile(export_text.innerHTML); //volani funkce vytvarejici soubor ke stazeni
        //root.appendChild(GEOTable(positions)); //POZDEJI UPRAVIT
        root.removeChild(help_BLOCK);
        help_BLOCK.appendChild(GEOTable(positions));
        root.appendChild(help_BLOCK);
    } else{
        FormatStatus(X);
        //alert("chyba naformatovani vstupniho textu");
    }

    root.appendChild(export_file);
    root.appendChild(format_status_BLOCK);
}
root.appendChild(import_file_BLOCK);
let texts_BLOCK = CreateElement("div", "texts_BLOCK");
texts_BLOCK.appendChild(import_text_BLOCK);
texts_BLOCK.appendChild(export_text_BLOCK);
root.appendChild(texts_BLOCK);
root.appendChild(help_btn);
root.appendChild(help_BLOCK);


function CreateExportFile(text){
    const file = new Blob([text], {type: "text/plain"});
    export_file.href = URL.createObjectURL(file);
    export_file.download = "polohopis.asc";
    export_file.click();
    URL.revokeObjectURL(export_file.href);
}

function DropHandler(ev){
    ev.preventDefault();
    let file = [...ev.dataTransfer.files][0];

    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        text = contents;
        FileLoaded();
    };

    reader.readAsText(file);
}
function dragOverHandler(ev) {  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }