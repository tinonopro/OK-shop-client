import { LayoutGrid, Shirt, Headphones, Coffee, BookOpen, ShoppingBag } from "lucide-react";

const icons = [LayoutGrid, Shirt, ShoppingBag, Coffee, Headphones, BookOpen];
type Props = { categories: string[]; selected: string; onSelect: (category: string) => void };

export default function CategoryList({ categories, selected, onSelect }: Props) {
  const all = ["Tất cả", ...categories];
  return (
    <div className="category-row">
      {all.map((category, index) => {
        const Icon = icons[index % icons.length];
        return <button key={category} className={selected === category ? "category-chip active" : "category-chip"} onClick={() => onSelect(category)}>
          <Icon size={16} /><span>{category}</span>
        </button>;
      })}
    </div>
  );
}