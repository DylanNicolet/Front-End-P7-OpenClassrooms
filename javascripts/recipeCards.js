//DOM elements
const bodyContainer = document.getElementById('body-container');
const cardContainer = document.getElementById('card-container');
const ingredientsDropdown = document.getElementById('ingredients-dropdown');
const devicesDropdown = document.getElementById('devices-dropdown');
const ustensilsDropdown = document.getElementById('ustensils-dropdown');
const dropDownItems = document.getElementsByClassName('dropdown-item');
const selectedFilters = document.getElementById('selected-filters');
const tagRemoveIcon = document.getElementsByClassName('tag-close-button');
const ingredientsInput = document.getElementById('ingredients-filter');
const devicesInput = document.getElementById('devices-filter');
const ustensilsInput = document.getElementById('ustensils-filter');
const ingredientGroup = document.getElementById('ingredient-group');
const deviceGroup = document.getElementById('device-group');
const ustensilGroup = document.getElementById('ustensil-group');


//initialise needed arrays
let filteredRecipes = recipes;
let ingredientsArray = [];
let devicesArray = [];
let ustensilsArray = [];
let advancedSearchArray = [];//array used for advanced filtering of recipes

//Function to load cards using filteredrecipe Array
function loadRecipeCards(){
    ingredientsArray = [];
    devicesArray = [];
    ustensilsArray = [];

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

//function used for .filter() in the following 3 functions
function advancedFilter(recipe){
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

//function to load ingredients of the advanced tag search
function loadIngredientTags(){
    ingredientsArray.sort(); //organise by alphabetical order
    ingredientsArray = [...new Set(ingredientsArray)]; //removes duplicates
    
    for (let i=0; i<ingredientsArray.length; i++){
        const newIngredientTag = document.createElement('a');

        newIngredientTag.classList.add("dropdown-item", "text-light");
        newIngredientTag.setAttribute("href", "#");
        newIngredientTag.textContent = ingredientsArray[i];

        ingredientsDropdown.appendChild(newIngredientTag);

        newIngredientTag.addEventListener("click", ($event) => { //event listener for every ingredient added
            
            const newFilter = document.createElement('div');
            const newCloseAnchor = document.createElement('a');
            const newCloseIcon = document.createElement('i');

            let parentBackground = $event.target.parentNode.classList[0];

            newFilter.classList.add(parentBackground, "text-light", "rounded", "px-3", "py-1", "mb-2", "me-2");
            newFilter.textContent = $event.target.textContent;
            newFilter.setAttribute("style", "font-size:0.8rem");
            newCloseIcon.classList.add("far", "fa-times-circle", "ms-2");
            newCloseIcon.setAttribute("id", $event.target.textContent.toLowerCase());
            newCloseAnchor.setAttribute("href", "#");
            newCloseAnchor.classList.add("tag-close-button", "text-light");

            selectedFilters.appendChild(newFilter);
            newFilter.appendChild(newCloseAnchor);
            newCloseAnchor.appendChild(newCloseIcon);

            advancedSearchArray.push($event.target.textContent.toLowerCase()); //add every selected tags to an array

            filteredRecipes = filteredRecipes.filter(advancedFilter);
            
            cardContainer.innerHTML = ""; //clear cards
            loadRecipeCards(); //reload cards using new data

            ingredientsDropdown.innerHTML = "";
            loadIngredientTags();
            devicesDropdown.innerHTML = "";
            loadDeviceTags();
            ustensilsDropdown.innerHTML = "";
            loadUstensilsTags();

            ingredientsInput.value = "";


            /*newCloseAnchor.addEventListener("click", ($event) => {
                $event.target.parentNode.parentNode.remove();
                advancedSearchArray = advancedSearchArray.filter(item => item !== $event.target.id);
                filteredRecipes = filteredRecipes.filter(advancedFilter);

                loadRecipeCards;
                console.log(advancedSearchArray);
            });*/
        });
    }
}  

//function to load Devices of the advanced tag search
function loadDeviceTags(){
    devicesArray.sort(); //organise by alphabetical order
    devicesArray = [...new Set(devicesArray)]; //removes duplicates
    
    for (let i=0; i<devicesArray.length; i++){
        const newDeviceTag = document.createElement('a');

        newDeviceTag.classList.add("dropdown-item", "text-light");
        newDeviceTag.setAttribute("href", "#");
        newDeviceTag.textContent = devicesArray[i];

        devicesDropdown.appendChild(newDeviceTag);

        newDeviceTag.addEventListener("click", ($event) => { //event listener for every ingredient added
            
            const newFilter = document.createElement('div');
            const newCloseAnchor = document.createElement('a');
            const newCloseIcon = document.createElement('i');

            let parentBackground = $event.target.parentNode.classList[0];

            newFilter.classList.add(parentBackground, "text-light", "rounded", "px-3", "py-1", "mb-2", "me-2");
            newFilter.textContent = $event.target.textContent;
            newFilter.setAttribute("style", "font-size:0.8rem");
            newCloseIcon.classList.add("far", "fa-times-circle", "ms-2");
            newCloseIcon.setAttribute("id", $event.target.textContent.toLowerCase());
            newCloseAnchor.setAttribute("href", "#");
            newCloseAnchor.classList.add("tag-close-button", "text-light");

            selectedFilters.appendChild(newFilter);
            newFilter.appendChild(newCloseAnchor);
            newCloseAnchor.appendChild(newCloseIcon);

            advancedSearchArray.push($event.target.textContent.toLowerCase()); //add every selected tags to an array

            filteredRecipes = filteredRecipes.filter(advancedFilter);

            cardContainer.innerHTML = ""; //clear cards
            loadRecipeCards(); //reload cards using new data

            ingredientsDropdown.innerHTML = "";
            loadIngredientTags();
            devicesDropdown.innerHTML = "";
            loadDeviceTags();
            ustensilsDropdown.innerHTML = "";
            loadUstensilsTags();

            devicesInput.value = "";

            /*newCloseAnchor.addEventListener("click", ($event) => {
                $event.target.parentNode.parentNode.remove();
                advancedSearchArray = advancedSearchArray.filter(item => item !== $event.target.id);
                filteredRecipes = filteredRecipes.filter(advancedFilter);

                loadRecipeCards;
                console.log(advancedSearchArray);
            });*/
        });
    }
}

//function to load ustensils of the advanced tag search
function loadUstensilsTags(){
    ustensilsArray.sort(); //organise by alphabetical order
    ustensilsArray = [...new Set(ustensilsArray)]; //removes duplicates
    
    for (let i=0; i<ustensilsArray.length; i++){
        const newUstensilsTag = document.createElement('a');

        newUstensilsTag.classList.add("dropdown-item", "text-light");
        newUstensilsTag.setAttribute("href", "#");
        newUstensilsTag.textContent = ustensilsArray[i];

        ustensilsDropdown.appendChild(newUstensilsTag);

        newUstensilsTag.addEventListener("click", ($event) => { //event listener for every ingredient added
            
            const newFilter = document.createElement('div');
            const newCloseAnchor = document.createElement('a');
            const newCloseIcon = document.createElement('i');

            let parentBackground = $event.target.parentNode.classList[0];

            newFilter.classList.add(parentBackground, "text-light", "rounded", "px-3", "py-1", "mb-2", "me-2");
            newFilter.textContent = $event.target.textContent;
            newFilter.setAttribute("style", "font-size:0.8rem");
            newCloseIcon.classList.add("far", "fa-times-circle", "ms-2");
            newCloseIcon.setAttribute("id", $event.target.textContent.toLowerCase());
            newCloseAnchor.setAttribute("href", "#");
            newCloseAnchor.classList.add("tag-close-button", "text-light");

            selectedFilters.appendChild(newFilter);
            newFilter.appendChild(newCloseAnchor);
            newCloseAnchor.appendChild(newCloseIcon);

            advancedSearchArray.push($event.target.textContent.toLowerCase()); //add every selected tags to an array

            filteredRecipes = filteredRecipes.filter(advancedFilter);

            cardContainer.innerHTML = ""; //clear cards
            loadRecipeCards(); //reload cards using new data

            ingredientsDropdown.innerHTML = "";
            loadIngredientTags();
            devicesDropdown.innerHTML = "";
            loadDeviceTags();
            ustensilsDropdown.innerHTML = "";
            loadUstensilsTags();

            ustensilsInput.value = "";

            /*newCloseAnchor.addEventListener("click", ($event) => {
                $event.target.parentNode.parentNode.remove();
                advancedSearchArray = advancedSearchArray.filter(item => item !== $event.target.id);
                filteredRecipes = filteredRecipes.filter(advancedFilter);

                loadRecipeCards;
                console.log(advancedSearchArray);
            });*/
        });
    }
}


//function call to load initial homepage
loadRecipeCards();
loadIngredientTags();
loadDeviceTags();
loadUstensilsTags();

//load ingredients of Advanced search with user typing input
ingredientsInput.addEventListener("keypress", ($event) => {
    let ingredientInputValue = ingredientsInput.value.toLowerCase() + $event.key.toLowerCase();

    function filterIngredients(ingredient){
        return ingredient.toLowerCase().includes(ingredientInputValue);
    }

    ingredientsArray = ingredientsArray.filter(filterIngredients);

    ingredientsDropdown.innerHTML = "";
    loadIngredientTags();

    onFocusInput(ingredientGroup, ingredientsDropdown, ingredientsInput, " an ingredient");
});

//load devices of Advanced search with user typing input
devicesInput.addEventListener("keypress", ($event) => {
    let deviceInputValue = devicesInput.value.toLowerCase() + $event.key.toLowerCase();

    function filterdevices(device){
        return device.toLowerCase().includes(deviceInputValue);
    }

   devicesArray = devicesArray.filter(filterdevices);

    devicesDropdown.innerHTML = "";
    loadDeviceTags();

    onFocusInput(deviceGroup, devicesDropdown, devicesInput, " a device");
});

//load ustensils of Advanced search with user typing input
ustensilsInput.addEventListener("keypress", ($event) => {
    let ustensilInputValue = ustensilsInput.value.toLowerCase() + $event.key.toLowerCase();

    function filterustensils(ustensil){
        return ustensil.toLowerCase().includes(ustensilInputValue);
    }

    ustensilsArray = ustensilsArray.filter(filterustensils);

    ustensilsDropdown.innerHTML = "";
    loadUstensilsTags();

    onFocusInput(ustensilGroup, ustensilsDropdown, ustensilsInput, " a ustensil");
});


//function for focus use in HTML
function onFocusInput(Group, Dropdown, Input, PlaceHolder){
    Group.classList.remove("col-2", "rounded");
    Group.classList.add("rounded-0","rounded-top");
    Input.setAttribute("placeholder", "Search" + PlaceHolder);

    if(Dropdown.childElementCount > 2){
        Group.setAttribute("style", "width: 720px");
        Dropdown.setAttribute("style", "min-width: 720px; max-width: 720px; top: 43px;");
    } if(Dropdown.childElementCount == 2){
        Group.setAttribute("style", "width: 400px");
        Dropdown.setAttribute("style", "min-width: 400px; max-width: 400px; top: 43px;");
    } if(Dropdown.childElementCount < 2){
        Group.setAttribute("style", "min-width: 300px; max-width: 300px");
        Dropdown.setAttribute("style", "min-width: 300px; max-width: 300px; top: 43px;");
    } if(Dropdown.childElementCount == 0){
        Group.classList.add("col-2", "rounded");
        Group.classList.remove("rounded-0","rounded-top");
        Dropdown.setAttribute("style", "display:none;");
    }
}

//focus for blur use in HTML
function onBlurInput(Group, Input, PlaceHolder){
    Group.classList.add("col-2", "rounded");
    Group.removeAttribute("style");
    Group.classList.remove("rounded-0","rounded-top");
    Input.setAttribute("placeholder", PlaceHolder);
}