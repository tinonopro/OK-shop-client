import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import CheckoutModal from "./components/CheckoutModal";
import { products } from "./data/products";
import type { CartItem, Product } from "./types";
import "./App.css";

function readStorage<T,>(key: string, fallback: T): T {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<CartItem[]>(() => readStorage("shopmini-cart", []));
  const [favorites, setFavorites] = useState<number[]>(() => readStorage("shopmini-favorites", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { localStorage.setItem("shopmini-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("shopmini-favorites", JSON.stringify(favorites)); }, [favorites]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);
  const visibleProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLocaleLowerCase("vi").includes(search.toLocaleLowerCase("vi")) || p.category.toLocaleLowerCase("vi").includes(search.toLocaleLowerCase("vi"));
      const matchesCategory = category === "Tất cả" || p.category === category;
      const matchesFavorite = !favoritesOnly || favorites.includes(p.id);
      return matchesSearch && matchesCategory && matchesFavorite;
    });
    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "vi"));
    return result;
  }, [search, category, sort, favoritesOnly, favorites]);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item);
      return [...current, { product, quantity: 1 }];
    });
    setSelectedProduct(null); setCartOpen(true); notify("Đã thêm sản phẩm vào giỏ hàng");
  };
  const toggleFavorite = (id: number) => {
    const isFavorite = favorites.includes(id);
    setFavorites((current) => isFavorite ? current.filter((item) => item !== id) : [...current, id]);
    notify(isFavorite ? "Đã bỏ khỏi yêu thích" : "Đã thêm vào yêu thích");
  };
  const updateQuantity = (id: number, delta: number) => setCart((current) => current.map((item) => item.product.id === id ? { ...item, quantity: Math.max(1, Math.min(item.quantity + delta, item.product.stock)) } : item));
  const removeItem = (id: number) => setCart((current) => current.filter((item) => item.product.id !== id));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <div id="top">
    <Header cartCount={cartCount} favoriteCount={favorites.length} search={search} onSearch={(value) => { setSearch(value); setFavoritesOnly(false); }} onCart={() => setCartOpen(true)} onFavorites={() => { setFavoritesOnly((v) => !v); setCategory("Tất cả"); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} onHome={() => { setSearch(""); setCategory("Tất cả"); setFavoritesOnly(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
    <main>
      <Banner onShop={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} />
      <section className="intro-strip container" id="story"><div><Sparkles size={18} /><span>Thoughtfully selected</span></div><p>Ít hơn nhưng tốt hơn — chọn lựa có chủ đích cho mỗi ngày.</p><a href="#products">Tìm hiểu thêm <ArrowRight size={14} /></a></section>
      <section className="container category-section"><div className="mini-heading"><span className="eyebrow">FIND YOUR FAVORITE</span><h2>Mua sắm theo <em>nhu cầu</em></h2></div><CategoryList categories={categories} selected={category} onSelect={(value) => { setCategory(value); setFavoritesOnly(false); }} /></section>
      <div className="container filter-status">{favoritesOnly && <button className="filter-pill" onClick={() => setFavoritesOnly(false)}><Heart size={14} fill="currentColor" /> Đang xem yêu thích · Bỏ lọc</button>}{search && <button className="filter-pill" onClick={() => setSearch("")}>Từ khóa: “{search}” ×</button>}</div>
      <ProductList items={visibleProducts} favorites={favorites} sort={sort} onSort={setSort} onFavorite={toggleFavorite} onAdd={addToCart} onDetails={setSelectedProduct} />
      <section className="newsletter container"><div><span className="eyebrow">A NOTE FROM US</span><h2>Nhận chút cảm hứng <em>mỗi tuần.</em></h2><p>Đăng ký để cập nhật sản phẩm mới và những ưu đãi nho nhỏ.</p></div><form onSubmit={(e) => { e.preventDefault(); notify("Cảm ơn bạn đã đăng ký nhận tin!"); (e.currentTarget as HTMLFormElement).reset(); }}><input type="email" required placeholder="Địa chỉ email của bạn" /><button type="submit">Đăng ký <ArrowRight size={16} /></button></form></section>
    </main>
    <Footer />
    <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} onRemove={removeItem} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />
    <ProductModal product={selectedProduct} favorite={selectedProduct ? favorites.includes(selectedProduct.id) : false} onClose={() => setSelectedProduct(null)} onAdd={addToCart} onFavorite={toggleFavorite} />
    <CheckoutModal open={checkoutOpen} items={cart} onClose={() => setCheckoutOpen(false)} onComplete={() => { setCheckoutOpen(false); setCart([]); notify("Cảm ơn bạn đã mua sắm tại ShopMini!"); }} />
    {toast && <div className="toast">{toast}</div>}
  </div>;
}