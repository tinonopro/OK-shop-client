import { SlidersHorizontal } from "lucide-react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

type Props = {
  items: Product[];
  favorites: number[];
  sort: string;
  onSort: (value: string) => void;
  onFavorite: (id: number) => void;
  onAdd: (product: Product) => void;
  onDetails: (product: Product) => void;
};

export default function ProductList({ items, favorites, sort, onSort, onFavorite, onAdd, onDetails }: Props) {
  return (
    <section className="products-section container" id="products">
      <div className="section-heading">
        <div><span className="eyebrow">A FEW GOOD THINGS</span><h2>Những lựa chọn <em>được yêu thích</em></h2><p>Đơn giản, hữu ích và luôn có chỗ trong cuộc sống của bạn.</p></div>
        <label className="sort-select"><SlidersHorizontal size={16} /><select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Sắp xếp sản phẩm">
          <option value="featured">Sắp xếp: Nổi bật</option><option value="low">Giá: Thấp đến cao</option><option value="high">Giá: Cao đến thấp</option><option value="name">Tên A–Z</option>
        </select></label>
      </div>
      {items.length ? <div className="product-grid">
        {items.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={onFavorite} onAdd={onAdd} onDetails={onDetails} />)}
      </div> : <div className="empty-state"><span>♡</span><h3>Chưa tìm thấy món đồ phù hợp</h3><p>Thử một từ khóa khác hoặc chọn danh mục khác nhé.</p></div>}
      <div className="product-count">Đang hiển thị {items.length} sản phẩm</div>
    </section>
  );
}