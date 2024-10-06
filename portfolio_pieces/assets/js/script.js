'use strict';



//script.js 
const cardsPerPage = 4; // Number of cards to show per page 
const dataContainer = document.getElementById('data-container'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
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
        console.log("HERE") 
        if (index >= startIndex && index < endIndex) { 
            card.style.display = 'block'; 
        } else { 
            card.style.display = 'none'; 
        } 
    }); 
} 

// Function to update pagination buttons and page numbers 
function updatePagination() { 
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

// Initial page load 
displayPage(currentPage); 
updatePagination();