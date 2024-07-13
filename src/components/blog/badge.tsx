import React from "react";

type BadgeProps = {
  children: string;
  icon?: React.ReactNode;
  color: keyof typeof badgeColors;
};

const badgeColors = {
  red: "bg-red-400",
  green: "bg-green-400",
  blue: "bg-blue-400",
  yellow: "bg-yellow-400",
  purple: "bg-purple-400",
};

const Badge = ({ children, icon, color }: BadgeProps) => {
  const colorClass = badgeColors[color];
  return (
    <div
      className={`${colorClass} mb-4 flex h-fit w-fit items-center gap-4 rounded-xl border-2 border-black p-2 text-black`}
    >
      {icon}
      <p className="font-serif text-xl">{children}</p>
    </div>
  );
};

export default Badge;
