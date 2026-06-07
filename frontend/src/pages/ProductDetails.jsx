import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CardContext";

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>No Product Found!</div>;
  }

  const handleAddToCart = () => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
      return;
    }
    addToCart(id);
  };

  return (

    <div className="min-h-screen bg-[#121212] text-gray-200 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left: Image with Frame */}
          <div className="w-full md:w-1/2 bg-[#1A1A1A] p-8 rounded-3xl border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-xl" />
          </div>

          {/* Right: Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">{product.description}</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600 mb-8">
              Rs. {product.price}
            </p>
            
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] transition-all duration-300"
            >
              Add to Cart
            </button>
            
            <div className="mt-8">
              <a href="/" className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors">
                &larr; Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
