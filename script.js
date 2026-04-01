document.addEventListener("DOMContentLoaded", function(){
  
     const bookingForm =
   document.getElementById("bookingForm");
     const confirmation =
   document.getElementById("confirmation");
    const pricePreview =
   document.getElementById("pricePreview");
    
    const prices = {
     Boracay : 700,
     Siargao : 750,
     Palawan : 800,
     Albay : 500,
     Banawe : 650
   };
    
    function getTripDays (departure, returnDate){
         return Math.ceil ((new Date(returnDate) - new Date(departure)) / (1000 * 60 * 60 * 24));
       }
       
      function calculatePrice (destination, travelers, days) {
        let total= prices [destination] * travelers * days;
      
        if (travelers >= 10){
         total *= 0.8;
       } else if (travelers >=5){
         total *= 0.9;
       }
        return total;
      }
      
  bookingForm.addEventListener("submit", function(event){
    event.preventDefault();
     
     const destinations =
  document.getElementById("destinations").value;
    const departure =
  document.getElementById("departure").value;
    const returnDate =
  document.getElementById("returnDate").value;
    const travelersNum = Number(
  document.getElementById("travelers").value);
    
    if (!destinations || !departure || !returnDate){
    confirmation.innerText =
    `Please complete all the fields!`;
    return;
    }
  
    if (!travelersNum || travelersNum <1){
      confirmation.innerText = `Please enter valid number of traveler/s!`;
      return;
    }
  
      if (returnDate < departure) {
    confirmation.innerText =
    `Return date cannot be before departure date.`;
    return;
  }
  
      const departureDate = new Date(departure);
      const returnDateObj = new Date(returnDate);
      const timeDifference = returnDateObj - departureDate;
      
  
      //DATE CALCULATION
    const tripDays = getTripDays(departure, returnDate);
    if (tripDays <= 0){
      confirmation.innerText =
      "Trip must be atleast 1 day!";
      return;
    }
    
    const total = calculatePrice (destinations, travelersNum, tripDays);
       
    confirmation.innerHTML = `
    <div class="summary-card"> 
    <h3> Trip Summary </h3>
    <p> <strong> Destination: </strong>
     ${destinations} </p>
    <p><strong> Travelers: </strong>${travelersNum} </p>
    <p><strong> Departure Date: </strong>${departure} </p>
    <p><strong> Return Date: </strong> ${returnDate} </p>
   <p><strong>Total Price: </strong> €${total}</p>
   </div>
   `;
   
    bookingForm.reset();
  });
  
  function calculateTotal() {
    const destinations = 
    document.getElementById("destinations").value;
    const travelersNum = Number(
    document.getElementById("travelers").value);
    const departure =
    document.getElementById("departure").
    value;
    const returnDate =
    document.getElementById("returnDate").value;
    
    if (!destinations || !travelersNum || travelersNum < 1 || !departure || !returnDate){
    pricePreview.innerText ="";
    return;
    }
  
    const tripDays = getTripDays (departure, returnDate);
   
    if (tripDays <= 0){
      pricePreview.innerText = "Trip must be atleast 1 day!"
      return;
    }
   
   const total = calculatePrice (destinations, travelersNum, tripDays);
   
   pricePreview.innerText =
   `Destination: ${destinations}
   Travelers: ${travelersNum}
   Duration: ${tripDays}
   Estimated Price: €${total}`;
}
   
   document.getElementById("departure").addEventListener("change", calculateTotal);
   
   document.getElementById("returnDate").addEventListener("change", calculateTotal);
   
   document.getElementById("destinations")
   .addEventListener("change", calculateTotal);
   
   document.getElementById("travelers")
   .addEventListener("input", calculateTotal);
   
       const carousel = 
  document.querySelector(".carousel");
       const slides =
  document.querySelectorAll(".slides li");
  
  let index = 0;
  
  function autoSlide(){
    index++;
    
    if(index >= slides.length ) {
      index = 0;
    }
    carousel.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth"
    });
  }
    setInterval(autoSlide, 3000);
});

