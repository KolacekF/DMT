let help_btn = CreateElement("button", "help_btn");
help_btn.onclick = function(){
    document.getElementById("help_BLOCK").classList.toggle("show-help");
    document.getElementById("help_BLOCK").classList.toggle("hide-help");
    document.getElementById("root").classList.toggle("show-help");
    this.classList.toggle("show-help");
    this.classList.toggle("hide-help");
    /*if(this.innerHTML == "?"){
        this.innerHTML = "X";
    } else{
        this.innerHTML = "?";
    }*/
};

let help_BLOCK = CreateElement("div", "help_BLOCK");
help_BLOCK.classList.add("hide-help");
help_btn.classList.add("hide-help");
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
    function span(el){
        let x = "<span>" + el + "</span>"
        return x;
    }
    let table = `
    <table>
        <tr><td></td><td>POČÁTEČNÍ SLOUPEC</td><td>Místa před des. čárkou</td><td>Místa za des. čárkou</td><td>Jednotky</td></tr>
        <tr><td>Č./Popis</td><td class="table-in">${span(pos.ID[0])}</td><td class="table-in">${span(pos.ID[1])}</td><td class="table-in">${span("0")}</td><td class="table---"></td></tr>
        <tr><td>X</td><td class="table-in">${span(pos.X[0])}</td><td class="table-in">${span(pos.X[1])}</td><td class="table-in">${span(pos.X[2])}</td><td class="table-m">${span("m")}</td></tr>
        <tr><td>Y</td><td class="table-in">${span(pos.Y[0])}</td><td class="table-in">${span(pos.Y[1])}</td><td class="table-in">${span(pos.Y[2])}</td><td class="table-m">${span("m")}</td></tr>
        <tr><td>Z</td><td class="table-in">${span(pos.Z[0])}</td><td class="table-in">${span(pos.Z[1])}</td><td class="table-in">${span(pos.Z[2])}</td><td class="table-m">${span("m")}</td></tr>
        <tr><td>KÓD</td><td class="table-in">${span(pos.Kod[0])}</td><td class="table-in">${span("50")}</td><td class="table-in">${span("0")}</td><td class="table---"></td></tr>
    </table>
    `;
    /*`
        <table>
            <tr><td></td><td>POČÁTEČNÍ SLOUPEC</td><td>Místa před des. čárkou</td><td>Místa za des. čárkou</td><td>Jednotky</td></tr>
            <tr><td>Č./Popis</td><td class="table-in">${pos.ID[0]}</td><td class="table-in">${pos.ID[1]}</td><td class="table-in">0</td><td class="table---"></td></tr>
            <tr><td>X</td><td class="table-in">${pos.X[0]}</td><td class="table-in">${pos.X[1]}</td><td class="table-in">${pos.X[2]}</td><td class="table-m"></td></tr>
            <tr><td>Y</td><td class="table-in">${pos.Y[0]}</td><td class="table-in">${pos.Y[1]}</td><td class="table-in">${pos.Y[2]}</td><td class="table-m"></td></tr>
            <tr><td>Z</td><td class="table-in">${pos.Z[0]}</td><td class="table-in">${pos.Z[1]}</td><td class="table-in">${pos.Z[2]}</td><td class="table-m"></td></tr>
            <tr><td>KÓD</td><td class="table-in">${pos.Kod[0]}</td><td class="table-in">50</td><td class="table-in">0</td><td class="table---"></td></tr>
        </table>
    `;*/
    
    let nadpis = CreateElement("h2", false, "pomocník nastavení AllPlan")
    let celek = CreateElement("div", "tabulka_BLOCK");
    celek.appendChild(nadpis);
    celek.appendChild(CreateElement("table", false, table));
    celek.appendChild(CodesTable(return_codes)); //FUNCTION OF codes.js
    //help_BLOCK.appendChild(celek);
    return celek;
}