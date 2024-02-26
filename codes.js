const codes = {}
const return_codes = []

function Return_codes(){
    for (const key in codes) {
        let x = key.replace("\r", "");
        return_codes.push(x);
    }
    return return_codes;
}

function Create_codes(){
    for (const line of lines_wordly) {
        let x = (line.slice(4,)).toString();
        codes[x] = null;
    }
}

function Put_codes_in_linesWordly(arr){
    //MERGE MULTIPLE CODE NAMES TO ONE ARRAY
    for (const key in lines_wordly) {
        let i = 2;
        while (lines_wordly[key].length > 5) {
            let x = lines_wordly[key].length - i;
            let y = lines_wordly[key].pop();
            y = y.replace("\r", ""); //DELETE \r IF THERE IS
            (lines_wordly[key])[x] += "," + y;
            
        }
    }
    //REPLACE CODE NAMES WITH INDEX OF PARAMETER ARRAY
    for (const key in arr) {
        for (const iterator of lines_wordly) {
            if (iterator.length > 4) {
                iterator[4] = iterator[4].replace(arr[key], parseInt(key) + 1);
            }
        }
    }
}

function CodesTable(arr){
    let table = "";
    for (const key in arr) {
        table += (`<tr><td>${parseInt(key) + 1}</td><td>${arr[key]}</td></tr>`);
    }
    return CreateElement("table", false, table);
}