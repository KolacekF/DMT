//take input text string -> format it -> return text string
let lines_wordly;

function text_format(input, neg, split){
    if (input.slice(-1) == "\n") input = input.slice(0, -1); //if last is \n, pop() it
    const lines = input.split("\n");
    lines_wordly = lines.map(function(line){ //[ [ 1],[222],[333] ],[ [ 2],[222],...]
        //let words = line.split(" ");
        let words = line.split(split);
        let return_words = [];
        for (const word of words) {
            if (word !== "" ){
                return_words.push(word);
            }
        }
        return return_words;
    });

    //LINES_WORDLY JE HOTOVE


    //ZKONTROLUJ FORMAT, POKUD JE CHYBA, VRAT OBJEKT S VYSLEDKY KONTROLY FORMATU
    let formatChecked = FormatCheck(input);
    if (!formatChecked.bool()){
        return (formatChecked);
    };

    if(neg) Negace_os();
    Positions();
    Create_codes(); //Create unique code names for KOD
    Put_codes_in_linesWordly(Return_codes()); //IN lines_wordly REPLACE CODE NAMES WITH NUMBERS (= array indexes)
    return to_string();
}

function to_string(){
    let output = "";
    
    //PADDING OF FIRST INDEX
    let padding = Max_pad(lines_wordly);
    output = lines_wordly.map(function(line){
        line[0] = line[0].padStart(padding, " ");
        return line;
    });

    //MEZI SLOVA VLOZ MEZERY, MEZI RADKY VLOZ \n
    for (const i in output) {
        output[i] = output[i].toString().replaceAll(",","   ");
    }
    output = output.toString().replaceAll(",", "\n");

    //VYHOD COKOLI CO NENI CISLO (do pomocnenoho stringu zkopiruje jen povolene znaky)
    let pomocny_string = "";
    for (const i in output) {
        if (/([0-9]|\s|[.]|[-])/.test(output[i])) { //RegExp [cisla] nebo whitespace nebo tecka nebo minus
            pomocny_string += output[i]
        }
    }
    output = pomocny_string;
    
    return output;
}

//NAJDI MAX LENGHT U PRVNICH POZICI
function Max_pad(inputArray){
    let max = 0;
    for (const i of inputArray) {
        let lenght = i[0].length;
        if (lenght > max) max = lenght;
    }
    return max;
}

//NEGACE OS
function Negace_os(){
    lines_wordly = lines_wordly.map(function(line){
        line[1] = "-" + line[1];
        line[2] = "-" + line[2];
        return line;
    })
}

//DLE LINES_WORDLYN SDEL POZICE DO ZADANI
function Positions(){
    let i = lines_wordly.length;
    let example_line = lines_wordly[i-2].map(function(e){return e;});
    const Pozice = {
        ID: [1], //pocatecni, pred carkou, za carkou
        X: [], //pocatecni, pred carkou, za carkou
        Y: [], //pocatecni, pred carkou, za carkou
        Z: [], //pocatecni, pred carkou, za carkou
        Kod: [], //pocatecni, pred carkou, za carkou
        zjisti: function(){
            this.ID[1] = example_line[0].length;
            this.X[0] = this.ID[1] + 3;
            this.X[1] = example_line[1].split(".")[0].length;
            this.X[2] = example_line[1].split(".")[1].length;
            this.Y[0] = this.X[0] + this.X[1] + 1 + this.X[2] + 3;
            this.Y[1] = example_line[2].split(".")[0].length;
            this.Y[2] = example_line[2].split(".")[1].length;
            this.Z[0] = this.Y[0] + this.Y[1] + 1 + this.Y[2] + 3;
            this.Z[1] = example_line[3].split(".")[0].length;
            this.Z[2] = example_line[3].split(".")[1].length;
            this.Kod[0] = this.Z[0] + this.Z[1] + 1 + this.Z[2] + 3;
        }
    }
    Pozice.zjisti();
    positions = Pozice;
    console.log(positions);
}