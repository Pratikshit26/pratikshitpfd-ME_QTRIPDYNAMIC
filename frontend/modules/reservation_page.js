import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  let getData = await fetch(`${config.backendEndpoint}/reservations`)
  let getDataJson= await getData.json()
  return getDataJson
  }catch(e){
    return null
  }
  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length===0){

    let noReservation = document.getElementById("no-reservation-banner")
    let reservationParentTable = document.getElementById("reservation-table-parent")
    reservationParentTable.style.display = "none"
    noReservation.style.display = "block"
  }else{

    let noReservation = document.getElementById("no-reservation-banner")
    let reservationParentTable = document.getElementById("reservation-table-parent")
    noReservation.style.display = "none"
    reservationParentTable.style.display="block"

    let newDate = new Date(reservations[0].time)
    console.log(newDate.toLocaleDateString())
    console.log(newDate.toLocaleString())
    
    

    for (let i =0; i<reservations.length; i++){

    let newDate = new Date(reservations[i].time)
      let reservationTable = document.getElementById("reservation-table")

      let tr = document.createElement('tr')

      let htmlTable = `
      <td>${reservations[i].id}</td>
      <td>${reservations[i].name}</td>
      <td>${reservations[i].adventureName}</td>
      <td>${reservations[i].person}</td>
      <td>${new Date(reservations[i].date).toLocaleDateString("en-IN")}</td>
      <td>${reservations[i].price}</td>
      <td>${new Date(reservations[i].time).toLocaleString("en-IN", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })}</td>

      <td><div class="reservation-visit-button" id=${
        reservations[i].id
      }><a href="../detail/?adventure=${
        reservations[i].adventure
}">Visit Adventure</a></div></td>

      `
      
      tr.innerHTML= htmlTable
      reservationTable.append(tr)
    }

  }

 

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
