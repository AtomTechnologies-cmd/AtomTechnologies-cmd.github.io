window.onload = async (event) => {
    let jsonlist = await GetJSON("games/games.json");
    if (jsonlist.format == "list"){
        array.forEach(async name => {
            let json = await GetJSON("games/" + name + ".json");
        });
    }
};

async function GetJSON(path) {
    const response = await fetch("/dat/" + path);
    const json = await response.json();
    return json;
}
function SetCard(id, json){
    let card = document.getElementById(id);
    let imgSrc = card.getElementsByTagName("img")[0].src = json.img.card
    let title = card.getElementsByTagName("h5")[0].innerHTML = json.title;
    let description = card.getElementsByTagName("p")[0].innerHTML = json.description.short
}