// Highlight list
let highlightsList = [].reverse();

// Novel list
let novelsList = [].reverse();

// Children's Writing list
let childrensWritingList = [].reverse();

// Short Stories list
let shortStoriesList = [].reverse();

// Travelogues list
let traveloguesList = [].reverse();

// Articles list
let articlesList = [].reverse();

let newsList = [].reverse();

async function fetchAndMergeHighlights() {
  try {
    const response = await fetch("data/highlights.json"); // Update with your JSON file path
    if (!response.ok) throw new Error("Failed to fetch JSON data");

    // Extract the nested "highlights" array
    const { highlights } = await response.json();

    // Merge the two lists
    highlightsList = [...highlights, ...highlightsList];

    // Render the updated highlights list
    renderHighlights();
  } catch (error) {
    console.error("Error fetching highlights JSON:", error);
  }
}

// Render highlights list on the index page
function renderHighlights() {
  const highlightsContainer = document.getElementById("highlights");
  highlightsContainer.innerHTML = ""; // Clear container before rendering
  highlightsList.forEach((highlight) => {
    const cardHTML = `
      <div class="col-md-6 col-lg-6 mb-4">
        <div class="card h-100 bg-transparent border-0" style="cursor: pointer;" onclick="location.href='${
          highlight.link
        }'">
          <div class="ratio ratio-4x3">
          <img src="${
            highlight.image
          }" class="card-img-top rounded-3 img-fluid" alt="${highlight.title}">
          </div>
          <div class="card-body">
            <h5 class="card-title">
              <a href="${
                highlight.link
              }" class=" text-decoration-none highlightColor color-none highlightTitle ">${
      highlight.title
    }</a>
            </h5>
            <p class="card-text truncate text-secondary">${highlight.description.slice(
              0,
              80
            )}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <img src="image/portrait_ajith.jpg" class="rounded-circle" width="40px" alt="">
                <p class="m-0 text-secondary ">V.R. Ajith Kumar</p>
              </div>
                <p class="card-category highlightColor  ">Highlights</p>
              </div>
          </div>
        </div>
      </div>
    `;
    highlightsContainer.innerHTML += cardHTML;
  });
}

async function fetchAndMergeNovels() {
  try {
    const response = await fetch("data/novels.json"); // Update with your JSON file path
    if (!response.ok) throw new Error("Failed to fetch novels JSON data");

    const { novels } = await response.json();

    // Merge the two lists
    novelsList = [...novels, ...novelsList];

    // Render the updated novels list
    renderNovels();
  } catch (error) {
    console.error("Error fetching novels JSON:", error);
  }
}

// Render novels list on the index page
function renderNovels() {
  const novelsContainer = document.getElementById("novels");
  novelsContainer.innerHTML = '<div class="row"></div>'; // Add Bootstrap row for better layout

  const rowContainer = novelsContainer.querySelector(".row");

  novelsList.forEach((novel) => {
    const cardHTML = `
      <div class="col-md-6 col-lg-4 mb-4 p-0 px-sm-2 ">
        <div class="card h-100 bg-transparent border-0" onclick="location.href='details.html?id=${
          novel.id
        }'" style="cursor: pointer;">
        <div class="ratio ratio-4x3 ">
          <img src="${
            novel.image
          }" class="card-img-top img-fluid rounded-3" alt="${novel.title}">
          </div>
          <div class="card-body">
            <h5 class="card-title title-blue-small novelColor color-none ">${
              novel.title
            }</h5>
            <p class="card-text text-secondary">${
              novel.shortDescription.slice(0, 80) + "..."
            }</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <img src="image/portrait_ajith.jpg" class="rounded-circle" width="40px" alt="">
                <p class="m-0 text-secondary ">V.R. Ajith Kumar</p>
              </div>
                <p class="card-category novelColor ">Novel</p>
              </div>
          </div>
        </div>
      </div>
    `;
    rowContainer.innerHTML += cardHTML;
  });
}

async function fetchAllListsForDetails() {
  try {
    const [
      highlightsRes,
      novelsRes,
      childrensRes,
      shortStoriesRes,
      traveloguesRes,
      articlesRes,
      newsRes,
    ] = await Promise.all([
      fetch("data/highlights.json"),
      fetch("data/novels.json"),
      fetch("data/childrens-writing.json"),
      fetch("data/short-stories.json"),
      fetch("data/travelogues.json"),
      fetch("data/articles.json"),
      fetch("data2/news2.json"),
    ]);

    // Convert responses to JSON
    const highlightsJSON = await highlightsRes.json();
    const novelsJSON = await novelsRes.json();
    const childrensJSON = await childrensRes.json();
    const shortStoriesJSON = await shortStoriesRes.json();
    const traveloguesJSON = await traveloguesRes.json();
    const articlesJSON = await articlesRes.json();
    const newsJSON = await newsRes.json();

    // Extract category-specific arrays from JSON structure
    const highlightsData = highlightsJSON["highlights"] || [];
    const novelsData = novelsJSON["novels"] || [];
    const childrensData = childrensJSON["childrens-writing"] || [];

    const shortStoriesData = shortStoriesJSON["short-stories"] || [];
    const traveloguesData = traveloguesJSON["travelogues"] || [];
    const articlesData = articlesJSON["articles"] || [];
    const newsData = newsJSON["newsList"] || [];

    // Merge JSON data with existing lists
    highlightsList = [...highlightsData, ...highlightsList];
    novelsList = [...novelsData, ...novelsList];
    childrensWritingList = [...childrensData, ...childrensWritingList];
    shortStoriesList = [...shortStoriesData, ...shortStoriesList];
    traveloguesList = [...traveloguesData, ...traveloguesList];
    articlesList = [...articlesData, ...articlesList];
    newsList = [...newsList, ...newsData];

    // After fetching and merging, display the details
    displayHighlightDetails();
  } catch (error) {
    console.error("Error fetching JSON files for details page:", error);
  }
}

// Function to display item details
function displayHighlightDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  let item =
    highlightsList.find((item) => item.id === id) ||
    novelsList.find((novel) => novel.id === id) ||
    childrensWritingList.find((item) => item.id === id) ||
    shortStoriesList.find((item) => item.id === id) ||
    traveloguesList.find((item) => item.id === id) ||
    newsList.find((item) => item.id === id) ||
    articlesList.find((item) => item.id === id);

  if (item) {
    const highlightDetailsContainer =
      document.getElementById("highlight-details");
    const imagesetHtml = item.imageset
      ? `
        <div class="image-gallery   ">
          <img src="${item.imageset.image1}" class="gallery-img  w-100" alt="Image 1">
          <img src="${item.imageset.image2}" class="gallery-img  w-100" alt="Image 2">
          <img src="${item.imageset.image3}" class="gallery-img  w-100" alt="Image 3">
          <img src="${item.image}" class="gallery-img  w-100" alt="${item.title}">
          <img src="${item.imageset.image4}" class="gallery-img  w-100" alt="Image 4">
          <img src="${item.imageset.image5}" class="gallery-img  w-100" alt="Image 5">
        </div>
      `
      : "";
    highlightDetailsContainer.innerHTML = `
      <div class="col-md-8 w-100 p-0">
        <div class="card bg-transparent border-0 flex align-items-center ">
        <h1 class="card-title title-blue align-self-start">${item.title}</h1>
        <div class="d-flex align-items-center gap-3 align-self-start mb-4">
          <img src="image/portrait_ajith.jpg" class="rounded-circle" width="40px" alt="">
          <p class="m-0 text-secondary ">V.R. Ajith Kumar</p>
        </div>


        <div class="ratio ratio-21x9 ">
        <img src="${
          item.image
        }" class="card-img-top object-fit-fill mb-4  " alt="${item.title}">
        </div>
          
          <div class="card-body px-0 align-self-stretch ">

            
            
            <div class="card-text">${
              item.longDescription || item.description
            }</div>
            <div>${imagesetHtml}</div>
            <div class="">
            <h2 class="title-pink">Summary</h2>
            <p class="text-secondary ">${item.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    document.getElementById("highlight-details").innerHTML = `
      <div class="alert alert-danger">Item not found!</div>
    `;
  }
}

// On page load, fetch JSON and then display details

// Call render functions if the containers exist
if (document.getElementById("highlights")) fetchAndMergeHighlights();
if (document.getElementById("novels")) fetchAndMergeNovels();

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: "smooth" });
}
