// Chạy: node playground/test-cart.ts
import { products } from "../src/data/products.ts";
import { addToCart, updateQuantity, removeFromCart, countItems, calcTotal } from "../src/utils/cart.ts";
import type { CartItem } from "../src/utils/cart.ts";
import { formatPrice } from "../src/utils/format.ts";
import { filterProducts, getCategories, searchByPriceRange, groupByCategory } from "../src/utils/product.ts";

let cart: CartItem[] = [];
cart = addToCart(cart, products[0]);      // Áo thun x1
cart = addToCart(cart, products[0], 2);   // Áo thun x3
cart = addToCart(cart, products[1]);      // Túi tote x1
console.log("Số sản phẩm:", countItems(cart));
console.log("Tổng tiền:", formatPrice(calcTotal(cart)));

cart = updateQuantity(cart, products[0].id, 1);
cart = removeFromCart(cart, products[1].id);
console.log(cart.map((i) => `${i.product.name} x${i.quantity}`));

console.log("Danh mục:", getCategories(products));
console.log(
  "Gia dụng, giá tăng dần:",
  filterProducts(products, { category: "Gia dụng", sort: "asc" }).map((p) => p.name)
);
console.log(
  "Tìm 'áo', tối đa 300k:",
  filterProducts(products, { keyword: "áo", maxPrice: 300000 }).map((p) => p.name)
);
console.log(
  "Khoảng giá 150k - 400k:",
  searchByPriceRange(products, 150000, 400000).map((p) => p.name)
);
console.log("Số lượng theo danh mục:", groupByCategory(products));
