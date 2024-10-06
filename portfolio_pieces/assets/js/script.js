'use strict';

var linked = false;

//script.js 
const cardsPerPage = 1; // Number of cards to show per page 
const dataContainer = document.getElementById('data-container'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const seeAllButton = document.getElementById('see_all');
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 

const cards = 
    Array.from(dataContainer.getElementsByClassName('about-text')); 

// Calculate the total number of pages 
const totalPages = Math.ceil(cards.length / cardsPerPage); 
let currentPage = 1; 

// Function to display cards for a specific page 
function displayPage(page) { 
    const startIndex = (page - 1) * cardsPerPage; 
    const endIndex = startIndex + cardsPerPage; 
    // print(cards)
    // console.log(cards)
    cards.forEach((card, index) => {
        // console.log("HERE") 
        if (index >= startIndex && index < endIndex) { 
            card.style.display = 'block'; 
        } else { 
            card.style.display = 'none'; 
        } 
    }); 
} 

// Function to update pagination buttons and page numbers 
function updatePagination(linked=false) {
    if (linked) {
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
      return;
    } else {
      seeAllButton.style.display = 'none';
    }
    pageNumbers.textContent = 
        `Page ${currentPage} of ${totalPages}`; //display number of pages
    
    
    prevButton.disabled = currentPage === 1;  
    if (prevButton.disabled == true) { //disable previous button if no previous pages exist
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
    }

    nextButton.disabled = currentPage === totalPages; 
    if (nextButton.disabled == true) { //disable next button if no next page exists
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
    }


    pageLinks.forEach((link) => { 
        const page = parseInt(link.getAttribute('data-page')); 
        link.classList.toggle('active', page === currentPage); 
    }); 
} 

// Event listener for "Previous" button 
prevButton.addEventListener('click', () => { 
    if (currentPage > 1) { 
        currentPage--; 
        displayPage(currentPage); 
        updatePagination(); 
    } 
}); 

// Event listener for "Next" button 
nextButton.addEventListener('click', () => { 
    if (currentPage < totalPages) { 
        currentPage++; 
        displayPage(currentPage); 
        updatePagination(); 
    } 
}); 

seeAllButton.addEventListener('click', () => {
    linked = false;
    displayPage(currentPage); 
    updatePagination(); 
});

// Event listener for page number buttons 
pageLinks.forEach((link) => { 
    link.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const page = parseInt(link.getAttribute('data-page')); 
        if (page !== currentPage) { 
            currentPage = page; 
            displayPage(currentPage); 
            updatePagination(); 
        } 
    }); 
}); 



//On initial page load, check if there is ID being linked to
//Then open only that ID, in a special page that can lead back to
//The rest of the blog
const url = document.URL;
// const url = "http://127.0.0.1:3000/portfolio_pieces/index.html#about5";
function getID(url) {
  var rexep = /#(.*)/;
  var matches = url.match(rexep);
  if (matches == null) {
    return "null";
  }
  return matches[1]
}

// console.log("[",getID(url),"]");

function display_linked_post_only(linked_to) {
  cards.forEach((card, index) => {
      if (card == linked_to) { 
        card.style.display = 'block'; 
      } else { 
        card.style.display = 'none'; 
      }
  }); 
  seeAllButton.style.display = 'block'
}



const post_id = getID(url);
//Display only certain pages based on ID
var linked_to = document.getElementById(post_id);
// console.log(linked_to);
// display_linked_posts_only(linked_to);
if (post_id != null) {
  linked = true;
}

// console.log("HERE: ",linked_to)

// console.log(linked);
// Initial page load 
if (linked == false) {
  // console.log("WOW2")
  displayPage(currentPage); 
  updatePagination(linked);
} else {
  // console.log("WOW")
  display_linked_post_only(linked_to);
  updatePagination(linked);
}