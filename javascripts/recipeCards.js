//DOM elements
const bodyContainer = document.getElementById('body-container');
const cardContainer = document.getElementById('card-container');
const ingredientsDropdown = document.getElementById('ingredients-dropdown');
const devicesDropdown = document.getElementById('devices-dropdown');
const ustensilsDropdown = document.getElementById('ustensils-dropdown');
const dropDownItems = document.getElementsByClassName('dropdown-item');
const selectedFilters = document.getElementById('selected-filters');

let filteredRecipes = recipes;
let ingredientsArray = [];
let devicesArray = [];
let ustensilsArray = [];

//Function to load cards using filteredrecipe Array
function loadRecipeCards(){
    for (let i=0; i<filteredRecipes.length; i++){
        const newCardCol = document.createElement('section');
        const newCard = document.createElement('section');
        const newCardImage = document.createElement('img');
        const newCardBody = document.createElement('section');
        const titleWithTimer = document.createElement('section');
        const timerIconWithTimer = document.createElement('section');
        const newTitle = document.createElement('h6');
        const timerIcon = document.createElement('i');
        const timer = document.createElement('h5');
        const ingredientsWithDescription = document.createElement('section');
        const list = document.createElement('ul');
        
        const recipeDescription = document.createElement('p');

        newTitle.textContent = filteredRecipes[i].name;
        timer.textContent = filteredRecipes[i].time + " min";
        recipeDescription.textContent = filteredRecipes[i].description;

        newCardCol.classList.add("col-4", "py-3","d-flex", "justify-content-between");
        newCard.classList.add("card", "rounded");
        newCardImage.classList.add("card-img-top", "rounded-top");
        newCardImage.setAttribute("src", "/images/recipe-background.png");
        newCardBody.classList.add("card-body");
        titleWithTimer.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-3");
        timerIconWithTimer.classList.add("d-flex", "justify-content-between", "align-items-center");
        newTitle.classList.add("card-title", "m-0");
        timerIcon.classList.add("far", "fa-clock", "mx-2");
        timer.classList.add("m-0");
        timer.setAttribute("style", "white-space: nowrap;");
        list.classList.add("col-6", "list-group");
        recipeDescription.classList.add("col-6", "mx-1", "card-text");
        recipeDescription.setAttribute("style", "font-size:0.7rem; -webkit-line-clamp:4; display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden; max-height: 70px;");
        ingredientsWithDescription.classList.add("col-12", "d-flex", "h-50");

        cardContainer.appendChild(newCardCol);
        newCardCol.appendChild(newCard);
        newCard.appendChild(newCardImage);
        newCard.appendChild(newCardBody);
        newCardBody.appendChild(titleWithTimer);
        titleWithTimer.appendChild(newTitle);
        titleWithTimer.appendChild(timerIconWithTimer);
        timerIconWithTimer.appendChild(timerIcon);
        timerIconWithTimer.appendChild(timer);
        newCardBody.appendChild(ingredientsWithDescription);
        ingredientsWithDescription.appendChild(list);
        ingredientsWithDescription.appendChild(recipeDescription);

        //loop to create ingredient list
        const recipeIngredients = filteredRecipes[i].ingredients;
        for (let j=0; j<recipeIngredients.length; j++){
            let keys = Object.keys(recipeIngredients[j]);

            const listItem = document.createElement('li');
            const ingredientName = document.createElement('p');
            const ingredientQuantity = document.createElement('p');
            ingredientName.innerHTML = recipeIngredients[j].ingredient + ":" + "&nbsp";

            if(keys.includes("quantity") && keys.includes("unit")){
                ingredientQuantity.innerHTML = recipeIngredients[j].quantity + recipeIngredients[j].unit;
            } else {
                ingredientQuantity.textContent = recipeIngredients[j].quantity;
            }
            
            listItem.classList.add("list-unstyled", "d-flex");
            listItem.setAttribute("style", "font-size:0.7rem");
            ingredientName.classList.add("mb-0");
            ingredientName.setAttribute("style", "font-weight:700");
            ingredientQuantity.classList.add("mb-0");

            list.appendChild(listItem);
            listItem.appendChild(ingredientName);
            listItem.appendChild(ingredientQuantity);

            //Add every ingredients to ingredientsArray for advanced tag search
            ingredientsArray.push(recipeIngredients[j].ingredient);
        }

        //Add every devices to devicesArray
        devicesArray.push(filteredRecipes[i].appliance);

        //Add every ustensils to ustensilsArray
        let allUstensils = filteredRecipes[i].ustensils;
        for (let k=0; k<allUstensils.length; k++){
            ustensilsArray.push(allUstensils[k]);
        }
    };
}

//function to load ingredients of the advanced tag search
function loadIngredientTags(){
    ingredientsArray.sort();
    ingredientsArray = [...new Set(ingredientsArray)];
    
    for (let i=0; i<ingredientsArray.length; i++){
        const newIngredientTag = document.createElement('a');

        newIngredientTag.classList.add("dropdown-item", "text-light");
        newIngredientTag.setAttribute("href", "#");
        newIngredientTag.textContent = ingredientsArray[i];

        ingredientsDropdown.appendChild(newIngredientTag);
    }
}

//function to load Devices of the advanced tag search
function loadDeviceTags(){
    devicesArray.sort();
    devicesArray = [...new Set(devicesArray)];

    for (let i=0; i<devicesArray.length; i++){
        const newDeviceTag = document.createElement('a');

        newDeviceTag.classList.add("dropdown-item", "text-light");
        newDeviceTag.setAttribute("href", "#");
        newDeviceTag.textContent = devicesArray[i];

        devicesDropdown.appendChild(newDeviceTag);
    }
}

//function to load Ustensils of the advanced tag search
function loadUstensilsTags(){
    
    ustensilsArray.sort();
    ustensilsArray = [...new Set(ustensilsArray)];

    for (let i=0; i<ustensilsArray.length; i++){
        const newUstensilTag = document.createElement('a');

        newUstensilTag.classList.add("dropdown-item", "text-light");
        newUstensilTag.setAttribute("href", "#");
        newUstensilTag.textContent = ustensilsArray[i];

        ustensilsDropdown.appendChild(newUstensilTag);
    }
}


//function call to load initial homepage
loadRecipeCards();
loadIngredientTags();
loadDeviceTags();
loadUstensilsTags();


//function add tags and filter recipe cards from selecting an advanced search tag
let advancedSearchArray = [];

for(var i=0; i<dropDownItems.length; i++){
    dropDownItems[i].addEventListener("click", ($event) => {
        const newFilter = document.createElement('div');
        const newCloseIcon = document.createElement('i');

        let parentBackground = $event.target.parentNode.classList[0];

        newFilter.classList.add(parentBackground, "text-light", "rounded", "px-3", "py-1", "mb-2", "me-2");
        newFilter.textContent = $event.target.textContent;
        newFilter.setAttribute("style", "font-size:0.8rem");
        newCloseIcon.classList.add("far", "fa-times-circle", "ms-2");

        selectedFilters.appendChild(newFilter);
        newFilter.appendChild(newCloseIcon);

        advancedSearchArray.push($event.target.textContent.toLowerCase()); //add every selected tags to an array


        function advancedFilter(recipe){ //filtering function, recalled at line 207
            let recipeDevices = recipe.appliance.toLowerCase() + "&nbsp";
            let currentRecipeIngredients = recipe.ingredients;
            let currentRecipeUstensils = recipe.ustensils;
            let ingredientList = "";
            let ustensilList = "";
            

            for(let k=0; k<currentRecipeIngredients.length; k++){
                ingredientList += currentRecipeIngredients[k].ingredient.toLowerCase() + "&nbsp";
            }

            for(let l=0; l<currentRecipeUstensils.length; l++){
                ustensilList += currentRecipeUstensils[l].toLowerCase() + "&nbsp";
            }

            let totalRecipeData = recipeDevices += ustensilList += ingredientList;

            let doesArrayContainSearchInput = advancedSearchArray.every(fruit => totalRecipeData.includes(fruit)); //does the array contain all tags selected (returns boulean)

            return doesArrayContainSearchInput;
        }

        filteredRecipes = filteredRecipes.filter(advancedFilter);

        cardContainer.innerHTML = ""; //clear cards
        loadRecipeCards(); //reload cards using new data
    });
};