import { Link } from "react-router-dom";

function DishCard({ dish }) {
  const categoryClass = `badge badge-${dish.category?.toLowerCase() || 'default'}`;

  return (
    <div className="dish-card">
      <div>
        <div className="dish-header">
          <Link to={`/dish/${dish.id}`} className="dish-title">
            {dish.name}
          </Link>
          <span className="dish-price">LKR {dish.price.toFixed(2)}</span>
        </div>
        <span className={categoryClass}>{dish.category}</span>
      </div>
      
      <div className="dish-footer">
        <span className={`status-badge ${dish.available ? 'status-available' : 'status-soldout'}`}>
          {dish.available ? '● Available' : '○ Sold Out'}
        </span>
        <Link to={`/dish/${dish.id}`} className="btn-secondary">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default DishCard;
