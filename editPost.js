//DEFINIRE ENDPOINT IN UNA CONST
const duckLink = "https://striveschool-api.herokuapp.com/api/product/"

//const postImageUrl = document.getElementById("post-imageUrl")
const postName = document.getElementById("post-name")
const postBrand = document.getElementById("post-brand")
const postDesc = document.getElementById("post-description")
const postPrice = document.getElementById("post-price")

const alertMsg = document.getElementById('alertMsg')
const editMsg = document.getElementById('editMsg');

const params = new URLSearchParams(window.location.search)
const duckId = params.get('duckId');


//FETCH CON FUNZIONE ASYNC PER RECUEPRARE I DATI (GET)
async function getPost() {
    try {
        const response = await fetch (duckLink + '/' + duckId, {
            headers: {
                 Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGU2YTFlMTQwNjAwMTUzMTRkNmQiLCJpYXQiOjE3NDA1MDg3NzgsImV4cCI6MTc0MTcxODM3OH0.tgfIcx0LcNP-5vlOg-iZiRqlDgUNdReXN38NVmvIloQ",
                 "content-Type": "application/json"
            }
        })
        const duck = await response.json()

        console.log(duck)

        postName.value = duck.name
        postBrand.value = duck.brand
        postDesc.value = duck.description
        postPrice.value = duck.price

    }catch (err) {
        console.log(err)
    }
}

//FETCH CON FUNZIONE ASYNC PER MODIFICARE LA POST (PUT)
async function editPost() {
    if (postName.value && postBrand.value && postDesc.value && postPrice.value){
        const postEdit = {
            name: postName.value,
            brand: postBrand.value,
            description: postDesc.value,
            price: postPrice.value
        }

        try{
            const response = await fetch(duckLink + '/' + duckId,{
                method: "PUT",
                body: JSON.stringify(postEdit),
                headers: {
                     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlMGU2YTFlMTQwNjAwMTUzMTRkNmQiLCJpYXQiOjE3NDA1MDg3NzgsImV4cCI6MTc0MTcxODM3OH0.tgfIcx0LcNP-5vlOg-iZiRqlDgUNdReXN38NVmvIloQ",
                     "content-Type": "application/json"
                }
            })
            editMsg.classList.remove("d-none");  
            setTimeout(() => {
                editMsg.classList.add('d-none');
                window.location.href = '/backoffice.html';
            }, 5000);

        } catch (err) {
            console.log(err)
        }
    } else {
        alertMsg.classList.remove("d-none")

        setTimeout(() => {
            alertMsg.classList.add('d-none');
        }, 5000)
    }
    
}

getPost()