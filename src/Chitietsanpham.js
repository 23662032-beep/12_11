// Chitietsanpham.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./assets/css/chitietsanpham.css"; // Hãy chắc chắn file này có trong thư mục assets/css

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch từ API
        const response = await fetch(
          `https://68f97a99ef8b2e621e7c302b.mockapi.io/products/${id}`
        );
        if (!response.ok) throw new Error();
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        // Nếu API lỗi (do ID 101, 102 không có trên MockAPI), ta dùng dữ liệu cứng để test giao diện
        console.log("Sử dụng dữ liệu tạm thời để hiển thị...");
        setProduct({
          id: id,
          title: "Siêu xe mẫu " + id,
          price: 150000,
          image:
            "https://www.topgear.com/sites/default/files/cars-car/image/2019/10/bmw_m8_coupe_fire_red_033.jpg",
          category: "Luxury Sport",
          description:
            "Đây là dữ liệu mẫu để bạn thấy trang đã đẹp. Hãy thêm xe này vào MockAPI để lấy dữ liệu thực.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", padding: "100px" }}>
        Đang khởi động...
      </div>
    );

  return (
    <div className="detail-page-wrapper">
      <div className="container">
        <button className="btn-back-nav" onClick={() => navigate(-1)}>
          ← QUAY LẠI SHOWROOM
        </button>

        <div className="detail-layout">
          <div className="image-box">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="detail-content">
            <span className="car-sub-title">PREMIUM SELECTION</span>
            <h1 className="car-main-title">{product.title}</h1>
            <div className="car-price-value">
              {Number(product.price).toLocaleString()} $
            </div>
            <p className="car-description">{product.description}</p>

            <div className="car-quick-specs">
              <div className="spec-item">
                <span>Mã lực</span>
                <strong>520 HP</strong>
              </div>
              <div className="spec-item">
                <span>0-100km/h</span>
                <strong>3.2s</strong>
              </div>
            </div>

            <div className="detail-button-group">
              <button className="btn-primary-buy">ĐẶT MUA NGAY</button>
              <button className="btn-secondary-compare">THÊM SO SÁNH</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
