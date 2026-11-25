import { ArrowRight, Leaf } from "lucide-react";

export default function Banner({ onShop }: { onShop: () => void }) {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <span className="eyebrow"><Leaf size={14} /> THE LITTLE THINGS MATTER</span>
        <h1>Chọn điều giản dị.<br /><em>Sống thật tinh tế.</em></h1>
        <p>Những món đồ được chọn lựa để làm ngày thường của bạn trở nên dễ chịu và đẹp đẽ hơn.</p>
        <button className="primary-button" onClick={onShop}>Khám phá bộ sưu tập <ArrowRight size={17} /></button>
        <div className="hero-footnote"><span>01 — 08</span><span className="footnote-line" /> Curated for your everyday</div>
      </div>
      <div className="hero-image">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=90" alt="Không gian cửa hàng phong cách tối giản" />
        <div className="hero-stamp"><span>slow</span><span>living</span><small>EST. 2024</small></div>
      </div>
    </section>
  );
}