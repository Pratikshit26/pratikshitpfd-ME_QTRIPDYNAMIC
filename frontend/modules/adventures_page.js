import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let q= location.search
  let cityURL = new URLSearchParams(search)
  var  city = cityURL.get("city")
  return city

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
let activities = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
let data = await activities.json()
return data
  }catch(e){
    return null
  }



}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let dataDiv = document.getElementById("data")

adventures.forEach(myFun)

function myFun(loopArr){
  let divElem = document.createElement("div")
  divElem.className=" activity-card col-6 col-lg-3 mb-4" 
  divElem.setAttribute('style', 'padding:0px 0px; ')
  divElem.setAttribute('id', loopArr.name)
  divElem.innerHTML = ` <a href="detail/?adventure=${loopArr.id}" id= "${loopArr.id}" style="width:100%"> <img src = "${loopArr.image}" class= "img-fluid" 
style="width:100%";/>

<p class= "category-banner">${loopArr.category}</p>
<div class= "activity-text">
<p>${loopArr.name}</p>
   <p>${loopArr.costPerHead}</p>
   </div>
 <div class= "activity-text">
  <p>Duration</p>
<p>${loopArr.duration} Hours</p></div></a>


`
dataDiv.append(divElem)
}


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  let newDurationList = list.filter((dur)=>
    dur.duration>=low && dur.duration<=high
  )
return newDurationList
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list


  // let newList = list.filter((cat)=>
  //  cat['category']===categoryList[0]
  // ); 


  let newList = []
  for(let i = 0; i<categoryList.length; i++){
    for(let j = 0; j<list.length; j++){
      if(categoryList[i]===list[j]['category']){
        newList.push(list[j])
      }

    }

  }
  return newList
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = []
  if(filters['duration'].length >0 && filters['category'].length>0){
    let newArr = filters["duration"].split("-")
    let low = parseInt(newArr[0])
    let high = parseInt(newArr[1])
    let filterDur= filterByDuration(list, low, high)
  let  filterCat = filterByCategory(list, filters['category'])
    let durationLength = filterDur.length
    let categoryLength = filterCat.length

    if(durationLength>categoryLength){
      for(let i = 0; i<filterCat.length; i++){
        for(let j = 0; j<filterDur.length; j++){

          if(JSON.stringify(filterCat[i])===JSON.stringify(filterDur[j])){
            filteredList.push(filterCat[i])
            // filteredList.sort((a, b)=>a.id-b.id)
          }
        }
        
      }
    }else{

      for(let i = 0; i<filterDur.length; i++){
        for(let j = 0; j<filterCat.length; j++){

          if(JSON.stringify(filterDur[i])===JSON.stringify(filterCat[j])){
            filteredList.push(filterDur[i])
            // filteredList.sort((a, b)=>a.id-b.id)
          }
        }
      }
    }

   

  } else if (filters["duration"].length>0){

  
    let newArr = filters["duration"].split("-")

    let low = parseInt(newArr[0])
    
    let high = parseInt(newArr[1])
   
    filteredList = filterByDuration(list, low, high)
    }
    
   

  else if (filters['category'].length>0){
   filteredList= filterByCategory(list, filters['category'])
  }
  else{ 
    return list;

  }
  filteredList = filteredList.sort((a, b)=>a.id-b.id)
return filteredList


  // Place holder for functionality to work in the Stubs
 
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  filters = JSON.stringify(filters)
 
  localStorage.setItem('filters', filters )

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
    let data = localStorage.getItem("filters")
    data = JSON.parse(data)
  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}</div>
                `;
    document.getElementById("category-list").appendChild(ele);
  });



}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
