enum Color {
  green = "green",
  yellow = "yellow",
  red = "red",
  blue = "blue",
  gray = "gray",
}

const colorMap = {
  [Color.green]: "#52c41a",
  [Color.yellow]: "#faad14",
  [Color.red]: "#f5222d",
  [Color.blue]: "#1890ff",
  [Color.gray]: "#d9d9d9",
};

function StatusBadge({ color = Color.blue }: { color?: `${Color}` }) {
  return (
    <span
      className="status-badge-processing"
      style={{
        ["--status-color" as any]: colorMap[color],
      }}
    />
  );
}

export default StatusBadge;
