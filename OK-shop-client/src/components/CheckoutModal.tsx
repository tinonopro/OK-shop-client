import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, X } from "lucide-react";
import type { CartItem } from "../types";

type Props = { open: boolean; items: CartItem[]; onClose: () => void; onComplete: () => void };
export default function CheckoutModal({ open, items, onClose, onComplete }: Props) {
  const [done, setDone] = useState(false);
  if (!open) return null;
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setDone(true); };
  const finish = () => { setDone(false); onComplete(); };
  return <div className="overlay modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="checkout-modal"><button className="modal-close icon-button" onClick={onClose} aria-label="Đóng"><X /></button>
      {done ? <div className="checkout-success"><CheckCircle2 size={54} /><span className="eyebrow">THANK YOU</span><h2>Đặt hàng thành công!</h2><p>Cảm ơn bạn đã chọn ShopMini. Đây là xác nhận mô phỏng cho giao diện học tập, chưa tạo đơn hàng thực tế.</p><button className="primary-button" onClick={finish}>Hoàn tất</button></div> :
      <><span className="eyebrow">ALMOST YOURS</span><h2>Thông tin đặt hàng</h2><p className="checkout-note">Vui lòng điền thông tin nhận hàng của bạn.</p><form onSubmit={submit} className="checkout-form"><label>Họ và tên<input required minLength={2} placeholder="Nguyễn Văn A" /></label><label>Số điện thoại<input required pattern="[0-9+ ]{9,15}" placeholder="09xxxxxxxx" /></label><label>Email<input type="email" required placeholder="email@example.com" /></label><label>Địa chỉ nhận hàng<textarea required rows={3} placeholder="Số nhà, đường, phường/xã, quận/huyện..." /></label><div className="checkout-total"><span>Tổng thanh toán (tạm tính)</span><strong>{total.toLocaleString("vi-VN")}đ</strong></div><button className="primary-button full-button" type="submit">Xác nhận đặt hàng</button></form></>}
    </section>
  </div>;
}