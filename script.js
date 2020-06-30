//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
const flexContainer = document.querySelector(".flex-container");
const searchBar = document.getElementById("search-word");
const displayParagraph = document.querySelector(".search-container p");

function setup() {

  
  makePageForEpisodes(allEpisodes);
  searchBar.addEventListener('keyup',doLiveSearch); 

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
   



                /*function to create episode cards*/

function createEpisodeCards(episode){

  let episodeCardEl = document.createElement("div");
    episodeCardEl.className = "episodes-card";


    let hEl = document.createElement("h3");

    let episodeImgEl = document.createElement("img");

    let episodeDecsriptionEl = document.createElement("p");
    let s = episode.season;
    let e = episode.number;
    //console.log(s,e);
    let sE = addZeros(s,e);

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
  
 

  episodeList.forEach(function(episode){

    createEpisodeCards(episode);
  });

  // searchBar.addEventListener('keyup', doLiveSearch);

  

  

  

    
}

window.onload = setup;

