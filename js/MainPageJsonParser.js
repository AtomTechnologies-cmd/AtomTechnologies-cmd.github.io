window.onload = async (event) => {
    let jsonlist = await GetJSON("news/news.json");
    if (jsonlist.format == "list"){
        GetFileJson(jsonlist, 0)
        GetFileJson(jsonlist, 1)
        GetFileJson(jsonlist, 2)
    }
};

async function GetJSON(path) {
    const response = await fetch("/dat/" + path);
    const json = await response.json();
    return json;
}
async function GetFileJson(jsonList, index){
    let json = await GetJSON("news/" + jsonList.files[index] + ".json");
    SetCard("index-news-card-" + (index+1), json)
}
function SetCard(id, json){
    if (json.format == "card_news"){
        let card = document.getElementById(id);
        let imgSrc = card.getElementsByTagName("img")[0].src = json.img.card
        let title = card.getElementsByTagName("h5")[0].innerHTML = json.title;
        let description = card.getElementsByTagName("p")[0].innerHTML = json.description.short
    }
}