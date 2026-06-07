import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group">
        
        <div className="bg-gray-100/5 aspect-square">
          <img
            src={`${BASEURL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-lg">Rs.{product.price}</h3>
          <p className="text-purple-400 font-semibold mt-1 truncate">
            {product.name}
          </p>
          <p className="text-gray-40p text-sm mt-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
