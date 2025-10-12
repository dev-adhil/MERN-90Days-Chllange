const searchBox = document.querySelector('.SearchBox')
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')
const home = document.querySelector('.home')
const categories = document.querySelector('.categories')

home.addEventListener("click",()=> {
    fetchRecipes("chicken");
    searchBox.value=""
} )

const fetchCategories = async()=>{
    try{
        const categ = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const catres = await categ.json();

        categories.innerHTML = ""

        console.log(catres,"rescatttttt");
        catres.meals.forEach(meal => {
            const button = document.createElement("button");
            button.textContent = meal.strCategory;
            

            button.addEventListener("click",()=>{
                fetchRecipes(meal.strCategory)
            })

            categories.appendChild(button);
        })
    }catch {
        console.error("Error fetching categories:", error)
    }
}

const fetchRecipes = async (searchInput)=>{

    recipeContainer.innerHTML =" <h2>Fetching Recipies...</h2>"
    
    try{
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const response = await data.json();

    // console.log(response,"ressssppppppppp");
    
    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div")
        recipeDiv.classList.add("recipe");
        console.log(meal,"meallllllllllllll");
        recipeDiv.innerHTML = `
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
  <div class="recipe-content">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> • ${meal.strCategory}</p>
  </div>
`
                const button = document.createElement('button');
                button.textContent = "View Recipe";
                recipeDiv.appendChild(button);

            // Adding EventListner to recipe button
            button.addEventListener('click',()=>{
                openRecipePopup(meal);
            })
            
        recipeContainer.appendChild(recipeDiv)
        // console.log(meal,"meal");
    });
    }
    catch(error){
        recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    }

    // ss = response.meals[0]
}

const fetchIngredients = (meal)=> {
    let ingredientsList = "";
    for(let i = 1 ; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;

}

const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents: </h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div>
        <h3 class="recipeInstructions">Instructions:</h3>
        <p >${meal.strInstructions}</P>
        </div>
    `
    recipeDetailsContent.parentElement.style.display="block"
}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none"
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput = searchBox.value.trim();
  if(!searchInput){
    recipeContainer.innerHTML = `<h>Type The meal in the search box</h2>`
    return;
  } 
  fetchRecipes(searchInput)
//   console.log("Search button clicked!");
});

window.addEventListener("load", () => {
  fetchRecipes("chicken"); 
});


document.addEventListener("click", (e) => {
  const popup = recipeDetailsContent.parentElement;

  // Skip clicks on "View Recipe" buttons
  if (e.target.textContent === "View Recipe") return;

  if (popup.style.display === "block") {
    popup.style.display = "none";
  }
});


fetchCategories()
