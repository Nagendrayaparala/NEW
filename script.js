const accesskey="9zEUcqpVNuv1-aPx_mvZX3Fc9hL-GV_A_tD4kv94NPk";

const FormEl = document.querySelector("form");
const inputEl = document.getElementById("Search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more");

let inputDate = ""
let page = 1;

async function searchImage(){
    inputDate =inputEl.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputDate}&client_id=${accesskey}`

    const response = await fetch(url);
    const data = await response.json();

    const results =data.results;

    if(page ===1){
        searchresults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchresults.appendChild(imageWrapper);


    });
    page++
    if(page > 1){
        showmore.style.display = "block"
    }
}

FormEl.addEventListener("submit",(event) =>{

        event.preventDefault()
        page = 1;
        searchImage()
})
showmore.addEventListener("click",() =>{
    searchImage()
})