// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'live_dJsh3SiYwCekpmIVtVIfO8z0lYo5PabuNpCyPDF71vAPmfofuJOI0uJnCvL6Serf';
const apiUrl = 'https://api.thedogapi.com/v1/breeds';
const searchList = document.querySelector(".search-list")
const sampleTiles = document.querySelector(".sample-tiles")

// Make a GET request to the Cat API to get all cat breeds



fetch(apiUrl, {
    headers: {
        'x-api-key': apiKey
    }}
    ).then(response => response.json())
    .then (data => {
       const dogs = data;
       const dogImages = [];

       for (let i=0; i < 15; i++){
        const ImageURL = data[i].image.url;
        dogImages.push(ImageURL);
       
       }
       
       dogImages.forEach(dogImage =>{
        const image = document.createElement("img");
        image.setAttribute('width', 200)
        image.setAttribute('height', 200)
        image.classList.add("dog-image");
        image.src = dogImage;
        sampleTiles.append(image);

       })


        
       
        dogs.forEach(element=> {
        const option = document.createElement("option");
        option.classList.add("dog-name");
        searchList.appendChild(option);
        option.textContent = element.name;

        

    


        
    })}).catch(error => console.error("Błąd" + error))











