//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {

  const rootElem = document.getElementById("root");

  const flexContainer = document.querySelector(".flex-container");

  function addZeros(season, episode){
    if(season <= 9 && episode <= 9){
      return "S0" + season +"E0"+ episode

    } else if(season <= 9 && episode >= 10){
      return "S0" + season + "E"+ episode;
    } else if (episode <= 9 && season >= 10){
      return "S" + season + "E0" + episode;

    }

  }

  episodeList.forEach(function(episode,index){

    let episodeCardEl = document.createElement("div");
    episodeCardEl.className = "episodes-card";

    let episodeContentEl = document.createElement("div");
    episodeContentEl.className = "episodes";

    let hEl = document.createElement("h3");

    let episodeImgEl = document.createElement("img");

    let episodeDecsriptionEl = document.createElement("p");
    let s = episode.season;
    let e = episode.number;
    console.log(s,e);
    let sE = addZeros(s,e);

    if(index % 3 === 0 ){

    let rowEl = document.createElement("div");
    rowEl.className ="rows";
    flexContainer.appendChild(rowEl);


    hEl.innerText = episode.name +" - "+ sE;
    // console.log(hEl);
    episodeImgEl.src = episode.image.medium;
    episodeDecsriptionEl.innerHTML = episode.summary;

    rowEl.appendChild(episodeCardEl);
    episodeCardEl.appendChild(episodeContentEl);
    //episodeContentEl.appendChild(hEl);
    episodeContentEl.appendChild(episodeImgEl);
    episodeContentEl.appendChild(hEl);
    episodeContentEl.appendChild(episodeDecsriptionEl);
    }
    else{
      let rows = document.querySelectorAll(".rows");
      rows.forEach(row => {
        if(index % 3 === 1 || index % 3 ===2){

          hEl.innerText = episode.name +" - "+ sE;
        
          episodeImgEl.src = episode.image.medium;
          episodeDecsriptionEl.innerHTML = episode.summary;

          row.appendChild(episodeCardEl);
          episodeCardEl.appendChild(episodeContentEl);
         // episodeContentEl.appendChild(hEl);
          episodeContentEl.appendChild(episodeImgEl);
          episodeContentEl.appendChild(hEl);
          episodeContentEl.appendChild(episodeDecsriptionEl);
        }
      })
    }





  });

  

  

  

    
}

window.onload = setup;
