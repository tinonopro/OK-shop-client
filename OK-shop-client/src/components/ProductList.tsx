import { SlidersHorizontal } from "lucide-react";
import type { Product } from "../types.ts";
import ProductCard from "./ProductCard";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: Product[];
  favorites: number[];
  sort: string;
  onSort: (value: string) => void;
  onFavorite: (id: number) => void;
  onAdd: (product: Product) => void;
};

export default function ProductList({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  favorites,
  sort,
  onSort,
  onFavorite,
  onAdd,
}: Props) {
  return (
    <section className="products-section container" id={id}>
      <div className="section-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <label className="sort-select">
          <SlidersHorizontal size={16} />
          <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sắp xếp sản phẩm">
            <option value="featured">Sắp xếp: Nổi bật</option>
            <option value="low">Giá: Thấp đến cao</option>
            <option value="high">Giá: Cao đến thấp</option>
            <option value="name">Tên A–Z</option>
          </select>
        </label>
      </div>
      {items.length ? (
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              onFavorite={onFavorite}
              onAdd={onAdd}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>♡</span>
          <h3>Chưa tìm thấy sản phẩm phù hợp</h3>
          <p>Thử từ khóa khác, mức giá khác hoặc chọn danh mục khác nhé.</p>
        </div>
      )}
      <div className="product-count">Đang hiển thị {items.length} sản phẩm</div>
    </section>
  );
}
