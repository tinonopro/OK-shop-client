import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <div className="brand footer-logo">
            <span className="brand-mark">ok</span>
            <span>OK<span className="brand-light">shop</span><small>EVERYDAY, BEAUTIFULLY</small></span>
          </div>
          <p>Một góc nhỏ dành cho những điều giản dị, tinh tế và hữu ích trong cuộc sống thường ngày.</p>
          <div className="socials">
            <a href="https://instagram.com" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://facebook.com" aria-label="Facebook"><FacebookIcon /></a>
          </div>
        </div>
        <div>
          <h4>Khám phá</h4>
          <a href="#products">Sản phẩm</a>
          <a href="#top">Trang chủ</a>
        </div>
        <div>
          <h4>Hỗ trợ</h4>
          <a href="#footer">Hướng dẫn mua hàng</a>
          <a href="#footer">Chính sách đổi trả</a>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <p><MapPin size={15} /> TP. Hồ Chí Minh, Việt Nam</p>
          <p><Phone size={15} /> 1900 0000</p>
          <p><Mail size={15} /> hello@okshop.vn</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© {currentYear} OK Shop.</span>
          <span>Lab 1 — Danh sách &amp; Tìm kiếm sản phẩm</span>
          <a href="#top" aria-label="Lên đầu trang"><ArrowUp size={16} /></a>
        </div>
      </div>
    </footer>
  );
}
