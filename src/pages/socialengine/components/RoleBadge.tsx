interface RoleBadgeProps {
  role: string
}

export function RoleBadge({ role }: RoleBadgeProps) {
  if (!role) return null

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-secondary uppercase tracking-wide">Detected Role</span>
      <span className="px-3 py-1 text-sm bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30">
        {role}
      </span>
    </div>
  )
}
