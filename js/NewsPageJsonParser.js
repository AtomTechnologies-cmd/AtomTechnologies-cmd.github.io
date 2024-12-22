window.onload = async (event) => {
    let jsonlist = await GetJSON("news/news.json");
    if (jsonlist.format == "list"){
      jsonlist.files.forEach(async name => {
            let json = await GetJSON("news/" + name + ".json");
            await CreateCard(json);
        });
    }
};

async function GetJSON(path) {
    const response = await fetch("/dat/" + path);
    const json = await response.json();
    return json;
}
async function CreateCard(json){
  let holder = document.getElementById("card-holder");
  let div = document.createElement("div")
  div.className = "col d-flex justify-content-center"
  div.innerHTML = `
                  <div class="card" style="width: 18rem; margin-top: 20px;">
                  <img class="card-img-top" src="${json.img.card}" alt="Card image cap"  data-bs-toggle="modal" data-bs-target="#${json.modalID}">
                  <div class="card-body" data-bs-toggle="modal" data-bs-target="#${json.modalID}">
                    <h5 class="card-title">${json.title}</h5>
                    <p class="card-text">${json.description.short}</p>
                  </div>
                  <ul class="list-group list-group-flush justify-content-center align-items-center text-center">
                    <li class="list-group-item">          
                      <button type="button" class="btn text-bg-secondary" data-bs-toggle="modal" data-bs-target="#${json.modalID}">Find Out More <span class="bi-arrow-right-square"></span></button>
                    </li>
                  </ul>
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
                    <img class="card-img-top" src="${json.img.card}" alt="Card image cap">
                    </div>
                <div class="col-md-7">
                  <div class="card-body text-start" style="padding: 10px;">
                    <h4 class="card-title">${json.title}</h4>
                    <p class="card-text text-secondary">${json.date}</p>
                    <p class="card-text">${json.description.long}</p>
                    <h6 class="card-title">Links</h6>
                    <div class="row" id="links_${json.modalID}">
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>`

  let bg = document.getElementById("bg");
  bg.appendChild(modal);

  let linkHolder = document.getElementById(`links_${json.modalID}`);

  json.links.forEach(link => {
    let div = document.createElement("div")
    div.className = "col";

    let a = document.createElement("a")
    a.className = "btn text-bg-secondary"
    a.href = link.href;
    a.text = link.text;
    div.appendChild(a)
    linkHolder.appendChild(div);
  });

}