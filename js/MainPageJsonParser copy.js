window.onload = async (event) => {
    let newsJsonlist = await GetJSON("news/news.json");
    if (newsJsonlist.format == "list"){
        GetFileJsonNews(newsJsonlist, 0)
        GetFileJsonNews(newsJsonlist, 1)
        GetFileJsonNews(newsJsonlist, 2)
    }
    let gameJsonlist = await GetJSON("games/games.json");
    if (gameJsonlist.format == "list"){
        GetFileJsonGame(gameJsonlist, 0)
        GetFileJsonGame(gameJsonlist, 1)
        GetFileJsonGame(gameJsonlist, 2)
    }
};

async function GetJSON(path) {
    const response = await fetch("/dat/" + path);
    const json = await response.json();
    return json;
}
async function GetFileJsonNews(jsonList, index){
    let json = await GetJSON("news/" + jsonList.files[index] + ".json");
    SetCard("index-news-card-" + (index+1), json)
}
async function GetFileJsonGame(jsonList, index){
    let json = await GetJSON("games/" + jsonList.files[index] + ".json");
    SetCard("index-games-card-" + (index+1), json)
}
function SetCard(id, json){
    let card = document.getElementById(id);
    let imgSrc = card.getElementsByTagName("img")[0].src = json.img.card
    let title = card.getElementsByTagName("h5")[0].innerHTML = json.title;
    let description = card.getElementsByTagName("p")[0].innerHTML = json.description.short
}