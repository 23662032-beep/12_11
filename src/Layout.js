import "./assets/css/main.css";
import anhlogo from "./assets/images/logo.png";

import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useCart } from "./CartContext";
import { useCompare } from "./CompareContext";

/* ================= DATA ================= */

const products = [
  {
    id: 101,
    title: "BMW M8 Competition",
    desc: "Sức mạnh vượt trội, thiết kế thể thao sang trọng.",
    price: 160000,
    image:
      "https://www.topgear.com/sites/default/files/cars-car/image/2019/10/bmw_m8_coupe_fire_red_033.jpg",
    badge: "SPORT",
    featured: true,
  },
  {
    id: 102,
    title: "Mercedes-Benz S580",
    desc: "Đẳng cấp doanh nhân, nội thất tinh xảo.",
    price: 135000,
    image:
      "https://images.squarespace-cdn.com/content/v1/5cafdb14fb22a5285e179bdb/1671750496412-RP98E15B9SD2AN1Y90LO/2022+Mercedes+S580+Main-1.jpg?format=2500w",
    badge: "NEW",
    featured: true,
  },
  {
    id: 103,
    title: "Audi RS 7 Sportback",
    desc: "Sự pha trộn hoàn hảo giữa hiệu suất và tiện nghi.",
    price: 118000,
    image:
      "https://www.carmudi.vn/_next/image/?url=https://static.carmudi.vn/wp-content/uploads/2023-04/bOyQx7qIAk.jpg&w=1200&q=75",
    badge: "HOT",
    featured: true,
  },
  {
    id: 104,
    title: "Porsche 911 Carrera S",
    desc: "Biểu tượng của tốc độ và lịch sử.",
    price: 155000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMtuRoyXOqLrZQ5UW9EvXl3FwiWg1OokI_Q&s",
  },
  {
    id: 105,
    title: "Range Rover Velar",
    desc: "Thiết kế tối giản, công nghệ SUV hàng đầu.",
    price: 85000,
    image:
      "https://di-uploads-pod42.dealerinspire.com/landrovernorthdade/uploads/2022/05/rrvelar.jpg",
  },
  {
    id: 106,
    title: "Lexus LC 500 Convertible",
    desc: "Mẫu coupe mui trần sang trọng và cuốn hút.",
    price: 110000,
    image:
      "https://www.longolexus.com/blogs/3079/wp-content/uploads/2023/08/2022_lexus_lc-500-convertible_convertible_base_fq_oem_1_1600.jpg",
  },
  {
    id: 107,
    title: "Volvo XC90 T8 Recharge",
    desc: "An toàn, tiện nghi và thân thiện với môi trường.",
    price: 78000,
    image:
      "https://photo.znews.vn/w660/Uploaded/abhuuwo/2021_12_29/Volvo_XC90_T8.jpg",
  },
  {
    id: 108,
    title: "Cadillac CT5-V Blackwing",
    desc: "Hiệu suất cao, mang phong cách Mỹ.",
    price: 92000,
    image:
      "https://www.autoblog.com/.image/w_3840,q_auto:good,c_limit/NzowMDAwMDAwMDAwOTQyNjM1/2025-cadillac-ct5-v-blackwing-typhoon-metallic-1g6d35r60s0810411_010.png",
  },
];

const featuredProducts = products.filter((p) => p.featured);
const regularProducts = products.filter((p) => !p.featured);

/* ================= CAR CARD ================= */

const CarCard = ({ product, isFeatured = false, navigate }) => {
  const { addToCompare } = useCompare();

  return (
    <div
      className={`car-card-new ${isFeatured ? "featured-card" : ""}`}
      onClick={() => navigate(`/sanpham/${product.id}`)}
    >
      <div className="car-image-new">
        {product.badge && (
          <span className="car-badge-new">{product.badge}</span>
        )}
        <img src={product.image} alt={product.title} />
      </div>

      <div className="car-info-new">
        <h3 className="car-title-new">{product.title}</h3>
        <p className="car-desc-new">{product.desc}</p>
      </div>

      <div className="car-bottom-new">
        <span className="car-price-new">
          {Number(product.price).toLocaleString()} $
        </span>

        <div className="car-actions-new">
          <button className="car-btn-new">Chi tiết</button>

          <button
            onClick={(e) => {
              e.stopPropagation(); // 🚫 tránh click vào card
              addToCompare(product); // ✅ THÊM XE VÀO SO SÁNH
              navigate("/compare"); // 👉 chuyển sang trang so sánh
            }}
          >
            ⚖️ So sánh
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= LAYOUT ================= */

const Layout = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems = [] } = useCart();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isShowroomPage =
    location.pathname === "/" || location.pathname === "/trang1";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="auto-header">
        <div className="auto-header-top">
          <div className="auto-nav-left">
            <Link to="/">Trang chủ</Link>
            <Link to="/Showroom">Showroom</Link>
            <Link to="/admin/products">Quản trị</Link>
          </div>

          <div className="auto-logo">
            <img src={anhlogo} alt="logo" />
          </div>

          <div className="auto-nav-right">
            {user ? (
              <>
                <span className="auto-user">👤 {user.username}</span>
                <button onClick={handleLogout} className="auto-logout">
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="auto-login">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main>
        {isShowroomPage ? (
          <>
            <section className="showroom-section">
              <h2 className="section-title">🌟 Xe Nổi Bật</h2>

              <div className="cars-list-featured">
                {featuredProducts.map((p) => (
                  <CarCard
                    key={p.id}
                    product={p}
                    isFeatured
                    navigate={navigate}
                  />
                ))}
              </div>
            </section>
            <section className="promo-banner-new">
              <h3>🎁 Ưu Đãi Giới Hạn</h3>
              <p>
                Nhận ngay gói bảo dưỡng cao cấp 3 năm khi mua xe trong tháng
                này.
              </p>
              <button className="promo-btn-new">Đăng Ký Ngay</button>
            </section>
            <section className="showroom-section">
              <h2 className="section-title">🚗 Tất Cả Mẫu Xe</h2>

              <div className="cars-list-new">
                {regularProducts.map((p) => (
                  <CarCard key={p.id} product={p} navigate={navigate} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <Outlet />
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="auto-footer">
        <div className="footer-bottom">
          © 2025 Auto Showroom. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Layout;
