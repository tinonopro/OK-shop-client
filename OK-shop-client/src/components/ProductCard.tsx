import { Heart, Star } from "lucide-react";
import type { Product } from "../types.ts";
import { formatPrice } from "../utils/format.ts";

type Props = {
  product: Product;
  favorite: boolean;
  onFavorite: (id: number) => void;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, favorite, onFavorite, onAdd }: Props) {
  const outOfStock = product.stock === 0;
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/700x700/F0E8DE/765A48?text=OK+Shop";
          }}
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {outOfStock && <span className="sold-out">Hết hàng</span>}
        <button
          className={favorite ? "favorite-button selected" : "favorite-button"}
          aria-label={favorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          onClick={() => onFavorite(product.id)}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="rating">
          <Star size={13} fill="currentColor" /> {product.rating} <span>({product.reviews} đánh giá)</span>
        </div>
        <div className="product-bottom">
          <div>
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
          </div>
          <button
            className="btn-add"
            disabled={outOfStock}
            onClick={() => onAdd(product)}
          >
            {outOfStock ? "Hết hàng" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </article>
  );
}
