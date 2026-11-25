import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import type { CartItem } from "../types";

type Props = {
  open: boolean; items: CartItem[]; onClose: () => void;
  onQuantity: (id: number, delta: number) => void; onRemove: (id: number) => void; onCheckout: () => void;
};

export default function CartDrawer({ open, items, onClose, onQuantity, onRemove, onCheckout }: Props) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (!open) return null;
  return <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <aside className="cart-drawer">
      <div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Giỏ hàng <span>({items.reduce((n, i) => n + i.quantity, 0)})</span></h2></div><button className="icon-button" onClick={onClose} aria-label="Đóng"><X /></button></div>
      <div className="cart-items">
        {items.length === 0 ? <div className="empty-cart"><ShoppingBag size={38} /><h3>Giỏ hàng đang trống</h3><p>Hãy chọn vài món đồ bạn yêu thích nhé.</p><button className="primary-button" onClick={onClose}>Tiếp tục mua sắm</button></div> :
          items.map(({ product, quantity }) => <div className="cart-item" key={product.id}>
            <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = "https://placehold.co/160x160/F0E8DE/765A48?text=ShopMini"; }} />
            <div className="cart-item-info"><strong>{product.name}</strong><span>{product.price.toLocaleString("vi-VN")}đ</span><div className="quantity-control"><button onClick={() => onQuantity(product.id, -1)} aria-label="Giảm"><Minus size={13} /></button><span>{quantity}</span><button onClick={() => onQuantity(product.id, 1)} aria-label="Tăng"><Plus size={13} /></button></div></div>
            <button className="remove-button" onClick={() => onRemove(product.id)} aria-label="Xóa"><Trash2 size={16} /></button>
          </div>)
        }
      </div>
      {items.length > 0 && <div className="cart-summary"><div className="summary-line"><span>Tạm tính</span><strong>{total.toLocaleString("vi-VN")}đ</strong></div><div className="summary-line"><span>Phí vận chuyển</span><span>Tính khi thanh toán</span></div><button className="primary-button full-button" onClick={onCheckout}>Tiến hành đặt hàng</button><small>Phí vận chuyển và ưu đãi sẽ được xác nhận ở bước tiếp theo.</small></div>}
    </aside>
  </div>;
}