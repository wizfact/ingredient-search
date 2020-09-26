const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  //check if empty
  if(term.trim()){
    fetch(`http://basicrecipeapi.herokuapp.com/api/?search=${term}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if(data.length === 0){
        resultHeading.innerHTML = `<p>There are no recipes with these ingredients !<p>`;
      } else{
        mealsEl.innerHTML = data.map( recipe =>`
        <div class = "meal">
        <img src = "images/food_img.png" alt="placeholder food image" />
        <div class = "meal-info" data-mealID="${recipe.id}">
         <h3>${recipe.recipe_name}</h3>
         </div>
         </div>`).join('');
      }
      
    });

    search.value = "";
  }
  
  else{
    alert("Please enter at least 1 ingredient")
  }

}

//fetch recipe by id
function getRecipeById(mealID){
  fetch(`http://basicrecipeapi.herokuapp.com/api/${mealID}`)
  .then(res => res.json())
  .then(data =>{
    single_mealEl.innerHTML = `
    <div class = "single-meal">
      <h1>${data['recipe_name']}</h1>
      <div class = "directions">
        <h2>Ingredients</h2>
        <p>${data['recipe_ingredients']}</p> 
        <h2>Directions</h2>
        <p>${data['recipe_directions']}</p>
               
      </div>
    </div>`;
  })
}

// Event listeners
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click',e =>{
  const mealInfo = e.path.find(item =>{
    if(item.classList){
      return item.classList.contains('meal-info');
    }
    else{
      return false;
    }
  });

  if(mealInfo){
    const mealID = mealInfo.getAttribute('data-mealID');
    //clear recipes
    mealsEl.innerHTML = ""
    getRecipeById(mealID);
  }
});
