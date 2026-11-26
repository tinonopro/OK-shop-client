import { PRICE_OPTIONS } from "../utils/product.ts";

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

export default function PriceFilter({ selected, onSelect }: Props) {
  return (
    <div className="price-row" role="group" aria-label="Lọc theo mức giá">
      {PRICE_OPTIONS.map((option) => (
        <button
          key={option.id}
          className={selected === option.id ? "price-chip active" : "price-chip"}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
