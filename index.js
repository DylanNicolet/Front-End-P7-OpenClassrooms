//DOM elements
const bodyContainer = document.getElementById('body-container');
const cardContainer = document.getElementById('card-container');


//Create initial cards
for (let i=0; i<recipes.length; i++){
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

    newTitle.textContent = recipes[i].name;
    timer.textContent = recipes[i].time + " min";
    recipeDescription.textContent = recipes[i].description;

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
    list.classList.add("list-group");
    recipeDescription.classList.add("card-text")
    ingredientsWithDescription.classList.add("d-flex");

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
    const recipeIngredients = recipes[i].ingredients;
    for (let j=0; j<recipeIngredients.length; j++){
        let keys = Object.keys(recipeIngredients[j]);

        const listItem = document.createElement('li');
        const ingredientName = document.createElement('p');
        const ingredientQuantity = document.createElement('p');
        ingredientName.textContent = recipeIngredients[j].ingredient + ":";

        if(keys.includes("quantity") && keys.includes("unit")){
            ingredientQuantity.textContent = recipeIngredients[j].quantity + recipeIngredients[j].unit;
        } else {
            ingredientQuantity.textContent = recipeIngredients[j].quantity;
        }
        
        listItem.classList.add("list-unstyled", "d-flex");
        ingredientName.classList.add("font-weight-bold", "mb-0");
        ingredientQuantity.classList.add("mb-0");

        list.appendChild(listItem);
        listItem.appendChild(ingredientName);
        listItem.appendChild(ingredientQuantity);
    }
};

