
let positions;
let text;

//ELEMENTS BASIC CREATION
let root = document.getElementById("root");

let import_file = document.createElement("input");
import_file.id = "import_file";
import_file.type = "file";
import_file.accept = "text/txt";
root.appendChild(import_file);

let import_text = document.createElement("pre");
import_text.id = "import_text";
import_text.style = "display: none";

let export_text = document.createElement("pre");
export_text.id = "export_text";
//export_text.style = "display: none";

let export_file = document.createElement("a");
export_file.innerHTML = "polohopis.asc";
//ELEMENTS BASIC CREATION   -END

document.getElementById("import_file").onchange = function(){
    const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const contents = event.target.result;
            text = contents;
            FileLoaded();
        };

        reader.readAsText(file);
}

//VSECHNY FUNKCIONALITY SE SPOUSTI AZ PO NACTENI VSUPNIHO SOUBORU
function FileLoaded(){  
    let X = text_format(text);
    //IF CONVERSION IS VALID
    if (typeof(X) === "string"){
        export_text.innerHTML = X;
        import_text.innerHTML = text;
        CreateExportFile(export_text.innerHTML); //volani funkce vytvarejici soubor ke stazeni
    } else{
        alert("chyba naformatovani vstupniho textu");
    }

    root.appendChild(export_file);
    root.appendChild(import_text);
    root.appendChild(export_text);
}


function CreateExportFile(text){
    const file = new Blob([text], {type: "text/plain"});
    export_file.href = URL.createObjectURL(file);
    export_file.download = "polohopis.asc";
    export_file.click();
    URL.revokeObjectURL(export_file.href);
}