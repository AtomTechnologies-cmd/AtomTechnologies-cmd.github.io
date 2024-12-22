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
/*
                <div class="card" style="width: 18rem;">
                  <img class="card-img-top" src="/dat/img/TenSecondEscape.png" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">10 Second Escape</h5>
                    <p class="card-text">A fast-paced parkour platformer, beat a level in 10 seconds</p>
                  </div>
                  <ul class="list-group list-group-flush justify-content-center align-items-center text-center">
                    <li class="list-group-item">          
                      <button type="button" class="btn text-bg-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">More About This Game <span class="bi-arrow-right-square"></span></button>
                    </li>
                  </ul>
                  <div class="card-body justify-content-center align-items-center text-center">
                    <a href="https://www.youtube.com/watch?v=f38x0_mFzWQ" class="btn text-bg-primary"><span class="bi-youtube"></span> Youtube</a>
                    <a href="https://apps.microsoft.com/detail/9P807NC9Q6J0" class="btn text-bg-primary"><span class="bi-download"></span> Store Link</a>
                  </div>
                </div>
*/