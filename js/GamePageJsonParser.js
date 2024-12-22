window.onload = async (event) => {
    let jsonlist = await GetJSON("games/games.json");
    if (jsonlist.format == "list"){
      jsonlist.files.forEach(async name => {
            let json = await GetJSON("games/" + name + ".json");
            CreateCard(json);
        });
    }
};

async function GetJSON(path) {
    const response = await fetch("/dat/" + path);
    const json = await response.json();
    return json;
}
function CreateCard(json){
  let holder = document.getElementById("card-holder");
  let div = document.createElement("div")
  div.className = "col d-flex justify-content-center"
  div.innerHTML = `
                  <div class="card" style="width: 18rem; margin-top: 20px;">
                  <img class="card-img-top" src="${json.img.card}" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${json.title}</h5>
                    <p class="card-text">${json.description.short}</p>
                  </div>
                  <ul class="list-group list-group-flush justify-content-center align-items-center text-center">
                    <li class="list-group-item">          
                      <button type="button" class="btn text-bg-secondary" data-bs-toggle="modal" data-bs-target="#${json.modalID}">More About This Game <span class="bi-arrow-right-square"></span></button>
                    </li>
                  </ul>
                  <div class="card-body justify-content-center align-items-center text-center">
                    <a href="${json.link.youtube}" class="btn text-bg-primary"><span class="bi-youtube"></span> Youtube</a>
                    <a href="${json.link.store}" class="btn text-bg-primary"><span class="bi-download"></span> Store Link</a>
                  </div>
                </div>`;
  holder.appendChild(div);
  let modal = document.createElement("div");
  modal.innerHTML = `
  <div class="modal modal-lg fade" id="${json.modalID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${json.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row g-0">
                  <div class="col-md-5 text-center">
                    <div id="carouselExampleIndicators${json.modalID}" class="carousel slide">
                      <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators${json.modalID}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators${json.modalID}" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators${json.modalID}" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators${json.modalID}" data-bs-slide-to="3" aria-label="Slide 4"></button>
                      </div>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img src="/dat/img/screenshots/${json.img.screenshots[0]}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                          <img src="/dat/img/screenshots/${json.img.screenshots[1]}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                          <img src="/dat/img/screenshots/${json.img.screenshots[2]}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                          <img src="/dat/img/screenshots/${json.img.screenshots[3]}" class="d-block w-100" alt="...">
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${json.modalID}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${json.modalID}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                    </div>
                <div class="col-md-7">
                  <div class="card-body text-start" style="padding: 10px;">
                    <h4 class="card-title">${json.title}</h4>
                    <p class="card-text text-secondary">${json.platform}</p>
                    <p class="card-text">${json.description.long}</p>
                  </div>
                </div>
              </div>
              </div>
              <div class="modal-footer">
                <a href="${json.link.youtube}" class="btn text-bg-primary"><span class="bi-youtube"></span> Youtube</a>
                <a href="${json.link.store}" class="btn text-bg-primary"><span class="bi-download"></span> Store Link</a>
              </div>
            </div>
          </div>
        </div>`
  let bg = document.getElementById("bg");
  bg.appendChild(modal);
}