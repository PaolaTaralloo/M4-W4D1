//DEFINIRE ENDPOINT IN UNA CONST
const duckLink = "https://striveschool-api.herokuapp.com/api/product/"

const postImageUrl = document.getElementById("post-imageUrl")
const postName = document.getElementById("post-name")
const postBrand = document.getElementById("post-brand")
const postDesc = document.getElementById("post-description")
const postPrice = document.getElementById("post-price")

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
        renderTable(allDucks)
    } catch (err) {
        console.log(err)
    }
}

//FUNZIONE CHE RENDERIZZA A SCHERMO
function renderTable(ducks) {
    let resultsDuck = document.getElementById("resultsDuck")
    resultsDuck.innerHTML = ""

    const postNodes = ducks.map(duck => createRow(duck))

    resultsDuck.append(...postNodes)
}

//FUNZIONE CHE CREA LA RIGA
function createRow({_id, name, brand, description, price }) {
    const tableRow = document.createElement("tr");

    const cellName = myTd(name);
    const cellBrand = myTd(brand);
    const cellDescription = myTd(description);
    const cellPrice = myTd(price);
    const cellActions = myTd('');

    const editBtn = document.createElement("a")
    editBtn.classList.add("btn", "btn-primary", "me-3")
    editBtn.innerHTML= `<i class="bi bi-pencil-square"></i>`
    editBtn.addEventListener("click", () => {
        window.location.href =`editPost.html?duckId=${_id}`;
    });

    const removeBtn = document.createElement("a")
    removeBtn.classList.add("btn", "btn-danger")
    removeBtn.innerHTML = `<i class="bi bi-trash3-fill"></i>`
    removeBtn.addEventListener("click", () =>{
        deletePost(_id)
    })

    cellActions.append(editBtn, removeBtn)
    tableRow.append(cellName, cellBrand, cellDescription, cellPrice, cellActions);

    return tableRow;
}

//FUNZIONE CHE CREA LE CELLE DELLA RIGA
function myTd(text) {
    const myCell = document.createElement("td");
    myCell.innerText = text;

    return myCell;
}

//FUNZIONE CHE CREA LA POST
async function createPost() {

    // Controlliamo che tutti i campi siano stati compilati
    if (postImageUrl.value && postName.value && postBrand.value && postDesc.value && postPrice.value) {
        try {
            const newPost = {
                imageUrl: postImageUrl.value,
                name: postName.value,
                brand: postBrand.value,
                description: postDesc.value,
                price: postPrice.value,
            }

            const response = await fetch(duckLink, {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGU2YTFlMTQwNjAwMTUzMTRkNmQiLCJpYXQiOjE3NDA1MDg3NzgsImV4cCI6MTc0MTcxODM3OH0.tgfIcx0LcNP-5vlOg-iZiRqlDgUNdReXN38NVmvIloQ",
                    "Content-Type": "application/json"
                }
            });

            await getPosts();

        } catch (error) {
            console.log(error);
        }
    } else {
        // Facciamo vedere un errore all'utente
        alertMsg.classList.remove('d-none');

        setTimeout(() => {
            alertMsg.classList.add('d-none');
        }, 5000);

        console.log("Devi inserire tutti e 5 i campi obbligatori!");
    }
}



//FUNZIONE CHE ELIMINA UNA POST
async function deletePost(id) {
    try{
        const response = await fetch (duckLink + '/' + id, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGU2YTFlMTQwNjAwMTUzMTRkNmQiLCJpYXQiOjE3NDA1MDg3NzgsImV4cCI6MTc0MTcxODM3OH0.tgfIcx0LcNP-5vlOg-iZiRqlDgUNdReXN38NVmvIloQ"
            }
        })

        getPosts()

    } catch (err) {
        console.log(err)
    }
}




getPosts()