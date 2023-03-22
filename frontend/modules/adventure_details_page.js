import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureURL = new URLSearchParams(search)
 
  let adventure = adventureURL.get("adventure")


  // Place holder for functionality to work in the Stubs
  return adventure;
}



//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  let fetchAdventureDetails = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
  let data = await fetchAdventureDetails.json()
  
  return data;
  }catch(e){
    return null
  }

  // Place holder for functionality to work in the Stubs

}




//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM



  let title = document.getElementById("adventure-name")
  title.innerHTML = `${adventure.name}`

  let subTitle = document.getElementById("adventure-subtitle")
  subTitle.innerHTML= `${adventure.subtitle}`


  let images = document.getElementById("photo-gallery")
  for(let i = 0; i<adventure.images.length; i++){
    let imageDiv = document.createElement('div')
    imageDiv.className="mb-1"
   
 imageDiv.innerHTML = `<img src = "${adventure.images[i]}" class="activity-card-image"/>`
  
    
    images.append(imageDiv)
   
  }

let content = document.getElementById("adventure-content")

content.innerHTML = `${adventure.content}`


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  
  let allImages = document.getElementById("photo-gallery");
  
  allImages.innerHTML= `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" id = "newImages">
  
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`

let newImages = document.getElementById("newImages")
let imagIter = images.map(function (image){
  let newDiv = document.createElement('div')
  newDiv.className= 'carousel-item'
  newDiv.innerHTML= `<img src="${image}" class="d-block w-100 activity-card-image">`
newImages.append(newDiv)

})
let active = document.getElementsByClassName("carousel-item")
let addClass = active[0]
addClass.className = "carousel-item active"

  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out")
  let reservationPanel = document.getElementById("reservation-panel-available")
  let costPerPerson = document.getElementById("reservation-person-cost")

  if(adventure.available){
      soldOut.style.display="none"
      reservationPanel.style.display="block"
      costPerPerson.textContent = adventure.costPerHead
  }else{
    reservationPanel.style.display = "none"
    soldOut.style.display="block"
  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 let reservationPrice = document.getElementById("reservation-cost")

 let totalPersons = parseInt(persons)

 let cost = adventure.costPerHead*totalPersons
 
 reservationPrice.textContent= cost
 

}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formElements = form.elements;

    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    });

    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    } catch (err) {
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });

  
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  let banner = document.getElementById("reserved-banner")
  banner.style.display ="block"
} else{
  let banner = document.getElementById("reserved-banner")
  banner.style.display = "none"
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
