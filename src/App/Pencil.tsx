interface PencilProps {
  nums: number[];
}

export default function Pencil({ nums }: PencilProps) {
  return (
    <span className="pencil-grid">
      {Array(9)
        .fill(0)
        .map((_, key) => (
          <span
            className={
              "pencil-cell" + (nums.includes(key + 1) ? "" : " invisible")
            }
            key={key}
          >
            {key + 1}
          </span>
        ))}
    </span>
  );
}
