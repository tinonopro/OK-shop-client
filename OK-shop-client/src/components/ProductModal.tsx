import { X, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "../types";

type Props = { product: Product | null; favorite: boolean; onClose: () => void; onAdd: (p: Product) => void; onFavorite: (id: number) => void };
export default function ProductModal({ product, favorite, onClose, onAdd, onFavorite }: Props) {
  if (!product) return null;
  return <div className="overlay modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="product-modal">
      <button className="modal-close icon-button" onClick={onClose} aria-label="Đóng"><X /></button>
      <img className="modal-product-image" src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = "https://placehold.co/700x700/F0E8DE/765A48?text=ShopMini"; }} />
      <div className="modal-product-info"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><div className="rating"><Star size={14} fill="currentColor" /> {product.rating} <span>({product.reviews} đánh giá)</span></div><div className="modal-price">{product.price.toLocaleString("vi-VN")}đ {product.oldPrice && <del>{product.oldPrice.toLocaleString("vi-VN")}đ</del>}</div><p>{product.description}</p><p className={product.stock > 0 ? "stock available" : "stock unavailable"}>{product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Tạm hết hàng"}</p><div className="modal-actions"><button className="primary-button" disabled={product.stock === 0} onClick={() => onAdd(product)}><ShoppingBag size={17} /> Thêm vào giỏ</button><button className={favorite ? "secondary-button selected" : "secondary-button"} onClick={() => onFavorite(product.id)}><Heart size={17} fill={favorite ? "currentColor" : "none"} /> Yêu thích</button></div></div>
    </section>
  </div>;
}