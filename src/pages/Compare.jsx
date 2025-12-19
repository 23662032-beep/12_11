import { useCompare } from "../CompareContext";
import { useNavigate } from "react-router-dom";

export default function Compare() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (!compareItems || compareItems.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>⚠️ Chưa có xe để so sánh</h2>
        <button onClick={() => navigate("/")}>← Quay lại</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>⚖️ So sánh xe</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Tiêu chí</th>
            {compareItems.map((c) => (
              <th key={c.id}>
                {c.title}
                <br />
                <button onClick={() => removeFromCompare(c.id)}>❌</button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Giá</td>
            {compareItems.map((c) => (
              <td key={c.id}>{c.price.toLocaleString()} $</td>
            ))}
          </tr>

          <tr>
            <td>Hình ảnh</td>
            {compareItems.map((c) => (
              <td key={c.id}>
                <img src={c.image} width="150" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <br />
      <button onClick={clearCompare}>🗑 Xóa tất cả</button>
    </div>
  );
}
