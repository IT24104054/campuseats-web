import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
  const { id } = useParams(); // from /dish/:id

  // Read backend API URL from environment variable (Task 01)
  const API = import.meta.env.VITE_API_URL;
  const menuUrl = API ? `${API}/api/menu` : "/menu.json";

  const { data: dishes, isLoading, error } = useFetch(menuUrl);

  if (isLoading) return <p className="no-results">Loading dish details...</p>;
  if (error) return <p className="no-results">Could not load dish details: {error}</p>;

  const dish = dishes?.find((d) => String(d.id) === String(id));

  if (!dish) {
    return (
      <div className="dish-detail-container">
        <h2>Dish Not Found</h2>
        <p className="no-results" style={{ padding: '16px 0 24px' }}>Dish #{id} does not exist in our menu.</p>
        <Link to="/" className="btn-secondary">← Back to Menu</Link>
      </div>
    );
  }

  const categoryClass = `badge badge-${dish.category?.toLowerCase() || 'default'}`;

  return (
    <div className="dish-detail-container">
      <h2>{dish.name}</h2>
      <div className="dish-detail-info">
        <p>
          <span>Category:</span>
          <span className={categoryClass}>{dish.category}</span>
        </p>
        <p>
          <span>Price:</span>
          <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>LKR {dish.price?.toFixed ? dish.price.toFixed(2) : dish.price}</strong>
        </p>
        <p>
          <span>Availability:</span>
          <span className={`status-badge ${dish.available ? 'status-available' : 'status-soldout'}`}>
            {dish.available ? '● Available' : '○ Sold Out'}
          </span>
        </p>
      </div>
      <Link to="/" className="btn-secondary">← Back to Menu</Link>
    </div>
  );
}

export default DishDetailPage;
