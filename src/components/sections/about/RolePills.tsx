interface RolePillsProps {
  roles: string[];
}

export function RolePills({ roles }: RolePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <span
          key={role}
          className="glass-pill px-3 py-1 rounded-full text-meta text-primary-fixed"
        >
          {role}
        </span>
      ))}
    </div>
  );
}
