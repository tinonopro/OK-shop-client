import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "../types";

type Props = {
  product: Product;
  favorite: boolean;
  onFavorite: (id: number) => void;
  onAdd: (product: Product) => void;
  onDetails: (product: Product) => void;
};

export default function ProductCard({ product, favorite, onFavorite, onAdd, onDetails }: Props) {
  return (
    <article className="product-card">
      <div className="product-image-wrap" onClick={() => onDetails(product)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onDetails(product)}>
        <img src={product.image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.src = "https://placehold.co/700x700/F0E8DE/765A48?text=ShopMini"; }} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.stock === 0 && <span className="sold-out">Hết hàng</span>}
        <button className={favorite ? "favorite-button selected" : "favorite-button"} aria-label="Yêu thích" onClick={(e) => { e.stopPropagation(); onFavorite(product.id); }}>
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
        <button className="quick-view" onClick={(e) => { e.stopPropagation(); onDetails(product); }}>Xem nhanh</button>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <button className="product-name" onClick={() => onDetails(product)}>{product.name}</button>
        <div className="rating"><Star size={13} fill="currentColor" /> {product.rating} <span>({product.reviews} đánh giá)</span></div>
        <div className="product-bottom">
          <div><strong>{product.price.toLocaleString("vi-VN")}đ</strong>{product.oldPrice && <del>{product.oldPrice.toLocaleString("vi-VN")}đ</del>}</div>
          <button className="add-button" disabled={product.stock === 0} onClick={() => onAdd(product)} aria-label="Thêm vào giỏ"><ShoppingBag size={17} /></button>
        </div>
      </div>
    </article>
  );
}