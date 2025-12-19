// ShowroomPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "./CompareContext"; // Import hook so sánh

import { useCart } from "./CartContext";

const products = [
  {
    id: 101,
    title: "BMW M8 Competition",
    desc: "Sức mạnh vượt trội, thiết kế thể thao sang trọng.",
    price: 160000,
    image:
      "https://www.topgear.com/sites/default/files/cars-car/image/2019/10/bmw_m8_coupe_fire_red_033.jpg",
    badge: "SPORT",
  },
  {
    id: 102,
    title: "Mercedes-Benz S580",
    desc: "Đẳng cấp doanh nhân, nội thất tinh xảo.",
    price: 135000,
    image:
      "https://images.squarespace-cdn.com/content/v1/5cafdb14fb22a5285e179bdb/1671750496412-RP98E15B9SD2AN1Y90LO/2022+Mercedes+S580+Main-1.jpg?format=2500w",
    badge: "NEW",
  },
  {
    id: 103,
    title: "Audi RS 7 Sportback",
    desc: "Sự pha trộn hoàn hảo giữa hiệu suất và tiện nghi.",
    price: 118000,
    image:
      "https://static.carmudi.vn/wp-content/uploads/2023-04/bOyQx7qIAk.jpg",
    badge: "BEST SELLER",
  },
  {
    id: 104,
    title: "Porsche 911 Carrera S",
    desc: "Biểu tượng của tốc độ và lịch sử.",
    price: 155000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpqhEmIcGuzscUFDGC5XtYVu3Rv9mZ-c1PTw&s",
    badge: "SPORT",
  },
  {
    id: 105,
    title: "Range Rover Velar",
    desc: "Thiết kế tối giản, công nghệ SUV hàng đầu.",
    price: 85000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4SI0ovFdfpfcJBXWbXZaG8XTPZmq2Ukwozg&s",
  },
  {
    id: 106,
    title: "Lexus LC 500 Convertible",
    desc: "Mẫu coupe mui trần sang trọng và cuốn hút.",
    price: 110000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1J8fYNDYuFHMYEu9CVJvgxDSJdqVWnPBeuw&s",
  },
];

const ShowroomPage = () => {
  const navigate = useNavigate();
  const { addToCompare } = useCompare(); // Lấy hàm thêm vào so sánh

  // Hàm xử lý khi nhấn vào card (tránh bị nhảy trang khi nhấn nút So sánh)
  const handleCardClick = (e, id) => {
    // Nếu nhấn vào nút So sánh thì không chuyển trang
    if (e.target.closest(".car-btn-compare")) return;
    navigate(`/chitietsanpham/${id}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="showroom-hero-new">
        <div className="showroom-hero-content">
          <h1>Khám phá Showroom</h1>
          <p>
            Bộ sưu tập xe cao cấp được chọn lọc, luôn cập nhật các mẫu mới nhất.
          </p>
          <div className="hero-cta-group">
            <button className="hero-cta-btn primary">Xem Xe Nổi Bật</button>
            <button className="hero-cta-btn secondary">Yêu cầu Tư vấn</button>
          </div>
        </div>
      </section>

      {/* Filter Area */}
      <section className="showroom-filter-area">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, mẫu xe..."
          className="filter-search-input"
        />
        <div className="filter-dropdowns">
          <select>
            <option>Hãng xe</option>
            <option>BMW</option>
            <option>Mercedes</option>
          </select>
          <select>
            <option>Mức giá</option>
            <option>Trên 100K $</option>
          </select>
          <select>
            <option>Năm sản xuất</option>
            <option>2024</option>
          </select>
        </div>
      </section>

      {/* Showroom List */}
      <section className="showroom-section">
        <h2 className="section-title">✨ Mẫu Xe Sang Trọng</h2>
        <div className="cars-list-new">
          {products.map((p) => (
            <div
              key={p.id}
              className="car-card-new"
              onClick={(e) => handleCardClick(e, p.id)}
            >
              <div className="car-image-new">
                {p.badge && <span className="car-badge-new">{p.badge}</span>}
                <img src={p.image} alt={p.title} />
              </div>

              <div className="car-info-new">
                <h3 className="car-title-new">{p.title}</h3>
                <p className="car-desc-new">{p.desc}</p>
              </div>

              <div className="car-bottom-new">
                <span className="car-price-new">
                  {Number(p.price).toLocaleString()} $
                </span>
                <div className="btn-action-group">
                  <button className="car-btn-new">Chi tiết</button>
                  {/* NÚT SO SÁNH MỚI THÊM VÀO */}
                  <button
                    className="car-btn-compare"
                    onClick={() => addToCompare(p)}
                  >
                    ⚖️ So sánh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner-new">
        <h3>🎁 Ưu Đãi Giới Hạn</h3>
        <p>Nhận ngay gói bảo dưỡng cao cấp 3 năm khi mua xe trong tháng này.</p>
        <button className="promo-btn-new">Đăng Ký Ngay</button>
      </section>
    </>
  );
};

export default ShowroomPage;
