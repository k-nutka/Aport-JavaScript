window.onload = async () => {
  await getDogs();

  btn.addEventListener("click", (e) => {
    btnAnimation(e);
    showCard();
  });
};

const btn = document.querySelector(".searching__submit");
const input = document.querySelector(".searching__input");
let breedArray = [];

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
    console.log("WYWOŁANIE W FETCH");

    dogs.forEach((element) => {
      const option = document.createElement("option");
      option.classList.add("dog-name");
      searchList.appendChild(option);
      option.textContent = element.name;
      const ImageURL = element.image.url;
      dogImages.push(ImageURL);
    });

    dogImages.forEach((dogImage) => {
      const image = document.createElement("img");
      image.classList.add("dog-image");
      image.src = dogImage;
      sampleTiles.append(image);
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
  span.classList.add("searching__circle");
  span.style.top = insideBtnTop + "px";
  span.style.left = insideBtnLeft + "px";
  e.target.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 300);
};

function showCard() {
  if (input.value === "") {
    alert("Uzupełnij pole wyboru");
  } else {
    checkInput();
  }
}

