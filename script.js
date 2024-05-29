
const rootEl = document.getElementById("root");
const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
let apiStatus = apiStatusConstants.initial;
let watches;
let productIndex = 0;

const createElement = (tag) => {
  return document.createElement(tag);
};


const fetchData = async () => {
  apiStatus = apiStatusConstants.inProgress;
  const response = await fetch("watches.json"); 
  if (response.ok) {
    const data = await response.json();
    watches = data;
    apiStatus = apiStatusConstants.success;
  } else {
    apiStatus = apiStatusConstants.failure;
  }
};
fetchData();


const renderHeaderSection = () => {
  const headerEl = createElement("header");
  rootEl.appendChild(headerEl);

  const containerEl = createElement("div");
  containerEl.classList.add("container");
  headerEl.appendChild(containerEl);

  const logo = createElement("img");
  logo.src = "images/Logo.png";
  logo.alt = "logo";
  containerEl.appendChild(logo);


  const navMenuData = watches.header.nav;
  const navEl = createElement("nav");
  containerEl.appendChild(navEl);

  const ulEl = createElement("ul");
  navEl.appendChild(ulEl);

  navMenuData.forEach((element) => {
    const { linkTitle } = element;
    const liEl = createElement("li");
    ulEl.appendChild(liEl);

    const anchorEl = createElement("a");
    anchorEl.textContent = linkTitle;
    liEl.appendChild(anchorEl);
  });


  const displaySignupBtn = watches.header.showSignupButton;
  const signupBtnEl = createElement("button");
  signupBtnEl.classList.add("signup-btn");
  signupBtnEl.textContent = "Sign Up";
  containerEl.appendChild(signupBtnEl);
};

const renderBannerSection = () => {
  const mainEl = createElement("main");
  rootEl.appendChild(mainEl);


  const containerEl = createElement("div");
  containerEl.classList.add("container");
  mainEl.appendChild(containerEl);

  const articleEl = createElement("article");
  articleEl.classList.add("product-bg-container");
  containerEl.appendChild(articleEl);

  const productDetails = watches.sectionBlocks;
  const { heading, subHeading, description, price, media } =
    productDetails[productIndex];

  const productDetailsContainerEl = createElement("div");
  productDetailsContainerEl.classList.add("product-details-container");
  articleEl.appendChild(productDetailsContainerEl);

  const productHeadingEl = createElement("h2");
  productHeadingEl.id = "heading";
  productHeadingEl.textContent = heading;
  productDetailsContainerEl.appendChild(productHeadingEl);

  const productSubHeadingEl = createElement("h3");
  productSubHeadingEl.id = "subHeading";
  productSubHeadingEl.textContent = subHeading;
  productDetailsContainerEl.appendChild(productSubHeadingEl);

  productSubHeadingEl.innerHTML = productSubHeadingEl.textContent.replace(
    "Choose Us",
    "<span style='color: black;'>Choose Us</span>"
  );

  const descriptionEl = createElement("p");
  descriptionEl.id = "description";
  descriptionEl.textContent = description;
  productDetailsContainerEl.appendChild(descriptionEl);

  const priceEl = createElement("p");
  priceEl.id = "price";
  priceEl.classList.add("price");
  priceEl.textContent = price;
  productDetailsContainerEl.appendChild(priceEl);


  const socialIcons = watches.socialIcons;

  const socialIconsContainer = createElement("section");
  socialIconsContainer.classList.add("social-icons-container");
  productDetailsContainerEl.appendChild(socialIconsContainer);

  socialIcons.forEach((element) => {
    const socialIcon = createElement("div");
    socialIcon.innerHTML = element.icon;
    socialIcon.classList.add("social-icon");
    socialIconsContainer.appendChild(socialIcon);
  });


  const splideContainerEl = createElement("section");
  splideContainerEl.innerHTML = `
  <section id= "splide" class="splide" aria-label="Splide Basic HTML Example">
    <div class="splide__arrows">
      <button id="splidePrevBtn" class="splide__arrow splide__arrow--prev">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <button id="splideNextBtn" class="splide__arrow splide__arrow--next">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
    <div class="splide__track">
      <ul class="splide__list"></ul>
    </div>
  </section>
  `;
  splideContainerEl.classList.add("splide-container");
  articleEl.appendChild(splideContainerEl);

  productDetails.forEach((element) => {
    const splideListEl = splideContainerEl.querySelector(".splide__list");

    const splideSlideEl = createElement("li");
    splideSlideEl.classList.add("splide__slide", "splide__li");

    splideListEl.appendChild(splideSlideEl);

    const imgEl = createElement("img");
    imgEl.classList.add("splide-img");
    imgEl.src = element.media;
    imgEl.alt = "thumbnail";
    splideSlideEl.appendChild(imgEl);
  });

  var splide = new Splide(".splide", {
    perPage: 1,
    pagination: false,
  });
  splide.mount();

  const splidePrevBtnEl = document.getElementById("splidePrevBtn");
  splidePrevBtnEl.addEventListener("click", () => {
    if (productIndex > 0) {
      productIndex -= 1;
      
      const bodyEl = document.body;
      const { gradient } = watches.sectionBlocks[productIndex];
      bodyEl.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
    
      const productDetails = watches.sectionBlocks;
      const { heading, subHeading, description, price } =
        productDetails[productIndex];

      const productHeadingEl = document.getElementById("heading");
      productHeadingEl.textContent = heading;

      const productSubHeadingEl = document.getElementById("subHeading");
      productSubHeadingEl.textContent = subHeading;

      productSubHeadingEl.innerHTML = productSubHeadingEl.textContent.replace(
        "Choose Us",
        "<span style='color: black;'>Choose Us</span>"
      );

      const descriptionEl = document.getElementById("description");
      descriptionEl.textContent = description;

      const priceEl = document.getElementById("price");
      priceEl.textContent = price;
    }
  });

  const splideNextBtnEl = document.getElementById("splideNextBtn");
  splideNextBtnEl.addEventListener("click", () => {
    if (productIndex <= productDetails.length - 1) {
      productIndex += 1;
      
      const bodyEl = document.body;
      const { gradient } = watches.sectionBlocks[productIndex];
      bodyEl.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
    
      const productDetails = watches.sectionBlocks;
      const { heading, subHeading, description, price } =
        productDetails[productIndex];

      const productHeadingEl = document.getElementById("heading");
      productHeadingEl.textContent = heading;

      const productSubHeadingEl = document.getElementById("subHeading");
      productSubHeadingEl.textContent = subHeading;

      productSubHeadingEl.innerHTML = productSubHeadingEl.textContent.replace(
        "Choose Us",
        "<span style='color: black;'>Choose Us</span>"
      );

      const descriptionEl = document.getElementById("description");
      descriptionEl.textContent = description;

      const priceEl = document.getElementById("price");
      priceEl.textContent = price;
    }
  });
};

const renderSuccessView = () => {
  const bodyEl = document.body;
  const { gradient } = watches.sectionBlocks[productIndex];
  bodyEl.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
  renderHeaderSection();
  renderBannerSection();const splide = new Splide(".splide", {
    perPage: 1,
    pagination: false,
    speed: 2000, // Adjust the transition duration in milliseconds (e.g., 2000 for 2 seconds)
  });

  // Mount the Splide instance
  splide.mount();
  
};


fetchData().then(() => {
  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    case apiStatusConstants.success:
      return renderSuccessView();
    case apiStatusConstants.failure:
      return renderFailureView();
    default:
      console.log("Unknown status");
  }
});
