import datetime

def FileRead(name):
    print("opening file   -   " + name)
    f = open(name, "r", encoding="utf-8")
    content = f.read()
    f.close()
    return content
def FileWrite(str):
    print("writing export HTML")
    f = open("Otevri_Mne_V_Internetovem_Prohlizeci.html", "w")
    comment = """
    <!--Created automatically by parse.py script-->
    <!--Timestamp of document creation: {date}-->
    """.format(date=datetime.datetime.now().strftime("%d-%m-%Y %H:%M"))
    f.write(str + comment)
    f.close()
    print("___________________")
    print("HTML succesfully created")
    print("-------------------")

def Script(poz, sub):
    obj = {
        "poz": "",
        "out": ""
    }
    file = sub[sub.index("src"):].split('"', 2)[1]
    inner = sub.index("</script>")
    end = inner + 10

    obj["poz"] = poz + end
    obj["out"] += "<script>"
    #obj["out"] += sub[:inner]
    obj["out"] += FileRead(file)
    obj["out"] += "</script>"
    return obj
def Style(poz, sub):
    if sub[sub.index("rel"):].split('"', 2)[1] != "stylesheet":
      return False
    
    obj = {
        "poz": "",
        "out": ""
    }
    file = sub[sub.index("href"):].split('"', 2)[1]
    end = sub.index(">") + 2
    obj["poz"] = poz + end
    obj["out"] += "<style>"
    obj["out"] += FileRead(file)
    obj["out"] += "</style>"
    return obj

input = FileRead("index.html")

out = ""
i = 0
while i < len(input):
    if input[i] == "<":
        substring = input[i+1:]
        element = (substring.split(" ",1))[0]
        match element:
            case "script":
                result = Script(i, substring)
                i = result["poz"]
                out += result["out"]
            case "link":
                result = Style(i, substring)
                if not result:
                    out += input[i]
                    i += 1
                    continue
                i = result["poz"]
                out += result["out"]
            case _:
                out += input[i]
                i += 1
    else:
        out += input[i]
        i += 1

FileWrite(out)