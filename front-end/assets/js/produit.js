//Récupération de l'ID du produit via l'URL
let searchParams = new URLSearchParams(window.location.search);
let teddyId = searchParams.get("id");

//Lien vers l'API en ciblant son ID
fetch(`http://localhost:3000/api/teddies/${teddyId}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    let teddy = data;
    teddyDisplay(teddy);
    chooseColor(teddy);
  })
  .catch(function (error) {
    alert("Connection impossible");
  });

//Fonction permettant d'afficher le produit selectionné
function teddyDisplay(teddy) {
  let singleTeddy = '<div class="col-sm-12">';
  singleTeddy += `<div class="row border shadow">
                    <img src="${teddy.imageUrl}" alt="${
    teddy.name
  }" class="col-sm-12 col-lg-6 p-1 product-image">
                    <div class="col-sm-12 col-lg-6 product-bg p-md-2">
                      <div class="row teddyCharacteristics px-md-5 px-lg-3">
                        <h3 class="teddyName col-8">${teddy.name}</h3>
                        <p class="teddyPrice-produit col-4 h3 text-right align-self-center pt-lg-3">${
                          teddy.price / 100
                        },00€</p>
                      </div>
                      <p class="card-test text-center mt-3 mx-md-3 mt-lg-0 teddyDescription">${
                        teddy.description
                      }</p>
                      <select id='selectColor' class=" col-auto col-lg-12 form-select form-select-lg mt-2 mb-3 mt-lg-4 .form-select-lg example"></select>
                      <div class="col col-lg-12 text-right pr-0 mb-3 mt-lg-5">
                        <button type="button" class="btn">Ajouter au panier</button>
                      </div>
                    </div>
                  </div>`;
  singleTeddy += "</div>";
  document.getElementById("singleTeddy").innerHTML = singleTeddy;
}

//Fonction permettant d'afficher les différentes couleurs possibles
function chooseColor(teddy) {
  let colorChoice = document.getElementById("selectColor");
  for (let color of teddy.colors) {
    colorChoice.innerHTML += `<option value='${color}'>${color}</option>`;
  }
}
