import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { calcTotal, countItems } from "../utils/cart.ts";
import type { CartItem } from "../utils/cart.ts";
import { formatPrice } from "../utils/format.ts";

type Props = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

export default function CartDrawer({
  open,
  items,
  onClose,
  onQuantity,
  onRemove,
  onCheckout,
}: Props) {
  if (!open) return null;
  const total = calcTotal(items);
  const totalCount = countItems(items);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="cart-drawer">
        <div className="drawer-head">
          <div>
            <span className="eyebrow">GIỎ HÀNG CỦA BẠN</span>
            <h2>
              Giỏ hàng <span>({totalCount})</span>
            </h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Đóng">
            <X />
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={38} />
              <h3>Giỏ hàng đang trống</h3>
              <p>Hãy chọn vài món đồ bạn yêu thích nhé.</p>
              <button className="primary-button" onClick={onClose}>
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/160x160/F0E8DE/765A48?text=OK+Shop";
                  }}
                />
                <div className="cart-item-info">
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                  <div className="quantity-control">
                    <button
                      onClick={() => onQuantity(product.id, quantity - 1)}
                      aria-label="Giảm"
                    >
                      <Minus size={13} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => onQuantity(product.id, Math.min(quantity + 1, product.stock))}
                      aria-label="Tăng"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => onRemove(product.id)}
                  aria-label="Xóa"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-summary">
            <div className="summary-line">
              <span>Tổng số lượng</span>
              <span>{totalCount} sản phẩm</span>
            </div>
            <div className="summary-line">
              <span>Tổng cộng</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button className="primary-button full-button" onClick={onCheckout}>
              Đặt hàng ngay
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
