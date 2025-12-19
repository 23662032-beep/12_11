import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import "./assets/css/quanlysp.css";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error("Lỗi:", error.message);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("Bạn có chắc chắn muốn gỡ bỏ mẫu xe này khỏi Showroom?")
    ) {
      const { error } = await supabase.from("product1").delete().eq("id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else fetchProducts();
    }
  };

  return (
    <div className="admin-manage-container">
      <div className="admin-header-box">
        <div className="header-left">
          <h1>Hệ thống Quản lý Showroom</h1>
          <p>Quản lý danh sách xe và thông số kỹ thuật hệ thống TVHANHCAR</p>
        </div>
        <button
          className="btn-add-new"
          onClick={() => navigate("/admin/edit/new")}
        >
          <span>+</span> Thêm mẫu xe mới
        </button>
      </div>

      <div className="admin-content-card">
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Thông tin mẫu xe</th>
                <th>Giá niêm yết</th>
                <th>Đánh giá</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="col-img">
                    <div className="img-wrapper">
                      <img src={p.image} alt={p.title} />
                    </div>
                  </td>
                  <td className="col-info">
                    <div className="car-name">{p.title}</div>
                    <div className="car-id">ID: #TVH-{p.id}</div>
                  </td>
                  <td className="col-price">
                    <span className="price-tag">
                      {Number(p.price).toLocaleString()} $
                    </span>
                  </td>
                  <td className="col-rating">
                    <div className="rating-badge">
                      ⭐ {p.rating_rate}{" "}
                      <span className="count">({p.rating_count})</span>
                    </div>
                  </td>
                  <td className="col-actions">
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/admin/edit/${p.id}`)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListProducts_SP_Admin;
