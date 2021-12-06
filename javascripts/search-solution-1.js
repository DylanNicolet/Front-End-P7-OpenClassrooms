//DOM element
const searchBar = document.getElementById('main-searchbar');

//load recipes on each new letter added
searchBar.addEventListener("keypress", ($event) => {
    if(searchBar.value.length>1){
        let filterValue = searchBar.value.toLowerCase() + $event.key.toLowerCase();
        filteredRecipes = [];
        
        for(let i=0; i<recipes.length; i++){
            let recipeName = recipes[i].name.toLowerCase();
            let recipeDescription = recipes[i].description.toLowerCase();
            let currentRecipeIngredients = recipes[i].ingredients;
            let ingredientList = "";
            

            for(let j=0; j<currentRecipeIngredients.length; j++){
                ingredientList += currentRecipeIngredients[j].ingredient.toLowerCase();
            }

            
            if(recipeName.includes(filterValue) || recipeDescription.includes(filterValue) || ingredientList.includes(filterValue)){
                filteredRecipes.push(recipes[i]);
                
            }
            
        }

        cardContainer.innerHTML = "";
        loadRecipeCards();
    }
});

//load recipes on backspace press
searchBar.addEventListener("keydown", ($event) => {
    if(searchBar.value.length>1 && $event.key == "Backspace"){
        let uncutFilterValue = searchBar.value.toLowerCase();
        let filterValue = uncutFilterValue.slice(0, uncutFilterValue.length - 1);
        filteredRecipes = [];
        
        for(let i=0; i<recipes.length; i++){
            let recipeName = recipes[i].name.toLowerCase();
            let recipeDescription = recipes[i].description.toLowerCase();
            let currentRecipeIngredients = recipes[i].ingredients;
            let ingredientList = "";
            

            for(let j=0; j<currentRecipeIngredients.length; j++){
                ingredientList += currentRecipeIngredients[j].ingredient.toLowerCase();
            }

            
            if(recipeName.includes(filterValue) || recipeDescription.includes(filterValue) || ingredientList.includes(filterValue)){
                filteredRecipes.push(recipes[i]);
                
            }
            
        }

        cardContainer.innerHTML = "";
        loadRecipeCards();
    }
})