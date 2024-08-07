let need_help_btn = CreateElement("button", "need_help_btn");
need_help_btn.onclick = function(){
    document.getElementById("need_help_form").classList.toggle("hidden");
    this.classList.toggle("submenu_visible");
}
need_help_btn.innerHTML = "Něco nefunguje?";

let need_help_BLOCK = CreateElement("div", "need_help_BLOCK");

need_help_BLOCK.classList.add("hide-need_help");


let need_help_form = CreateElement("div", "need_help_form");
need_help_form.classList.add("hidden");
let need_help_input = CreateElement("textarea", "need_help_input");
let need_help_submit = CreateElement("button");
need_help_submit.innerHTML = ">";
need_help_submit.onclick = function(){
    let this_element = this; //handover this to function
    let input_element = document.getElementById("need_help_input");
    this_element.classList.add("button_wait");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://kolacek.atwebpages.com/DMT/php.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            this_element.classList.remove("button_wait");
            if (xhr.status == 200){
                this_element.classList.add("button_success");
                this_element.classList.remove("button_fail");
                this_element.innerHTML = "✓";
                console.log("Response: ", xhr.responseText);
                setTimeout(() => {
                    this_element.classList.remove("button_success");
                    this_element.innerHTML = ">";
                    input_element.value = "";
                }, 3000);
            } else {
                this_element.classList.add("button_fail");
                this_element.innerHTML = "✕";
                console.log("Error: ", xhr.statusText);
            }
        }
    };
    xhr.onerror = function(){
        alert("Chyba v odeslání dat. Zkuste jinou cestu...");
    };
    xhr.send("text=" + input_element.value);
}


need_help_form.appendChild(need_help_input);
need_help_form.appendChild(need_help_submit);

need_help_BLOCK.appendChild(need_help_btn);
need_help_BLOCK.appendChild(need_help_form);






//TESTED FUCTION THATS WORKING
/*
const postData = "username=exampleUser&email=user@example.com";


var xhr = new XMLHttpRequest();
xhr.open("POST", "http://kolacek.atwebpages.com/PHP_test/php.php", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
        if (xhr.status == 200){
            console.log("Response: ", xhr.responseText);
        } else {
            console.log("Error: ", xhr.statusText);
        }
    }
};
xhr.onerror = function(){
    console.log("Request error");
};
xhr.send(postData);
*/