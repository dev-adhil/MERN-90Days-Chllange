const searchBox = document.querySelector('.SearchBox')
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector('.recipe-container')

const fetchRecipes = async (searchInput)=>{

    recipeContainer.innerHTML =" <h2>Fetching Recipies...</h2>"
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const response = await data.json();

    // console.log(response,"ressssppppppppp");
    
    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div")
        recipeDiv.classList.add("recipe");
        console.log(meal,"meallllllllllllll");
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span>Dish</p>
                <p>Belond to <span>${meal.strCategory}</span>Category</p>
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

    // ss = response.meals[0]
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput = searchBox.value.trim(); 
  fetchRecipes(searchInput)
//   console.log("Search button clicked!");
});