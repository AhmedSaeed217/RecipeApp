//Start Variables//

let details = document.querySelector(".details")
let overlay = document.querySelector(".overlay")
let searchInput = document.querySelector(".search-input");
let searchIcon = document.querySelector(".fa-search");
let resultArea = document.querySelector(".result .row");
let alertBox = document.querySelector(".alert-danger");


//End Variables//


//Start Events

searchIcon.addEventListener('click', getRecipe)
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getRecipe();
    }
});

//End Events


//Start Function Get All Recipes From API

function getRecipe() {
    alertBox.classList.add('d-none')
    let searchKey = searchInput.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchKey}`;
    fetch(apiUrl)
        .then((res) => {
            if (res.ok === true) {
                return res.json()
            }
        }).then((data) => {
            if (data.meals === null) {
                alertBox.classList.remove('d-none')
                alertBox.innerHTML = "Invalid Text";
            } else {
                displayRecipes(data.meals);
            }
        }
        )
}

//End Function Get All Recipes From API


//Start Function Display All Recipes

function displayRecipes(recipes) {
    resultArea.innerHTML = ""
    for (let i = 0; i < recipes.length; i++) {
        let allRecipes = `<div class="col-md-3 py-3 px-2 text-light d-flex justify-content-between flex-column">
            <div>
            <img src=${recipes[i].strMealThumb} alt="" class="w-100">
            <h4 class="mt-2 text-center">${recipes[i].strMeal}</h4>
            </div>
           <div>
           <a href="#" class="btn w-100" onclick="getDetails(${recipes[i].idMeal})">Get Recipe</a>
           </div>
        </div>
        `
        resultArea.innerHTML += allRecipes;
    }
}

//End Function Display All Recipes


//Start Function Display Details of a Recipe as a Pop-up 
function getDetails(id) {
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(apiUrl)
        .then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.meals[0])
            details.innerHTML = ` <i onclick="closeDetails()" class="fa-solid fa-xmark fa-2x"></i>
            <h2 class="mb-3 mt-3 text-white-50 text-center">${data.meals[0].strMeal}</h2>
            <p class="text-center text-white fs-5">${data.meals[0].strInstructions}</p>
            <a href="${data.meals[0].strSource}" target="_blank" class="btn btn-primary">Watch Video</a>`
            details.classList.remove("d-none");
            overlay.classList.remove("d-none")

        }
        )
}

//End Function Display Details of a Recipe as a Pop-up 


//Start Function that Close the pop-up 
function closeDetails() {
    details.classList.add("d-none")

}

//End Function that Close the pop-up 


