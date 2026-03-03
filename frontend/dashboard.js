const API_URL = "http://localhost:5000/api";

async function fetchMyBookings() {
  const token = localStorage.getItem("token");
  const container = document.getElementById("bookings-container");

  if (!token) {
    alert("Please login to view your dashboard!");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/bookings/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const bookings = await response.json();
    container.innerHTML = "";
    if (bookings.length === 0) {
      container.innerHTML = "<p>You have no bookings yet</p>";
      return;
    }
    bookings.forEach((booking) => {
      const date = new Date(booking.date).toLocaleDateString();

      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <h3>${booking.serviceId.name}</h3>
        <p>Date:${date}</p>
        <p>Price:${booking.serviceId.price}</p>
        <h4>Status <span style = color: ${booking.status === "Pending" ? "orange" : "green"}>${booking.status}</span></h4>`;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    container.innerHTML = "<p>Failed to load bookings</p>";
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
  window.location.href = "login.html";
}

window.onload = fetchMyBookings;
