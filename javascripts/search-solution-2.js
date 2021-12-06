//DOM element
const searchBar = document.getElementById('main-searchbar');

//load recipes on each new letter added
searchBar.addEventListener("keypress", ($event) => {
    filteredRecipes = recipes;

    if(searchBar.value.length>1){
        let filterValue = searchBar.value.toLowerCase() + $event.key.toLowerCase();

        

        function filterRecipe(recipe){
            let recipeName = recipe.name.toLowerCase();
            let recipeDescription = recipe.description.toLowerCase();
            let currentRecipeIngredients = recipe.ingredients;

            let currentIngredientsNames = currentRecipeIngredients.map(ingredientFunction);
            let recipeIngredients = currentIngredientsNames.join();

            function ingredientFunction(ingredient){
                return ingredient.ingredient.toLowerCase();
            }

            if(recipeName.includes(filterValue) || recipeDescription.includes(filterValue) || recipeIngredients.includes(filterValue)){
                return true; 
            } else{
                return false;
            }
        }
        
        filteredRecipes = filteredRecipes.filter(filterRecipe);
        
        cardContainer.innerHTML = "";
        loadRecipeCards();
        ingredientsDropdown.innerHTML = "";
        loadIngredientTags();
        devicesDropdown.innerHTML = "";
        loadDeviceTags();
        ustensilsDropdown.innerHTML = "";
        loadUstensilsTags();

        if(filteredRecipes.length < 1){
            cardContainer.innerHTML = "";
            cardContainer.textContent = "No recipe matches your criteria...you can search for 'apple pie', 'fish' etc...";
        };
    }
});

searchBar.addEventListener("keydown", ($event) => {
    if(searchBar.value.length>1 && $event.key == "Backspace"){
        let uncutFilterValue = searchBar.value.toLowerCase();
        let filterValue = uncutFilterValue.slice(0, uncutFilterValue.length - 1);
        filteredRecipes = recipes;
        
        function filterRecipe(recipe){
            let recipeName = recipe.name.toLowerCase();
            let recipeDescription = recipe.description.toLowerCase();
            let currentRecipeIngredients = recipe.ingredients;

            let currentIngredientsNames = currentRecipeIngredients.map(ingredientFunction);
            let recipeIngredients = currentIngredientsNames.join();

            function ingredientFunction(ingredient){
                return ingredient.ingredient.toLowerCase();
            }

            if(recipeName.includes(filterValue) || recipeDescription.includes(filterValue) || recipeIngredients.includes(filterValue)){
                return true; 
            } else{
                return false
            };
        }
        
        filteredRecipes = filteredRecipes.filter(filterRecipe);

        cardContainer.innerHTML = "";
        loadRecipeCards();
        ingredientsDropdown.innerHTML = "";
        loadIngredientTags();
        devicesDropdown.innerHTML = "";
        loadDeviceTags();
        ustensilsDropdown.innerHTML = "";
        loadUstensilsTags();

        if(filteredRecipes.length < 1){
            cardContainer.innerHTML = "";
            cardContainer.textContent = "No recipe matches your criteria...you can search for 'apple pie', 'fish' etc...";
        };
    }
})

    
