import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Đã thay đổi trở lại đường dẫn logo gốc của bạn
import anhlogo1 from "./assets/images/keylogin.png"; 
import "./assets/css/login.css";

// Không cần import 'react-icons/fa' nữa

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username.trim() && password.trim()) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role: "user" })
        );
        alert("✅ Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container-full-screen">
      <div className="login-card-dark">
        {/* Đã sử dụng lại tên class login-logo-main cho logo */}
        <img src={anhlogo1} alt="Logo" className="login-logo-main" />

        <h2 className="login-title-primary">Đăng nhập vào tài khoản</h2>
        <p className="login-subtitle-secondary">Chào mừng bạn trở lại!</p>

        <form onSubmit={handleLogin} className="login-form">
          {/* Đã đổi tên class để tương thích với CSS mới */}
          <div className="form-group-icon">
            {/* Đã loại bỏ icon React và sử dụng lớp CSS để chèn icon (xem CSS) */}
            <input
              type="text"
              placeholder="Tên đăng nhập / Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-username" /* Thêm class để chèn icon User qua CSS */
            />
          </div>

          <div className="form-group-icon">
            {/* Đã loại bỏ icon React và sử dụng lớp CSS để chèn icon (xem CSS) */}
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-password" /* Thêm class để chèn icon Lock qua CSS */
            />
          </div>
          
          <a href="#" className="forgot-password-link">Quên mật khẩu?</a>

          <button 
            type="submit" 
            className="login-button-primary"
            disabled={loading}
          >
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="separator">Hoặc đăng nhập bằng</p>

        <div className="social-login">
          {/* Đã thay thế icon Google bằng thẻ <img> */}
          <button className="social-btn-icon google-color">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
              className="social-icon"
            />
            <span>Google</span>
          </button>

          {/* Đã thay thế icon Facebook bằng thẻ <img> */}
          <button className="social-btn-icon facebook-color">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="social-icon"
            />
            <span>Facebook</span>
          </button>
        </div>

        <p className="register-link-footer">
          Bạn chưa có tài khoản? <a href="#">**Tạo tài khoản mới**</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;