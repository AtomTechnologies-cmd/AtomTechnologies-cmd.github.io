window.onload = (event) => {
    let json = GetJSON("news/news.json")
    console.log(json);
};

async function GetJSON(path) {
    const response = await fetch("/dat/" + path);
    const json = await response.json();
    return json;
}

function SetCard(id, json){
    let card = document.getElementById(id);
    let img = card.getElementsByTagName("img")
    let title = card.getElementsByTagName("h5")
    let description = card.getgetElementsByTagName("p")
}