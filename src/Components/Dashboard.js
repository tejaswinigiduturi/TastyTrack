import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  // 👤 profile info
  const [profile, setProfile] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    photo: "",
  });
  const [editing, setEditing] = useState(false);

  // ✅ Added state for selected meal details
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchMealsByCategory = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
    }
    setLoading(false);
  };

  const handleMealClick = async (mealId) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await res.json();
      setSelectedMeal(data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const addToFavourites = (meal) => {
    if (!favourites.some((fav) => fav.idMeal === meal.idMeal)) {
      setFavourites([...favourites, meal]);
      alert("Added to favourites ❤️");
    }
  };

  const removeFromFavourites = (mealId) => {
    setFavourites(favourites.filter((fav) => fav.idMeal !== mealId));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/");
  };

  const renderProfileSection = () => (
    <div className="p-4 text-center">
      <h3 className="text-warning fw-bold mb-3">👤 User Profile</h3>
      <div className="card mx-auto shadow-sm" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <img
            src={profile.photo || "https://via.placeholder.com/100"}
            alt="Profile"
            className="rounded-circle mb-3"
            width="100"
            height="100"
          />
          <h5 className="fw-bold">{profile.name || user.name}</h5>
          <p className="text-white">Recipe Lover</p>
          <hr />
          <p>Email: <strong>{profile.email || user.email}</strong></p>
          <p>Phone: <strong>{profile.phone || user.phone}</strong></p>
          <button className="btn btn-warning mt-3" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      </div>

      {editing && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.6)", zIndex: 2000 }}
        >
          <div className=" edit-card p-4  text-center" style={{ width: "350px" }}>
            <h5 className="mb-3 text-light">Edit Profile</h5>
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setProfile({ ...profile, photo: url });
                }
              }}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <input
              type="tel"
              className="form-control mb-3"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-success w-50 me-2"
                onClick={() => setEditing(false)}
              >
                💾 Save
              </button>
              <button
                className="btn btn-secondary w-50"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFavouritesSection = () => (
    <div className="container text-center py-4">
      <h3 className="text-warning fw-bold mb-4">❤️ Your Favourites</h3>
      {favourites.length === 0 ? (
        <p className="text-light">No favourite recipes yet! Add some ❤️</p>
      ) : (
        <div className="row g-4">
          {favourites.map((fav) => (
            <div
              key={fav.idMeal}
              className="col-md-3"
              onClick={() => handleMealClick(fav.idMeal)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={fav.strMealThumb}
                  alt={fav.strMeal}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold">{fav.strMeal}</h6>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavourites(fav.idMeal);
                    }}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeSection === "welcome") {
      return (
        <div className=" user-container text-center" style={{ padding: "50px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <h1 className="mb-4">Welcome, {user.name || "User"} 👋</h1>
          <p>Your dashboard is now active.</p>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
          <div className="mt-4">
            <button className="btn btn-dark" onClick={() => setActiveSection("profile")}>
              View Profile
            </button>
          </div>
        </div>
      );
    }

    if (activeSection === "home") {
      return (
        <>
          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-50 shadow-sm"
              placeholder="Search meals by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-warning ms-2" onClick={() => fetchMealsByCategory(searchTerm)}>
              Search
            </button>
          </div>

          <div className="text-center mb-4">
            <h3 className="Head-dashboard fw-bold">🍽 Browse by Category</h3>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((c) => (
              <button
                key={c.idCategory}
                className={`btn btn-outline-light btn-lg ${selectedCategory === c.strCategory ? "active" : ""}`}
                onClick={() => fetchMealsByCategory(c.strCategory)}
              >
                {c.strCategory}
              </button>
            ))}
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {selectedCategory && (
            <div className="row g-4">
              {meals.map((m) => (
                <div
                  key={m.idMeal}
                  className="col-md-3"
                  onClick={() => handleMealClick(m.idMeal)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card h-100 shadow-sm">
                    <img
                      src={m.strMealThumb}
                      alt={m.strMeal}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h6 className="fw-bold">{m.strMeal}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }

    if (activeSection === "profile") return renderProfileSection();
    if (activeSection === "favourites") return renderFavouritesSection();
    return null;
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-overlay">
        {/* Sidebar toggler */}
        <button
          className="btn btn-warning position-fixed top-0 start-0 m-3 rounded-circle shadow"
          style={{ zIndex: 1050, width: "45px", height: "45px" }}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "d-block" : "d-none"}`}>
          <h4>🍴 TastyTrack</h4>
          <p className="small text-light mb-4">Your recipe collection</p>

          <ul className="list-unstyled small">
            <li>
              <button
                className={`btn w-100 text-start mb-2 ${activeSection === "welcome" ? "btn-warning text-dark" : "btn-outline-light"}`}
                onClick={() => {
                  setActiveSection("welcome");
                  setSidebarOpen(false);
                }}
              >
                👋 Welcome
              </button>
            </li>
            <li>
              <button
                className={`btn w-100 text-start mb-2 ${activeSection === "home" ? "btn-warning text-dark" : "btn-outline-light"}`}
                onClick={() => {
                  setActiveSection("home");
                  setSidebarOpen(false);
                }}
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button
                className={`btn w-100 text-start mb-2 ${activeSection === "favourites" ? "btn-warning text-dark" : "btn-outline-light"}`}
                onClick={() => {
                  setActiveSection("favourites");
                  setSidebarOpen(false);
                }}
              >
                ❤️ Favourites
              </button>
            </li>
            <li>
              <button
                className={`btn w-100 text-start mb-2 ${activeSection === "profile" ? "btn-warning text-dark" : "btn-outline-light"}`}
                onClick={() => {
                  setActiveSection("profile");
                  setSidebarOpen(false);
                }}
              >
                👤 Profile
              </button>
            </li>
          </ul>

          <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
            🚪 Logout
          </button>

          <button className="btn btn-outline-light w-100 mt-3" onClick={() => setSidebarOpen(false)}>
            Close
          </button>
        </div>

        <div className="container py-5">{renderContent()}</div>
      </div>

      {/* Recipe Details Modal */}
      {selectedMeal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 overflow-hidden">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title fw-bold">{selectedMeal.strMeal}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedMeal(null)}></button>
              </div>

              <div className="modal-body bg-light text-dark p-4">
                <div className="card border-0 shadow-sm">
                  <div className="row g-3 align-items-center p-3">
                    <div className="col-md-4 text-center">
                      <img
                        src={selectedMeal.strMealThumb}
                        alt={selectedMeal.strMeal}
                        className="img-fluid rounded shadow-sm"
                        style={{
                          maxHeight: "200px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>

                    <div className="col-md-8">
                      <h5 className="fw-bold">{selectedMeal.strMeal}</h5>
                      <p className="mb-1"><strong>Category:</strong> {selectedMeal.strCategory}</p>
                      <p className="mb-1"><strong>Area:</strong> {selectedMeal.strArea}</p>
                      <h6 className="fw-bold mt-3">Ingredients:</h6>
                      <ul className="small" style={{ columns: 2 }}>
                        {Array.from({ length: 20 }).map((_, i) => {
                          const ingredient = selectedMeal[`strIngredient${i + 1}`];
                          const measure = selectedMeal[`strMeasure${i + 1}`];
                          return ingredient && (
                            <li key={i}>{ingredient} - {measure}</li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="px-4 pb-3">
                    <h6 className="fw-bold mt-2">Instructions:</h6>
                    <p className="small text-muted">{selectedMeal.strInstructions}</p>
                  </div>

                  <div className="card-footer bg-white d-flex flex-wrap justify-content-between gap-2 p-3">
                    <button
                      className="btn btn-outline-danger flex-grow-1"
                      onClick={() => addToFavourites(selectedMeal)}
                    >
                      ❤️ Add to Favourites
                    </button>

                    <button
                      className="btn btn-outline-primary flex-grow-1"
                      onClick={() => {
                        const doc = new jsPDF();
                        doc.setFontSize(18);
                        doc.text(selectedMeal.strMeal, 10, 20);

                        doc.setFontSize(14);
                        doc.text("Ingredients:", 10, 30);
                        autoTable(doc, {
                          startY: 35,
                          head: [["Ingredient", "Measure"]],
                          body: Array.from({ length: 20 })
                            .map((_, i) => {
                              const ingredient = selectedMeal[`strIngredient${i + 1}`];
                              const measure = selectedMeal[`strMeasure${i + 1}`];
                              return ingredient ? [ingredient, measure] : null;
                            })
                            .filter(Boolean),
                        });

                        let finalY = doc.lastAutoTable.finalY + 10;
                        doc.setFontSize(14);
                        doc.text("Process / Instructions:", 10, finalY);
                        doc.setFontSize(12);
                        const splitText = doc.splitTextToSize(selectedMeal.strInstructions, 180);
                        doc.text(splitText, 10, finalY + 10);

                        doc.save(`${selectedMeal.strMeal}_Recipe.pdf`);
                      }}
                    >
                      ⬇️ Download PDF
                    </button>

                    <button className="btn btn-secondary flex-grow-1" onClick={() => setSelectedMeal(null)}>
                      ✖ Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
