
//DEFINIRE ENDPOINT IN UNA CONST
const duckLink = "https://striveschool-api.herokuapp.com/api/product/"

let allDucks = []


//FETCH CON FUNZIONE ASYNC
async function getPosts() {
    try {
        const res = await fetch(duckLink, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGU2YTFlMTQwNjAwMTUzMTRkNmQiLCJpYXQiOjE3NDA1MDg3NzgsImV4cCI6MTc0MTcxODM3OH0.tgfIcx0LcNP-5vlOg-iZiRqlDgUNdReXN38NVmvIloQ"
            }
        })
        const ducks = await res.json()

        console.log(ducks)
        allDucks = ducks
        renderCards(allDucks)
    } catch (err) {
        console.log(err)
    }
}


//FUNZIONE CHE RENDERIZZA A SCHERMO
function renderCards(ducks) {
    let resultsDuck = document.getElementById("resultsDuck")
    resultsDuck.innerHTML = ""

    const postNodes = ducks.map(duck => createCard(duck))

    resultsDuck.append(...postNodes)
}

//FUNZIONE CHE CREA CARD
function createCard({ imageUrl, name, brand, price, _id }) {
    const card = document.createElement("div")
    card.classList.add("card", "col-6", "col-md-4", "col-lg-3")
    //--------------------------------------------------------//
    card.addEventListener("click", () => {
        window.location.href =`detail.html?duckId=${_id}`;
    });
    //--------------------------------------------------------//
    const imgCard = document.createElement("img")
    imgCard.classList.add("card-img-top")
    imgCard.src = imageUrl
    card.appendChild(imgCard)
    //--------------------------------------------------------//
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    card.appendChild(cardBody)

    const cardTitle = document.createElement("h4")
    cardTitle.classList.add("card-title",)
    cardTitle.innerText = name
    cardBody.appendChild(cardTitle)

    const brandDuck = document.createElement("p")
    brandDuck.classList.add("card-text")
    brandDuck.innerText = "Brand: " + brand
    cardBody.appendChild(brandDuck)

    const priceDuck = document.createElement("h5")
    priceDuck.classList.add("card-text", "mb-2")
    priceDuck.innerText = "€ " + price
    cardBody.appendChild(priceDuck)

    // const detail = document.createElement("a")
    // detail.innerText = "Scopri di più"
    // detail.setAttribute('href', `detail.html?duckkId=${_id}`)
    // cardBody.appendChild(detail)

    //--------------------------------------------------------//

    return card
}

//FUNZIONE CERCA
function search(){
    const searchInput = document.getElementById("searchInput")
    const searchValue = searchInput.value.toLowerCase()

    const filteredDucks = allDucks.filter((duck) => {
        return duck.name.toLowerCase().includes(searchValue)
    })
    renderCards(filteredDucks)
}



getPosts()