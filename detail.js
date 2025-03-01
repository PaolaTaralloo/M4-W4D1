//DEFINIRE ENDPOINT IN UNA CONST
const duckLink = "https://striveschool-api.herokuapp.com/api/product/"

//DEFINIRE DIV IN CUI RENDERIZZARE IN UNA CONST
const resultDetail = document.getElementById("resultDetail");


function getPosts() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const duckId = params.get('duckId'); // Usa duckId per ottenere l'ID dal URL

    fetch(duckLink + duckId, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGU2YTFlMTQwNjAwMTUzMTRkNmQiLCJpYXQiOjE3NDA1MDg3NzgsImV4cCI6MTc0MTcxODM3OH0.tgfIcx0LcNP-5vlOg-iZiRqlDgUNdReXN38NVmvIloQ"
        }
    })
        .then(response => response.json())
        .then(duck => {
            console.log(duck);
            renderDetail(duck)
            // renderDetail(data);  // Usa il dato recuperato dal fetch
        })
        .catch((err) => console.log(err));
}


//FUNZIONE CHE RENDERIZZA A SCHERMO
function renderDetail({ imageUrl, name, brand, description, price }) {
    resultDetail.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card", "col-3", "mb-5");

    const imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top");
    imgCard.src = imageUrl;
    card.appendChild(imgCard);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = name;
    cardBody.appendChild(cardTitle);

    const brandDuck = document.createElement("p");
    brandDuck.classList.add("card-text");
    brandDuck.innerText = "Brand: " + brand;
    cardBody.appendChild(brandDuck);

    const descriptionDuck = document.createElement("p");
    descriptionDuck.classList.add("card-text");
    descriptionDuck.innerText = description;
    cardBody.appendChild(descriptionDuck);

    const priceDuck = document.createElement("h5");
    priceDuck.classList.add("card-text", "mb-2");
    priceDuck.innerText = "€ " + price;
    cardBody.appendChild(priceDuck);

    resultDetail.appendChild(card);
}

getPosts()
