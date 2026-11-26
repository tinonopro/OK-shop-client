import type { Product } from "../types.ts";
export type { Product };

export const products: Product[] = [
  {
    id: 1, name: "Áo thun cotton Everyday", price: 189000, oldPrice: 239000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
    category: "Thời trang", stock: 18, rating: 4.9, reviews: 128, badge: "Bán chạy",
    description: "Áo thun cotton mềm mại, thoáng mát với phom dáng tối giản. Dễ dàng kết hợp trong mọi outfit thường ngày."
  },
  {
    id: 2, name: "Túi tote Canvas Nâu", price: 159000,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=85",
    category: "Phụ kiện", stock: 12, rating: 4.8, reviews: 86, badge: "Mới",
    description: "Túi canvas dày dặn, tiện dụng cho những buổi cà phê, đi học và dạo phố."
  },
  {
    id: 3, name: "Bình giữ nhiệt Minimal", price: 249000, oldPrice: 299000,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
    category: "Gia dụng", stock: 0, rating: 4.7, reviews: 54,
    description: "Thiết kế thanh lịch, nhỏ gọn, phù hợp mang theo mỗi ngày. Sản phẩm hiện tạm hết hàng."
  },
  {
    id: 4, name: "Tai nghe Studio Lite", price: 499000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
    category: "Điện tử", stock: 9, rating: 4.9, reviews: 203, badge: "Được yêu thích",
    description: "Tai nghe phong cách tối giản, đệm tai êm và âm thanh cân bằng cho nhu cầu giải trí hằng ngày."
  },
  {
    id: 5, name: "Sổ tay The Slow Days", price: 99000,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=85",
    category: "Văn phòng phẩm", stock: 25, rating: 4.8, reviews: 71,
    description: "Sổ tay giấy mịn với bìa màu trung tính, dành cho kế hoạch, ghi chú và những ý tưởng nhỏ."
  },
  {
    id: 6, name: "Đèn bàn Warm Light", price: 389000, oldPrice: 459000,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=85",
    category: "Gia dụng", stock: 4, rating: 4.6, reviews: 39, badge: "Ưu đãi",
    description: "Đèn bàn ánh sáng ấm, tạo cảm giác thư thái cho góc đọc sách hoặc bàn làm việc."
  },
  {
    id: 7, name: "Balo Daily Carry", price: 429000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=85",
    category: "Phụ kiện", stock: 3, rating: 4.7, reviews: 62,
    description: "Balo gọn nhẹ với nhiều ngăn tiện dụng, phù hợp cho lịch trình năng động."
  },
  {
    id: 8, name: "Ly gốm Morning", price: 129000,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85",
    category: "Gia dụng", stock: 14, rating: 4.9, reviews: 94,
    description: "Chiếc ly gốm mang sắc thái mộc mạc, đồng hành cùng tách trà hay cà phê mỗi sáng."
  }
];
