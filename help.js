let help_btn = CreateElement("button", "help_btn", "?");
help_btn.onclick = function(){
    document.getElementById("help_BLOCK").classList.toggle("show-help");
    document.getElementById("help_BLOCK").classList.toggle("hide-help");
    if(this.innerHTML == "?"){
        this.innerHTML = "X";
    } else{
        this.innerHTML = "?";
    }
};

let help_BLOCK = CreateElement("div", "help_BLOCK");
help_BLOCK.classList.add("hide-help");
{
let intro = CreateElement("h1", false, "NÁPOVĚDA pro nástroj převodu .txt -> .asc pro AllPlan DMT");

let li = CreateElement("ul", "ul");
li.appendChild(CreateElement("li", false, "Vložte .txt soubor zaměření od geodeta viz tlačítko nahoře \"Vybrat soubor\""));
li.appendChild(CreateElement("li", false, "Po úspěšné konverzi stáhněte .asc a importujte do AllPlan"));
li.appendChild(CreateElement("li", false, "Nastavení AllPlan viz pomocník níže"));

help_BLOCK.appendChild(intro);
help_BLOCK.appendChild(li);
}

function GEOTable(pos){
    let table = `
        <table>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>ID</td><td>${pos.ID[0]}</td><td>${pos.ID[1]}</td><td>0</td><td></td></tr>
            <tr><td>X</td><td>${pos.X[0]}</td><td>${pos.X[1]}</td><td>${pos.X[2]}</td><td></td></tr>
            <tr><td>Y</td><td>${pos.Y[0]}</td><td>${pos.Y[1]}</td><td>${pos.Y[2]}</td><td></td></tr>
            <tr><td>Z</td><td>${pos.Z[0]}</td><td>${pos.Z[1]}</td><td>${pos.Z[2]}</td><td></td></tr>
            <tr><td>KOD</td><td>${pos.Kod[0]}</td><td>50</td><td>0</td><td></td></tr>
        </table>
    `;
    let nadpis = CreateElement("h2", false, "pomocník nastavení AllPlan")
    let celek = CreateElement("div");
    celek.appendChild(nadpis);
    celek.appendChild(CreateElement("table", false, table));
    //help_BLOCK.appendChild(celek);
    return celek;
}