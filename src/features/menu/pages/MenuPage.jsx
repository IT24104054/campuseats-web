import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  // Read backend API URL from environment variable (Task 01)
  const API = import.meta.env.VITE_API_URL;
  const menuUrl = API ? `${API}/api/menu` : "/menu.json";

  const { data: dishes, isLoading, error } = useFetch(menuUrl);

  if (isLoading) return <p className="no-results">Loading fresh menu...</p>;
  if (error) return <p className="no-results">Could not load menu: {error}</p>;

  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your favorite dishes or drinks..."
        />
      </div>
      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;
