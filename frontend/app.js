const API_URL = "http://localhost:5000/api";

async function fetchServices() {
  const container = document.getElementById("services-container");
  try {
    const response = await fetch(`${API_URL}/services`);
    const services = await response.json();

    container.innerHTML = "";
    if (services.length === 0) {
      container.innerHTML = `<p>No services available at the moment</p>`;
      return;
    }

    services.forEach((service) => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
      <h2>${service.name}</h2>
      <p>${service.description}</p>
      <h4>${service.price}</h4>
      <btn class = "book-btn" onClick = "bookService('${service._id}')">Book Service</btn>`;
      container.appendChild(card);
    });
  } catch (error) {
    console.log("Error fetching Services", error);
    container.innerHTML =
      "Failed to load the services. Make sure your Backend is running!";
  }
}

async function bookService(serviceId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to book a service.");
    window.location.href = "login.html";
    return;
  }

  dateInput = prompt("Enter your preferred date for service (YYYY-MM-DD):");
  if (!dateInput) return;
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ serviceId: serviceId, date: dateInput }),
    });
    const data = await response.json();

    if (response.ok) {
      alert("Booking successfull! Your service is now pending.");
      window.location.href = "dashboard.html";
    } else {
      alert(`Booking failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to connect to the server!");
  }
}

window.onload = fetchServices;

// Search Bar function
function filterServices() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const serviceName = card.querySelector("h3").textContent.toLowerCase();

    if (serviceName.includes(searchInput)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
