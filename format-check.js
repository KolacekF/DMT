function FormatCheck(input){
    const format_check = {
        bool: function(){
            let check = true;
            for (const key in format_check) {
                if (key == "bool") continue;
                check = check & format_check[key];
            }
            return check;
            //return (this.viceRadku & this.osamoceneRadky & this.velikostSloupcu);
        },
        viceRadku: null,
        osamoceneRadky: null,
        velikostSloupcu: null,
    }

    //JE VICE JAK DVA RADKY?
    format_check.viceRadku = ViceRadku(input);
    //NEJSOU OSAMOCENE RADKY?
    format_check.osamoceneRadky = OsamoceneRadky(input);
    //JSOU VSECHNY SLOUPCE SOURADNIC STEJNE VELKE?
    if (format_check.osamoceneRadky){
        format_check.velikostSloupcu = VelikostSloupcu();
    }
    //JE NA KAZDEM RADKU MINIMALNE 5 SLOUPCU?

    console.log(format_check);
    console.log(format_check.bool());

    return format_check;
}

function ViceRadku(input){
    let check = true;

    if (input.split("\n").length < 3) check = false;

    return check;
}

function OsamoceneRadky(input){
    let check = true;

    const lines = input.split("\n");
    lines.map(function(x){
        if (!Boolean(x) | x == "\n" | x == "\r") check = false;
    });

    return check;
}

function VelikostSloupcu(){
    let check = true;

    const x = [];
    const y = [];
    const z = [];
    lines_wordly.map(function(l){
        x.push(l[1]);
        y.push(l[2]);
        z.push(l[3]);
    });

    x.map(function(cord){
        if ((cord.length != x[0].length)) check = false; 
    })
    y.map(function(cord){
        if ((cord.length != y[0].length)) check = false; 
    })
    z.map(function(cord){
        if ((cord.length != z[0].length)) check = false; 
    })

    return check;
}