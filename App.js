"use Strict";
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const activity = document.getElementById("activity");
const generateMealBtn = document.getElementById("btn");
const box_1 = document.getElementsByClassName("box1");
const box_2 = document.getElementsByClassName("box2");
const box_3 = document.getElementsByClassName("box3");
const recipeBtn = document.getElementById("button");
const card = document.querySelector(".card-box");
const ingrediants =  document.querySelector(".ingrediants");
const equipment = document.querySelector(".equipment");
const steps = document.querySelector(".steps");
const tbody = document.querySelector("tbody") ///
const load = document.querySelector("#load");
// api Key 
const apiKey =  "6d9547fa048e42759cdedfee1d0bedda";
const apiKey1 = "28a27230c01e46d8ac7113711190781b";
const apiKey2 = "4c30305842244bdc959fe01d7ba4daf1";
const apiKey3 = "2530ebb758e9458b97b8ea62b2f8a259";
const apiKey5 = "58b70ad75cfd44faaf2caaee62677046";
const apiKey6 = "3d93ff6153e94458815b41f23462d782";


async function mealColories() {
    let bmrMale = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
    let bmrFemale = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
    if (gender.value === "male" && activity.value === "light") {
        var calories = bmrMale * 1.375;
    }
    else if (gender.value === "male" && activity.value === "moderate") {
        var calories = bmrMale * 1.55;
    }
    else if (gender.value === "male" && activity.value === "active") {
        var calories = bmrMale * 1.725;
    }
    else if (gender.value === "female" && activity.value === "light") {
        var calories = bmrFemale * 1.375;
    }
    else if (gender.value === "female" && activity.value === "moderate") {
        var calories = bmrFemale * 1.55;
    }
    else if (gender.value === "female" && activity.value === "active") {
        var calories = bmrFemale * 1.725;
    }
    const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey6}&timeFrame=day&targetCalories=${calories}`;
    const resp = await fetch(url);
    const respData = await resp.json();
    return respData;
}

async function mealData (data){
    card.innerHTML = " ";
    ingrediants.innerHTML = " ";
    equipment.innerHTML = " ";
    steps.innerHTML = " ";
    data.map(async (i)=>{
        const mealUrl = `https://api.spoonacular.com/recipes/${i.id}/information?apiKey=${apiKey6}&includeNutrition=false`;
        const respMeal = await fetch(mealUrl);
        const res = await respMeal.json();
        load.style.display = "block"
        setTimeout(() => {
            load.style.display = "None";
            generateHTML(res);
        }, 1500);
    })
}
async function generateMeal(){
    const data =await mealColories()
    await mealData(data.meals);
}
generateMealBtn.addEventListener('click', generateMeal);


// Generate Html Function
function generateHTML(results) {
    const item = document.createElement("span");
    const img = document.createElement("img");
    const title = document.createElement("h3")
    let getRecipeBtn = document.createElement("Button");
    item.setAttribute("class","grid");

    function getRecipeData(){
        ingrediants.innerHTML = " ";
        ingrediants.innerHTML = `<h2>Ingredients</h2>`;
        let apiIngre = results.extendedIngredients;
        for(let i=0;i<apiIngre.length;i++){
            let para = document.createElement("li");
            let newPara = apiIngre[i].original;
            para.innerHTML = newPara;
            ingrediants.appendChild(para);
        }
        equipment.innerHTML = " ";
        equipment.innerHTML = `<h2>Equipment</h2>`;

        for(let j=0;j<results.analyzedInstructions.length;j++){
            let apiEqipment = results.analyzedInstructions[j].steps;
            for(let i=0;i<apiEqipment.length;i++){
                let apiEqipment2 = apiEqipment[i].equipment;
                for(let k=0;k<apiEqipment2.length;k++){
                let para = document.createElement("li");
                let newPara = apiEqipment2[k].name;
                para.innerHTML = newPara;
                equipment.appendChild(para);
            }
        }
        }
        steps.innerHTML = " ";
        steps.innerHTML = `<h2>Steps</h2>`;
        let ol = document.createElement("ol");
        for(let j=0;j<results.analyzedInstructions.length;j++){
        let apiStep = results.analyzedInstructions[j].steps
        for(let i=0;i<apiStep.length;i++){
            let para = document.createElement("li");
            let newPara = apiStep[i].step;
            para.innerHTML = newPara;
            ol.appendChild(para)
            steps.appendChild(ol);
        }
    }   
    }
    getRecipeBtn.setAttribute("class" , "get-btn");
    card.addEventListener("click", getRecipeData);
    img.setAttribute("src", results.image);
    title.innerHTML = results.title;
    getRecipeBtn.innerHTML = "Get Receipe";
    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(getRecipeBtn);
    card.appendChild(item);
     let anchorTag = document.createElement("a");
    let link = document.createTextNode("Get Recipi");
    let anchorDiv =  document.createElement("div"); 
    anchorDiv.classList = "getrecipe";
    anchorDiv.appendChild(anchorTag);
    anchorTag.appendChild(link);
    anchorTag.setAttribute("href" , results.spoonacularSourceUrl);
    anchorTag.setAttribute("target" , "_blank");
}

// Initial Meal Data 
async function initialMeal() { //steps 1 return meal[2]
    const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey6}&timeFrame=day`
    const api = await fetch(url);
    const resp = await api.json();
    return resp; //meal[2]
} 

async function initialMealData (data){ // api meal[2]; // steps 2
    card.innerHTML = " ";
    data.map(async (i)=>{ //meal[1] // 456
        const mealUrl = `https://api.spoonacular.com/recipes/${i.id}/information?apiKey=${apiKey6}&includeNutrition=false`;
        const respMeal = await fetch(mealUrl); //456
        const res = await respMeal.json(); 
        load.style.display = "block"
        setTimeout(() => {
            load.style.display = "None";
            generateHTML(res);

        }, 2000);
    })
} 
//final step 
async function generateInitialMeal(){
    const data = await initialMeal()
    await initialMealData(data.meals);
}



generateInitialMeal();
