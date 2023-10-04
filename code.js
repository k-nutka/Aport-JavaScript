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


       dogs.forEach(element=> {
        const option = document.createElement("option");
        option.classList.add("dog-name");
        searchList.appendChild(option);
        option.textContent = element.name;
        const ImageURL = element.image.url;
        dogImages.push(ImageURL);

        

    


        
    })
       
       dogImages.forEach(dogImage =>{
        const image = document.createElement("img");
        image.classList.add("dog-image");
        image.src = dogImage;
        sampleTiles.append(image);

       })

       console.log(dogImages.length)
        
       
        }).catch(error => console.error("Błąd" + error))











