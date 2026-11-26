import { useState } from "react";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";

type Props = {
  cartCount: number;
  favoriteCount: number;
  favoritesOnly: boolean;
  search: string;
  onSearch: (value: string) => void;
  onCart: () => void;
  onFavorites: () => void;
  onHome: () => void;
};

export default function Header({
  cartCount,
  favoriteCount,
  favoritesOnly,
  search,
  onSearch,
  onCart,
  onFavorites,
  onHome,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="top-note">OK Shop · Chọn lọc những món đồ tinh tế cho mỗi ngày</div>
      <div className="header-main container">
        <button className="icon-button mobile-menu" aria-label="Mở menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <button className="brand" onClick={onHome} aria-label="OK Shop trang chủ">
          <span className="brand-mark">ok</span>
          <span>OK<span className="brand-light">shop</span><small>EVERYDAY, BEAUTIFULLY</small></span>
        </button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <button onClick={() => { onHome(); setMenuOpen(false); }}>Trang chủ</button>
          <a href="#products" onClick={() => setMenuOpen(false)}>Sản phẩm</a>
          <a href="#footer" onClick={() => setMenuOpen(false)}>Liên hệ</a>
        </nav>
        <div className="header-actions">
          <label className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
            />
          </label>
          <button
            className={favoritesOnly ? "icon-button has-count active-icon" : "icon-button has-count"}
            onClick={onFavorites}
            aria-label="Yêu thích"
            title="Sản phẩm yêu thích"
          >
            <Heart fill={favoritesOnly ? "currentColor" : "none"} />
            {favoriteCount > 0 && <span className="count">{favoriteCount}</span>}
          </button>
          <button
            className="icon-button has-count"
            onClick={onCart}
            aria-label="Giỏ hàng"
            title="Giỏ hàng"
          >
            <ShoppingBag />
            {cartCount > 0 && <span className="count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
