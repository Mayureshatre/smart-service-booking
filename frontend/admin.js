const API_URL = "http://localhost:5000/api";

async function fetchAllBookings() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const container = document.getElementById("admin-bookings-container");

  if (!token || role !== "admin") {
    alert("Access denied. Admin privileges required.");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/bookings/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const bookings = await response.json();
    container.innerHTML = "";

    // console.log("SECRET SERVER RESPONSE:", bookings);
    // if (!response.ok) {
    //   container.innerHTML = `<p style="color:red;">Error: ${bookings.message}</p>`;
    //   return;
    // }

    if (bookings.length === 0) {
      container.innerHTML = "<p>No bookings in the system</p>";
      return;
    }

    bookings.forEach((booking) => {
      const date = new Date(booking.date).toLocaleDateString();

      // Create a card for each booking with a status dropdown
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
                <h3>${booking.serviceId ? booking.serviceId.name : "Unknown Service"}</h3>
                <p><strong>Customer:</strong> ${booking.userId ? booking.userId.name : "Unknown User"}</p>
                <p><strong>Date:</strong> ${date}</p>
                
                <div style="margin-top: 15px;">
                    <label>Status: </label>
                    <select id="status-${booking._id}">
                        <option value="Pending" ${booking.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Approved" ${booking.status === "Approved" ? "selected" : ""}>Approved</option>
                        <option value="Completed" ${booking.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                    <button class="book-btn" style="padding: 5px 10px; margin-left: 10px;" onclick="updateStatus('${booking._id}')">Update</button>
                </div>
            `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching admin bookings:", error);
    container.innerHTML = "<p>Failed to load bookings</p>";
  }
}

// Function to handle the status change
async function updateStatus(bookingId) {
  const token = localStorage.getItem("token");
  const newStatus = document.getElementById(`status-${bookingId}`).value;

  try {
    const response = await fetch(`${API_URL}/bookings/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId, status: newStatus }),
    });

    if (response.ok) {
      const data = await response.json();

      // THE REVEAL: Let's see exactly what the database saved!
      console.log("🔍 SERVER SAVED THIS EXACT STATUS:", data.booking.status);
      alert(
        `Success! The database now says this booking is: ${data.booking.status}`,
      );

      fetchAllBookings(); // Refresh the list
    } else {
      const data = await response.json();
      alert(`Failed to update: ${data.message}`);
    }
  } catch (error) {
    alert("Server error while updating status.");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
window.onload = fetchAllBookings;
