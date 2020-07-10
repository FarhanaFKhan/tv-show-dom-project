//You can edit ALL of the code here

let allEpisodes;
const allShows = getAllShows();
const rootElem = document.getElementById("root");
const flexContainer = document.querySelector(".flex-container");
const searchBar = document.getElementById("search-word");
const displayParagraph = document.querySelectorAll(".search-container p");
const dropDownEl = document.getElementById("episode-select");
const showsDropDownEl = document.getElementById("show-select");
const showSearchBoxEl = document.getElementById("show-search-box");
// const showNameEl = document.querySelector(".show-card h2");
// console.log(showNameEl);
let showId;



function setup() {

  showSlides(slideIndex);
  // createShowList(allShows);
  showsDropDownEl.addEventListener('change', selectShow);
  createShowCard(allShows);
  searchBar.style.display = "none";
  dropDownEl.style.display = "none";
  //showsDropDownEl.style.display = "none";
  showSearchBoxEl.addEventListener('keyup',liveSearchShows);
  displayParagraph[1].innerText = "Displaying:" + " " + allShows.length + "/" + allShows.length;
  const showNameEls = document.querySelectorAll(".show-card h2");
  for(let i = 0; i < showNameEls.length; i++){
    
    showNameEls[i].addEventListener('click', clickShow);

  }
  
}



         /*Function for fromatting episode title*/

function addZeros(season, episode){
  if(season <= 9 && episode <= 9){
    return "S0" + season +"E0"+ episode

  } else if(season <= 9 && episode >= 10){
    return "S0" + season + "E"+ episode;
  } else if (episode <= 9 && season >= 10){
    return "S" + season + "E0" + episode;

  }

}

             /*Function for Live Search*/
       

function doLiveSearch(){
  flexContainer.innerHTML ="";
  const term = event.target.value.toLowerCase();
  
    let filteredEpisodes = allEpisodes.filter(episode =>{

        return (episode.name + episode.summary).toLowerCase().includes(term);
      
      })
      
      displayParagraph[1].innerText = `Displaying:${filteredEpisodes.length}/${allEpisodes.length}`;
      
      filteredEpisodes.forEach(episode =>{
        createEpisodeCards(episode);          
      }) 
      
}

        /*function to create the dropdown list for shows */

function createShowList(showsList){  
  showsList.forEach(show =>{
    const optEl = document.createElement("option");
    optEl.value = show.id;
    optEl.textContent = show.name;
    showsDropDownEl.appendChild(optEl);

  })
}   

/*function to search through the shows */
function liveSearchShows(){
  flexContainer.innerHTML ="";
  const term = event.target.value.toLowerCase();
  
    let filteredShows = allShows.filter(show =>{

        return (show.name + show.summary).toLowerCase().includes(term);
      
      })
      
      displayParagraph[1].innerText = `Displaying:${filteredShows.length}/${allShows.length}`;
      createShowCard(filteredShows);  
       
      let prevShows = document.querySelectorAll("#show-select option");
      for(let i = 1; i < prevShows.length; i++){
       showsDropDownEl.removeChild(prevShows[i]);  
      }
      createShowList(filteredShows);            
       
}

     /*function to clear page */
function clearPage(){
  const episodeCards = document.querySelectorAll(".episodes-card");
  let prevEpisodes = document.querySelectorAll("#episode-select option");

  for(let i = 0; i < episodeCards.length; i++){
    flexContainer.removeChild(episodeCards[i]);
  } 

    for(let i = 1; i < prevEpisodes.length; i++){
    dropDownEl.removeChild(prevEpisodes[i]);
  }
}     



/*function for event listener for show name */
function clickShow(){
  let sName = event.target.textContent;
  let showId;
  //clearPage();
  allShows.forEach(show =>{
    if(show.name.includes(sName)){
     return showId = show.id;
    }
    })
  //console.log(showId);
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
   .then(response => response.json())
   .then(data => {
    allEpisodes = data;    
    makePageForEpisodes(allEpisodes);
    searchBar.addEventListener('keyup',doLiveSearch);
    createDropDownList(allEpisodes);
    dropDownEl.addEventListener('change',selectEpisode);
  })
  .catch(err => console.log(err));
    
  
  }


          /*function to select a show */
function selectShow(){ //if typeof target value not a number then get the show id by heading .includes otherwise let it be
   let SHOW_ID = event.target.value;
  
  const episodeSelectEl = document.querySelector("#all-episodes");
  
  if(SHOW_ID === "0"){
    clearPage();
    createShowCard(allShows);
  }else{  
  fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`)
  .then(response => response.json())
  .then(data => {
    allEpisodes = data;    
    makePageForEpisodes(allEpisodes);
    searchBar.addEventListener('keyup',doLiveSearch);
    createDropDownList(allEpisodes);
    dropDownEl.addEventListener('change',selectEpisode);
  })
  .catch(err => console.log(err));
  }

} 



     /*function to create card to display Shows*/

function createShowCard(allShows){
  allShows.forEach(show => {
    const showCardEl = document.createElement("div");
    showCardEl.className = "show-card";
    const showTitleEl = document.createElement("h2");
    const infoDivEl = document.createElement("div");
    infoDivEl.className = "show-card-info";
    const showImageEl = document.createElement("img");
    const showSummaryEl = document.createElement("p");
    const listEl = document.createElement("ul");
    const ratingEl = document.createElement("li");
    const genreEl = document.createElement("li");
    const statusEl = document.createElement("li");
    const runtimeEl = document.createElement("li");

    showTitleEl.textContent = show.name;

    if(show.image != null){
      showImageEl.src = show.image.medium;
    } else{
      showImageEl.src = "https://image.freepik.com/free-vector/image-template-background_1314-149.jpg";
      showImageEl.style.height = '50%';

    }

    showSummaryEl.innerHTML = show.summary;
    ratingEl.textContent = "Rating: " + " " + show.rating.average;
    genreEl.textContent = "Genre: " + " " + show.genres;
    statusEl.textContent = "Status: " + " " + show.status;
    runtimeEl.textContent = "Runtime: " + " " + show.runtime + "mins";      

    flexContainer.appendChild(showCardEl);
    showCardEl.appendChild(showTitleEl);
    showCardEl.appendChild(infoDivEl);
    infoDivEl.appendChild(showImageEl);
    infoDivEl.appendChild(showSummaryEl);
    infoDivEl.appendChild(listEl);
    listEl.appendChild(ratingEl);
    ratingEl.appendChild(genreEl);
    genreEl.appendChild(statusEl);
    statusEl.appendChild(runtimeEl);



  });

}    

           /*function to create the dropdown list for episodes */

function createDropDownList(episodeList){
  let prevEpisodes = document.querySelectorAll("#episode-select option");
  for(let i = 1; i < prevEpisodes.length; i++){
    dropDownEl.removeChild(prevEpisodes[i]);
  }  
  episodeList.forEach(episode => {

    let optionEl = document.createElement("option");
    optionEl.value = episode.name;
    let seasonNumber = episode.season;
    let episodeNumber = episode.number;
    let sE = addZeros(seasonNumber,episodeNumber);
    optionEl.textContent = " ";
    optionEl.textContent = sE + " - " + episode.name;    
    dropDownEl.appendChild(optionEl);   

  })

}  

         

            /*function to select an episode */

function selectEpisode(){
  
  const selected = event.target.value;
  const episodeCards = document.querySelectorAll(".episodes-card");
  const episodeTitles = document.querySelectorAll("h3");
  
  for(let i = 0; i < episodeCards.length; i++){
    if(selected != "showAll"){

      if(episodeTitles[i].innerHTML.includes(selected)){
        episodeCards[i].style.display = 'block';
      }else{
        episodeCards[i].style.display = 'none';
      }
    }else{
      episodeCards[i].style.display = 'inline';
    }
  }
  
}            



                /*function to create episode cards*/

function createEpisodeCards(episode){

  let episodeCardEl = document.createElement("div");
    episodeCardEl.className = "episodes-card";


    let hEl = document.createElement("h3");

    let episodeImgEl = document.createElement("img");

    let episodeDecsriptionEl = document.createElement("p");
    let seasonNumber = episode.season;
    let episodeNumber = episode.number;
    //console.log(s,e);
    let sE = addZeros(seasonNumber,episodeNumber);

    hEl.innerText = episode.name +" - "+ sE;
    if(episode.image === null){
      episodeImgEl.src = "https://image.freepik.com/free-vector/image-template-background_1314-149.jpg";
      episodeImgEl.style.height = '50%'; 
    } else{
      episodeImgEl.src = episode.image.medium;
    }
    
    episodeDecsriptionEl.innerHTML = episode.summary;

    flexContainer.appendChild(episodeCardEl);
    episodeCardEl.appendChild(episodeImgEl);
    episodeCardEl.appendChild(hEl);
    episodeCardEl.appendChild(episodeDecsriptionEl);
}


       /*function to display all the episodes*/

function makePageForEpisodes(episodeList) {

  flexContainer.innerHTML = " "; 
  displayParagraph[1].innerText = `Displaying:${episodeList.length}`;
  searchBar.style.display = "inline";
  showSearchBoxEl.style.display = "none";
  //displayParagraph[0].style.display = "inline";
  displayParagraph[0].textContent = "<< Display Shows";
  displayParagraph[0].style.textDecoration ="underline";
  showsDropDownEl.style.display = "none";
  dropDownEl.style.display ="inline";

  displayParagraph[0].addEventListener('click',()=>{
    console.log("WORK!!");
    clearPage();
    displayParagraph[0].textContent = "Filtering For: ";
    displayParagraph[0].style.textDecoration = "none";
    displayParagraph[1].textContent = "Displaying:" + allShows.length;
    showsDropDownEl.style.display = "inline";
    dropDownEl.style.display ="none";

    createShowCard(allShows);
  });

 
  episodeList.forEach(episode => {

    createEpisodeCards(episode);
  });
}

     /* creatin a slide show */

let slideIndex = 1;
let timer = null;


function plusSlides(n) {
  clearTimeout(timer);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(timer);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n==undefined){
      n = ++slideIndex
    }

  if (n > slides.length) {
      slideIndex = 1
    }

  if (n < 1) {
        slideIndex = slides.length
    }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  timer = setTimeout(showSlides, 2000);
} 









window.onload = setup;

