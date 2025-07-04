// Function loadCategories

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

const loadAnimals = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => {
            document.getElementById('sorting-price').addEventListener('click', function () {
                // console.log('button clicked')
                const sortedArray = data.pets.sort((a, b) => b.price - a.price);
                // console.log(sortedArray)
                displayAnimals(sortedArray)
            })

            displayAnimals(data.pets)

        })
        .catch(err => console.log(err))
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    // console.log(buttons)
    for (let btn of buttons) {
        btn.classList.remove('active')
    }
}
const loadAnimalsCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()

            document.getElementById('sorting-price').addEventListener('click', function () {
                console.log('button clicked')
                const sortedArray = data.data.sort((a, b) => b.price - a.price);
                // console.log(sortedArray)
                displayAnimals(sortedArray)
            })
            const activeBtn = document.getElementById(`btn-${id}`)
            setTimeout(() => displayAnimals(data.data), 200);
            // console.log(data.data)
            activeBtn.classList.add('active')

        })
        .catch(err => console.log(err))
}


// {
//     "status": true,
//     "message": "successfully fetched pet data using id 1",
//     "petData": {
//         "petId": 1,
//         "breed": "Golden Retriever",
//         "category": "Dog",
//         "date_of_birth": "2023-01-15",
//         "price": 1200,
//         "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//         "gender": "Male",
//         "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//         "vaccinated_status": "Fully",
//         "pet_name": "Sunny"
//     }
// }

const loadDetails = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data))
        .catch(err => console.log(err))
}

const displayDetails = (id) => {
    // console.log(id)
    const detailContainer = document.getElementById('modal-content')
    detailContainer.innerHTML = `
    <figure class="px-4 pt-4">
            <img class="h-full w-full pb-5" src="${id.petData.image}" alt="Animals"
            class="rounded-xl" />
    </figure>   
    <h2 class="card-title">${id.petData.pet_name}</h2>
           <div class="grid grid-cols-2 justify-between">
                 <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/747/747327.png">
                Breed: ${(id.petData.breed === undefined) || (id.petData.breed?.length === 0) ? "Not Available Now" : `${id.petData.breed}`}
                </p>
                <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/2948/2948088.png">
                Birth: ${(id.petData.date_of_birth === null) || (id.petData.date_of_birth === undefined) ? "Not Available Now" : `${id.petData.date_of_birth}`}
                </p>
                <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/866/866954.png">
                Gender: ${(id.petData.gender?.length === 0) || (id.petData.gender === undefined) ? "Not Available Now" : `${id.petData.gender}`}
                </p>
                 <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/74/74742.png">
                Price: ${(id.petData.price === null) || (id.petData.price === undefined) ? "Not Available Now" : `${id.petData.price}$`}
                </p> 
                <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/3096/3096565.png">
                Vaccinated Status: ${(id.petData.vaccinated_status?.length === 0) || (id.petData.vaccinated_status === undefined) ? "Not Available Now" : `${id.petData.vaccinated_status}`}
            </p>
           </div>
    <div class="border-b mt-2 mb-2"></div>
    <h2 class="card-title">Detail Information</h2>
    <p class="mb-3 mt-3">${id.petData.pet_details}</p>
    `


    document.getElementById('customModal').showModal()
}

// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }
const displayAnimals = (animals) => {
    // console.log(animals.length)
    const animalContainer = document.getElementById('animals')
    animalContainer.innerHTML = ""

    if (animals.length === 0) {
        animalContainer.classList.remove('grid')
        animalContainer.innerHTML = `
        <div class="bg-base-200 rounded-lg">
        <div class="min-h-[600px] flex flex-col gap-5 justify-center items-center">
        <img src="images/error.webp">
        <h2 class="text-center text-3xl font-bold">
        No Information Available
        </h2>
        <p class="w-8/12 mx-auto text-center">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
        </p>
        </div>
        </div>
        `
    }
    else {
        animalContainer.classList.add('grid')
    }

    animals.forEach((item) => {
        // console.log(item)
        const card = document.createElement('div')
        card.classList = "card card-compact  border border-black "
        card.innerHTML = `
        <figure class="px-4 pt-4">
            <img src="${item.image}" alt="Animals"
            class="rounded-xl" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${item.pet_name}</h2>
            <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/747/747327.png">
                Breed: ${(item.breed === undefined) || (item.breed?.length === 0) ? "Not Available Now" : `${item.breed}`}
            </p>
            <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/2948/2948088.png">
                Birth: ${(item.date_of_birth === null) || (item.date_of_birth === undefined) ? "Not Available Now" : `${item.date_of_birth}`}
            </p>
            <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/866/866954.png">
                Gender: ${(item.gender?.length === 0) || (item.gender === undefined) ? "Not Available Now" : `${item.gender}`}
            </p>
            <p class="flex items-center gap-2 text-sm">
                <img class="h-4" 
                src="https://cdn-icons-png.flaticon.com/128/74/74742.png">
                Price: ${(item.price === null) || (item.price === undefined) ? "Not Available Now" : `${item.price}$`}
            </p>
            <div class="border-b"></div>
            <div class="card-actions grid grid-cols-3 justify-between">
                <button onclick="loadLikedAnimals(${item.petId})" class="btn btn-sm btn-border"><img class="w-5" src="https://cdn-icons-png.flaticon.com/128/9513/9513802.png"></button>
                <button class="btn btn-sm btn-border">Adopt</button>
                <button onclick="loadDetails(${item.petId})" class="btn btn-sm btn-border">Details</button>
            </div>
        </div>
        `
        animalContainer.appendChild(card)
    })
}


// {
//     "petId": 17,
//     "breed": "Maine Coon",
//     "category": "Cat",
//     "date_of_birth": "2022-12-01",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/85w4kSt/pet-17.jpg",
//     "gender": "Male",
//     "pet_details": "This majestic male Maine Coon, born on December 1, 2022, is known for his gentle demeanor and friendly personality. Fully vaccinated and priced at $1200, he's great with families and other pets.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Thor"
// }

let count = 0

const loadLikedAnimals = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => {
            count++
            // console.log(count)
            displayLikedAnimals(data.petData, count)
        })
        .catch(err => console.log(err))
}

const displayLikedAnimals = (id, count) => {
    const likedAnimals = document.getElementById('liked-animals')
    console.log(count)


    if (count <= 12) {
        const img = document.createElement('img')
        img.classList = "rounded-xl h-32 mr-6 ml-4 mt-4"
        img.src = id.image
        likedAnimals.appendChild(img)
    }
    else{
        alert("Liked Animal's slot is full")
    }
}

// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }
const displayCategories = (categories) => {
    // console.log(categories)

    const categoriesContainer = document.getElementById('categories')

    categories.forEach((item) => {

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" onclick="loadAnimalsCategory('${item.category}')" class="flex gap-2 justify-center items-center mx-auto border border-[#2E3E51]] font-bold text-xl p-4 rounded-lg w-3/4 category-btn">
            <img src="${item.category_icon}">
            <p>${item.category}</p>
        </button>        
        `

        categoriesContainer.appendChild(buttonContainer)
    })


}

loadCategories()
loadAnimals()
