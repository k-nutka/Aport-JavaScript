window.onload = async () => {
  await getDogs();

  btn.addEventListener("click", (e) => {
    btnAnimation(e);
    setTimeout(() => {
      checkInput();
      clean();
    }, 500);
  });
};

const btn = document.querySelector(".searching__submit");
const input = document.querySelector(".searching__input");
const backBtn = document.querySelector(".info__back");
const dogInfo = document.querySelector(".info");
const searching = document.querySelector(".searching");

let breedArray = [];
let breed;

backBtn.addEventListener("click", (e) => {
  window.location.reload();
});

const apiKey =
  "live_dJsh3SiYwCekpmIVtVIfO8z0lYo5PabuNpCyPDF71vAPmfofuJOI0uJnCvL6Serf";

const searchList = document.querySelector(".searching__list");
const sampleTiles = document.querySelector(".sample-tiles");

async function getDogs() {
  try {
    const apiUrl = "https://api.thedogapi.com/v1/breeds";
    const response = await fetch(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    const dogs = await response.json();

    const dogImages = [];
    breedArray = dogs;

    dogs.forEach((element) => {
      const option = document.createElement("option");
      option.classList.add("dog-name");
      searchList.appendChild(option);
      option.textContent = element.name;
      const ImageURL = [element.image.url, element.name];
      dogImages.push(ImageURL);
    });

    dogImages.forEach((dogImage) => {
      const image = document.createElement("img");
      image.classList.add("dog-image");
      image.setAttribute("name", dogImage[1]);
      image.src = dogImage[0];
      sampleTiles.append(image);
    });
    let samples = document.querySelectorAll(".dog-image");
    console.log(samples);

    samples.forEach((sample) => {
      sample.addEventListener("click", () => {
        let sampleName = sample.getAttribute("name");
        breed = sampleName
        
     
        showCard();
      });
    });
  } catch (e) {
    // (error) => console.log("Błąd" + error);
    console.log(e);
  }
}

const btnAnimation = (e) => {
  const top = e.clientY;
  const left = e.clientX;
  const btnTopPosition = e.target.offsetTop;
  const btnLeftPosition = e.target.offsetLeft;
  const insideBtnTop = top - btnTopPosition;
  const insideBtnLeft = left - btnLeftPosition;

  const span = document.createElement("span");
  span.classList.add("circle");
  span.style.top = insideBtnTop + "px";
  span.style.left = insideBtnLeft + "px";
  e.target.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 3000);
};

const clean = () => {
  input.value = "";
};

function showCard() {
  sampleTiles.style.display = "none";
  searching.style.display = "none";
  dogInfo.style.display = "flex";
  completeData(breed);
}

const checkInput = () => {
  if (input.value === "") {
    const searchingInfo = document.querySelector(".searching-info");
    const info = document.createElement("p");
    info.classList.add("searching__answer");
    searchingInfo.append(info);
    info.textContent = "Enter your dog's breed";

    setTimeout(() => {
      info.remove();
      clean();
    }, 2000);
  } else {
    
    let result  = (breedArray.some(el => el.name === input.value));
    if (!result) {
      const searchingInfo = document.querySelector(".searching-info");
      const info = document.createElement("p");
      info.classList.add("searching__answer");
      searchingInfo.append(info);
      info.textContent = "There is no dog breed listed in our catalogue";

      setTimeout(() => {
        info.remove();
        clean();
      }, 2000);
    } else if (result) {
      breed = input.value;
      showCard();
      clean();
    }
  }
};

const completeData = (breed) => {
  let chosenBreed = breedArray.find(el=>el.name === breed)
  const breedName = document.querySelector(".breedName");
  const breedImg = document.querySelector(".breedImage__img");
  const breedFor = document.querySelector(".for");
  const breedGroup = document.querySelector(".group");
  const lifeSpan = document.querySelector(".life");
  const temperament = document.querySelector(".temperament__list");

  let temperamentArray = chosenBreed.temperament.split(",");

  breedName.textContent = chosenBreed.name;
  breedImg.src = chosenBreed.image.url;
  breedFor.textContent = chosenBreed.bred_for;
  breedGroup.textContent = chosenBreed.breed_group;
  lifeSpan.textContent = chosenBreed.life_span;

  temperamentArray.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("list");
    li.innerHTML =
      `<i class="fa-solid fa-paw" style="color: #863746"></i> ` + element;
    temperament.append(li);
  });
};
