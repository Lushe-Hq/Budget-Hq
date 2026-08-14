import { Paper } from "@mui/material";

function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <Paper
      elevation={0}
      className="financial-card"
      sx={{
        position: "relative",
        overflow: "hidden",
        padding: "22px",
        borderRadius: "18px",
        backgroundColor: "#ffffff",
        border: "1px solid #f1e4e9",
        boxShadow:
          "0 8px 25px rgba(80, 35, 55, 0.06)",
      }}
    >
      <div
        className="financial-card-accent"
        style={{
          backgroundColor: color,
        }}
      />

      <div className="financial-card-content">
        <p className="financial-card-title">
          {title}
        </p>

        <h2 className="financial-card-value">
          {value}
        </h2>
      </div>
    </Paper>
  );
}

export default DashboardCard;