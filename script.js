// Get the root element from the HTML where the app will be rendered
const rootElement = document.getElementById("root");

// Constants to manage the state of the API call
const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

// Initialize the API status and other variables
let apiStatus = apiStatusConstants.initial;
let watchData; // Variable to hold the fetched data
let currentProductIndex = 0; // Variable to keep track of the current product index

// Function to create a new HTML element
const createElement = (tag) => {
  return document.createElement(tag);
};

// Async function to fetch data from the API
const fetchWatchData = async () => {
  apiStatus = apiStatusConstants.inProgress; // Set API status to in progress
  const response = await fetch("watches.json"); // Fetch data from watches.json
  if (response.ok) { // Check if the response is successful
    const data = await response.json(); // Parse the JSON data
    watchData = data; // Store the data in the watchData variable
    apiStatus = apiStatusConstants.success; // Set API status to success
  } else {
    apiStatus = apiStatusConstants.failure; // Set API status to failure
  }
};

// Fetch the data immediately
fetchWatchData();

// Function to render the header section of the page
const renderHeaderSection = () => {
  const headerElement = createElement("header"); // Create a header element
  rootElement.appendChild(headerElement); // Append the header to the root element

  const containerElement = createElement("div"); // Create a container div
  containerElement.classList.add("container"); // Add the 'container' class
  headerElement.appendChild(containerElement); // Append the container to the header

  const logoElement = createElement("img"); // Create an image element for the logo
  logoElement.src = "images/Logo.png"; // Set the source of the logo image
  logoElement.alt = "logo"; // Set the alt text for the logo
  containerElement.appendChild(logoElement); // Append the logo to the container

  const navMenuData = watchData.header.nav; // Get the navigation menu data from the fetched data
  const navElement = createElement("nav"); // Create a nav element
  containerElement.appendChild(navElement); // Append the nav to the container

  const ulElement = createElement("ul"); // Create a ul element
  navElement.appendChild(ulElement); // Append the ul to the nav

  // Loop through the navigation menu data and create li elements with anchor tags
  navMenuData.forEach((navItem) => {
    const { linkTitle } = navItem; // Destructure the link title
    const liElement = createElement("li"); // Create a li element
    ulElement.appendChild(liElement); // Append the li to the ul

    const anchorElement = createElement("a"); // Create an anchor element
    anchorElement.textContent = linkTitle; // Set the text content of the anchor
    liElement.appendChild(anchorElement); // Append the anchor to the li
  });

  // Check if the signup button should be displayed
  const displaySignupButton = watchData.header.showSignupButton;
  if (displaySignupButton) {
    const signupButtonElement = createElement("button"); // Create a button element
    signupButtonElement.classList.add("signup-btn"); // Add the 'signup-btn' class
    signupButtonElement.textContent = "Sign Up"; // Set the text content of the button
    containerElement.appendChild(signupButtonElement); // Append the button to the container
  }
};

// Function to render the banner section of the page
const renderBannerSection = () => {
  const mainElement = createElement("main"); // Create a main element
  rootElement.appendChild(mainElement); // Append the main to the root element

  const containerElement = createElement("div"); // Create a container div
  containerElement.classList.add("container"); // Add the 'container' class
  mainElement.appendChild(containerElement); // Append the container to the main

  const articleElement = createElement("article"); // Create an article element
  articleElement.classList.add("product-bg-container"); // Add the 'product-bg-container' class
  containerElement.appendChild(articleElement); // Append the article to the container

  const productDetails = watchData.sectionBlocks; // Get the product details from the fetched data
  const { heading, subHeading, description, price, media } = productDetails[currentProductIndex]; // Destructure the product details for the current index

  const productDetailsContainerElement = createElement("div"); // Create a div for product details
  productDetailsContainerElement.classList.add("product-details-container"); // Add the 'product-details-container' class
  articleElement.appendChild(productDetailsContainerElement); // Append the div to the article

  const productHeadingElement = createElement("h2"); // Create an h2 element for the heading
  productHeadingElement.id = "heading"; // Set the id for the heading
  productHeadingElement.textContent = heading; // Set the text content for the heading
  productDetailsContainerElement.appendChild(productHeadingElement); // Append the heading to the product details container

  const productSubHeadingElement = createElement("h3"); // Create an h3 element for the subheading
  productSubHeadingElement.id = "subHeading"; // Set the id for the subheading
  productSubHeadingElement.textContent = subHeading; // Set the text content for the subheading
  productDetailsContainerElement.appendChild(productSubHeadingElement); // Append the subheading to the product details container

  // Replace "Choose Us" with a span to change the color of the text
  productSubHeadingElement.innerHTML = productSubHeadingElement.textContent.replace(
    "Choose Us",
    "<span style='color: black;'>Choose Us</span>"
  );

  const descriptionElement = createElement("p"); // Create a p element for the description
  descriptionElement.id = "description"; // Set the id for the description
  descriptionElement.textContent = description; // Set the text content for the description
  productDetailsContainerElement.appendChild(descriptionElement); // Append the description to the product details container

  const priceElement = createElement("p"); // Create a p element for the price
  priceElement.id = "price"; // Set the id for the price
  priceElement.classList.add("price"); // Add the 'price' class
  priceElement.textContent = price; // Set the text content for the price
  productDetailsContainerElement.appendChild(priceElement); // Append the price to the product details container

  // Render social icons
  const socialIcons = watchData.socialIcons; // Get the social icons from the fetched data

  const socialIconsContainer = createElement("section"); // Create a section element for the social icons
  socialIconsContainer.classList.add("social-icons-container"); // Add the 'social-icons-container' class
  productDetailsContainerElement.appendChild(socialIconsContainer); // Append the social icons container to the product details container

  // Loop through the social icons data and create div elements for each icon
  socialIcons.forEach((iconData) => {
    const socialIconElement = createElement("div"); // Create a div element for the social icon
    socialIconElement.innerHTML = iconData.icon; // Set the inner HTML of the div to the icon
    socialIconElement.classList.add("social-icon"); // Add the 'social-icon' class
    socialIconsContainer.appendChild(socialIconElement); // Append the social icon to the social icons container
  });

  // Render Splide slider
  const splideContainerElement = createElement("section"); // Create a section element for the Splide slider
  splideContainerElement.innerHTML = `
  <section id="splide" class="splide" aria-label="Splide Basic HTML Example">
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
  `; // Set the inner HTML for the Splide slider structure
  splideContainerElement.classList.add("splide-container"); // Add the 'splide-container' class
  articleElement.appendChild(splideContainerElement); // Append the Splide slider to the article

  // Loop through the product details and create list items for the Splide slider
  productDetails.forEach((product) => {
    const splideListElement = splideContainerElement.querySelector(".splide__list"); // Get the ul element for the Splide slider

    const splideSlideElement = createElement("li"); // Create a li element for the Splide slide
    splideSlideElement.classList.add("splide__slide", "splide__li"); // Add the 'splide__slide' and 'splide__li' classes
    splideListElement.appendChild(splideSlideElement); // Append the slide to the Splide list

    const imageElement = createElement("img"); // Create an img element for the product image
    imageElement.classList.add("splide-img"); // Add the 'splide-img' class
    imageElement.src = product.media; // Set the source of the product image
    imageElement.alt = "thumbnail"; // Set the alt text for the product image
    splideSlideElement.appendChild(imageElement); // Append the image to the slide
  });

  // Initialize and mount the Splide slider
  var splide = new Splide(".splide", {
    perPage: 1, // Number of slides to show per page
    pagination: false, // Disable pagination
  });
  splide.mount();

  // Event listener for the previous button in the Splide slider
  const splidePrevButtonElement = document.getElementById("splidePrevBtn");
  splidePrevButtonElement.addEventListener("click", () => {
    if (currentProductIndex > 0) {
      currentProductIndex -= 1; // Decrement the product index to show the previous product

      const bodyElement = document.body;
      const { gradient } = watchData.sectionBlocks[currentProductIndex]; // Get the gradient colors for the current product
      bodyElement.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`; // Update the background gradient

      const productDetails = watchData.sectionBlocks; // Get the product details
      const { heading, subHeading, description, price } = productDetails[currentProductIndex]; // Destructure the current product details

      // Update the product details on the page
      const productHeadingElement = document.getElementById("heading");
      productHeadingElement.textContent = heading;

      const productSubHeadingElement = document.getElementById("subHeading");
      productSubHeadingElement.textContent = subHeading;

      productSubHeadingElement.innerHTML = productSubHeadingElement.textContent.replace(
        "Choose Us",
        "<span style='color: black;'>Choose Us</span>"
      );

      const descriptionElement = document.getElementById("description");
      descriptionElement.textContent = description;

      const priceElement = document.getElementById("price");
      priceElement.textContent = price;
    }
  });

  // Event listener for the next button in the Splide slider
  const splideNextButtonElement = document.getElementById("splideNextBtn");
  splideNextButtonElement.addEventListener("click", () => {
    if (currentProductIndex < productDetails.length - 1) {
      currentProductIndex += 1; // Increment the product index to show the next product

      const bodyElement = document.body;
      const { gradient } = watchData.sectionBlocks[currentProductIndex]; // Get the gradient colors for the current product
      bodyElement.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`; // Update the background gradient

      const productDetails = watchData.sectionBlocks; // Get the product details
      const { heading, subHeading, description, price } = productDetails[currentProductIndex]; // Destructure the current product details

      // Update the product details on the page
      const productHeadingElement = document.getElementById("heading");
      productHeadingElement.textContent = heading;

      const productSubHeadingElement = document.getElementById("subHeading");
      productSubHeadingElement.textContent = subHeading;

      productSubHeadingElement.innerHTML = productSubHeadingElement.textContent.replace(
        "Choose Us",
        "<span style='color: black;'>Choose Us</span>"
      );

      const descriptionElement = document.getElementById("description");
      descriptionElement.textContent = description;

      const priceElement = document.getElementById("price");
      priceElement.textContent = price;
    }
  });
};

// Function to render the success view
const renderSuccessView = () => {
  const bodyElement = document.body;
  const { gradient } = watchData.sectionBlocks[currentProductIndex]; // Get the gradient colors for the initial product
  bodyElement.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`; // Set the background gradient

  renderHeaderSection(); // Render the header section
  renderBannerSection(); // Render the banner section

  // Initialize and mount the Splide slider with a speed adjustment
  const splide = new Splide(".splide", {
    perPage: 1,
    pagination: false,
    speed: 2000, // Adjust the transition duration in milliseconds (e.g., 2000 for 2 seconds)
  });
  splide.mount();
};

// Fetch data and then render the appropriate view based on the API status
fetchWatchData().then(() => {
  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView(); // Render a loading view (function not provided)
    case apiStatusConstants.success:
      return renderSuccessView(); // Render the success view
    case apiStatusConstants.failure:
      return renderFailureView(); // Render a failure view (function not provided)
    default:
      console.log("Unknown status"); // Log an unknown status
  }
});
