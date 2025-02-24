// Register User and Move to Main Page
function registerUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (name === "" || email === "") {
        alert("Please enter all details.");
        return;
    }

    localStorage.setItem("username", name);
    alert(`Welcome ${name}! Registration successful.`);
    showPage('mainPage');
}

// Sample Destinations
let destinations = [
    { name: "Paris", country: "France", price: 1000, img: "travel/paris.png" },
    { name: "Tokyo", country: "Japan", price: 1200, img: "travel/tokyo.png" },
    { name: "New York", country: "USA", price: 900, img: "travel/new york.png" },
    { name: "Rome", country: "Italy", price: 1100, img: "travel/rome.png" },
    { name: "Goa", country: "India", price: 700, img: "travel/goa.png" },
    { name: "Dubai", country: "UAE", price: 1500, img: "travel/dubai.png" },
    { name: "London", country: "UK", price: 1300, img: "travel/london.png" },
    { name: "Sydney", country: "Australia", price: 1400, img: "travel/sydney.png" },
    { name: "Bangkok", country: "Thailand", price: 800, img: "travel/bangkok.png" },
    { name: "Bali", country: "Indonesia", price: 750, img: "travel/bali.png" }
];

// Display Destinations
function displayDestinations(destList = destinations) {
    let list = document.getElementById("destinationList");
    list.innerHTML = "";
    destList.forEach(dest => {
        let div = document.createElement("div");
        div.className = "destination";
        div.innerHTML = `<img src="${dest.img}" alt="${dest.name}"><br>${dest.name} - ${dest.country} ($${dest.price})`;
        div.onclick = () => selectDestination(dest);
        list.appendChild(div);
    });
}

// Filter Destinations by Search
function filterDestinations() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let filtered = destinations.filter(dest => dest.name.toLowerCase().includes(query));
    applyAllFilters(filtered);
}

// **Fixed Filter by Country**
function filterByCountry() {
    let selectedCountry = document.getElementById("countryFilter").value;
    
    let filtered = selectedCountry === "" 
        ? destinations // If no country is selected, show all destinations
        : destinations.filter(dest => dest.country === selectedCountry);
    
    applyAllFilters(filtered);
}

// **Apply All Filters Together (Country + Search + Sort)**
function applyAllFilters(destList) {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let sortValue = document.getElementById("sortPrice").value;

    // Apply search filter
    let filteredList = destList.filter(dest => dest.name.toLowerCase().includes(query));

    // Apply sorting
    if (sortValue === "lowToHigh") {
        filteredList.sort((a, b) => a.price - b.price);
    } else if (sortValue === "highToLow") {
        filteredList.sort((a, b) => b.price - a.price);
    }

    displayDestinations(filteredList);
}

// Sort Destinations by Price
function sortDestinations() {
    applyAllFilters(destinations);
}

// Select Destination
function selectDestination(dest) {
    localStorage.setItem("selectedDestination", JSON.stringify(dest));
    showPage('bookingPage');
}

// Load Booking Page
function loadBookingPage() {
    let dest = JSON.parse(localStorage.getItem("selectedDestination"));
    document.getElementById("destinationImage").src = dest.img;
    document.getElementById("selectedDestination").innerText = `You selected: ${dest.name}, ${dest.country} ($${dest.price})`;
    updatePrice();
}

// Update Total Price
function updatePrice() {
    let dest = JSON.parse(localStorage.getItem("selectedDestination"));
    let numTickets = document.getElementById("numTickets").value;
    document.getElementById("totalPrice").innerText = `$${dest.price * numTickets}`;
}

// Confirm Booking
function confirmBooking() {
    alert("Your booking is confirmed!");
}

// Logout Function
function logout() {
    localStorage.clear();
    showPage('registerPage');
}

// Show Specific Page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = "none");
    document.getElementById(pageId).style.display = "block";

    if (pageId === "mainPage") {
        document.getElementById("username").innerText = localStorage.getItem("username");
        displayDestinations();
    } else if (pageId === "bookingPage") {
        loadBookingPage();
    }
}

// Load main page data on startup
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("username")) {
        showPage('mainPage');
    }
});
