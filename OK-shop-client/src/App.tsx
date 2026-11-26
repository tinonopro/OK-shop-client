import { useEffect, useMemo, useRef, useState } from "react";
import { Heart } from "lucide-react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import PriceFilter from "./components/PriceFilter";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import { products } from "./data/products";
import type { Product } from "./types";
import { filterProducts, getCategories, PRICE_OPTIONS, searchByPriceRange } from "./utils/product";
import { addToCart, countItems, removeFromCart, updateQuantity } from "./utils/cart";
import type { CartItem } from "./utils/cart";
import "./App.css";

function readStorage<T,>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => readStorage("okshop-cart", []));
  const [favorites, setFavorites] = useState<number[]>(() => readStorage("okshop-favorites", []));

  useEffect(() => {
    localStorage.setItem("okshop-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("okshop-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const categories = useMemo(() => getCategories(products), []);

  const selectedPriceOption = useMemo(
    () => PRICE_OPTIONS.find((opt) => opt.id === priceRange) ?? PRICE_OPTIONS[0],
    [priceRange]
  );

  const visibleProducts = useMemo(() => {
    const sortOrder = sort === "low" ? "asc" : sort === "high" ? "desc" : undefined;
    let result = filterProducts(products, {
      keyword: search,
      category,
      sort: sortOrder,
    });
    if (priceRange !== "all") {
      result = searchByPriceRange(result, selectedPriceOption.min, selectedPriceOption.max);
    }
    if (favoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id));
    }
    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "vi"));
    }
    return result;
  }, [search, category, priceRange, selectedPriceOption, favoritesOnly, favorites, sort]);

  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) return;
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing && existing.quantity >= product.stock) {
        notify("Đã đạt số lượng tối đa trong kho");
        return current;
      }
      notify("Đã thêm sản phẩm vào giỏ hàng");
      return addToCart(current, product, 1);
    });
  };

  const handleToggleFavorite = (id: number) => {
    const isFav = favorites.includes(id);
    setFavorites((current) =>
      isFav ? current.filter((item) => item !== id) : [...current, id]
    );
    notify(isFav ? "Đã bỏ khỏi yêu thích" : "Đã thêm vào yêu thích");
  };

  const handleQuantity = (id: number, quantity: number) => {
    setCart((current) => updateQuantity(current, id, quantity));
  };

  const handleRemove = (id: number) => {
    setCart((current) => removeFromCart(current, id));
  };

  const handleCheckout = () => {
    setCart([]);
    setCartOpen(false);
    notify("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại OK Shop.");
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("Tất cả");
    setPriceRange("all");
    setFavoritesOnly(false);
    setSort("featured");
  };

  const cartCount = countItems(cart);

  return (
    <div id="top">
      <Header
        cartCount={cartCount}
        favoriteCount={favorites.length}
        favoritesOnly={favoritesOnly}
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setFavoritesOnly(false);
        }}
        onCart={() => setCartOpen(true)}
        onFavorites={() => {
          setFavoritesOnly((v) => !v);
          document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        }}
        onHome={() => {
          resetFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <main>
        <Banner onShop={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} />
        <section className="container category-section">
          <div className="mini-heading">
            <span className="eyebrow">CHỌN LỌC NHANH</span>
            <h2>Mua sắm theo <em>nhu cầu</em></h2>
          </div>
          <CategoryList
            categories={categories}
            selected={category}
            onSelect={(value) => {
              setCategory(value);
              setFavoritesOnly(false);
            }}
          />
          <PriceFilter selected={priceRange} onSelect={setPriceRange} />
        </section>
        <div className="container filter-status">
          {favoritesOnly && (
            <button className="filter-pill" onClick={() => setFavoritesOnly(false)}>
              <Heart size={13} fill="currentColor" /> Đang xem yêu thích ×
            </button>
          )}
          {priceRange !== "all" && (
            <button className="filter-pill" onClick={() => setPriceRange("all")}>
              Mức giá: {selectedPriceOption.label} ×
            </button>
          )}
          {search && (
            <button className="filter-pill" onClick={() => setSearch("")}>
              Từ khóa: “{search}” ×
            </button>
          )}
        </div>
        <ProductList
          id="products"
          eyebrow="SẢN PHẨM ĐANG BÁN"
          title="Danh sách sản phẩm"
          subtitle="Chọn danh mục, mức giá hoặc tìm kiếm để lọc nhanh sản phẩm."
          items={visibleProducts}
          favorites={favorites}
          sort={sort}
          onSort={setSort}
          onFavorite={handleToggleFavorite}
          onAdd={handleAddToCart}
        />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQuantity={handleQuantity}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
