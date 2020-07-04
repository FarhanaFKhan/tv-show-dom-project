//You can edit ALL of the code here

let allEpisodes;
const allShows = getAllShows();
const rootElem = document.getElementById("root");
const flexContainer = document.querySelector(".flex-container");
const searchBar = document.getElementById("search-word");
const displayParagraph = document.querySelector(".search-container p");
const dropDownEl = document.getElementById("episode-select");
const showsDropDownEl = document.getElementById("show-select");

function setup() {

  showSlides(slideIndex);
  createShowList(allShows);
  showsDropDownEl.addEventListener('change', selectShow);
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
  
    let filtered = allEpisodes.filter(episode =>{

        return (episode.name + episode.summary).toLowerCase().includes(term);
      
      })
      
      displayParagraph.innerText = `Displaying:${filtered.length}/${allEpisodes.length}`;
      
      filtered.forEach(episode =>{

        createEpisodeCards(episode);
        console.log(episode.name + "-->"+episode.summary);
  
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

          /*function to select a show */
function selectShow(){
  let SHOW_ID = event.target.value;
  const episodeSelectEl = document.querySelector("#all-episodes");
  console.log(episodeSelectEl);
  
  fetch(`https://api.tvmaze.com/shows/${SHOW_ID}/episodes`)
  .then(response => response.json())
  .then(data => {
    allEpisodes = data;  
    //console.log(allEpisodes.names);
    makePageForEpisodes(allEpisodes);
    searchBar.addEventListener('keyup',doLiveSearch);
    createDropDownList(allEpisodes);
    dropDownEl.addEventListener('change',selectEpisode);
  })
  .catch(err => console.log(err));

} 

           /*function to create the dropdown list for episodes */
function createDropDownList(episodeList){
  let prevEpisodes = document.querySelectorAll("#episode-select option");
  for(let i = 1; i < prevEpisodes.length; i++){
    dropDownEl.removeChild(prevEpisodes[i]);
  }
  console.log(prevEpisodes);

  episodeList.forEach(episode => {
    let optionEl = document.createElement("option");
    optionEl.value = episode.name;
    let seasonNumber = episode.season;
    let episodeNumber = episode.number;
    let sE = addZeros(seasonNumber,episodeNumber);
    optionEl.textContent = " ";
    optionEl.textContent = sE + " - " + episode.name;
    //console.log(optionEl);
    dropDownEl.appendChild(optionEl);
    //console.log(sE + " - " + episode.name);

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
        //console.log(episodeCards[i]);
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
    // console.log(hEl);
    episodeImgEl.src = episode.image.medium;
    episodeDecsriptionEl.innerHTML = episode.summary;

    flexContainer.appendChild(episodeCardEl);
    episodeCardEl.appendChild(episodeImgEl);
    episodeCardEl.appendChild(hEl);
    episodeCardEl.appendChild(episodeDecsriptionEl);
}


       /*function to display all the episodes*/

function makePageForEpisodes(episodeList) {

  flexContainer.innerHTML = " "; 
 
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

