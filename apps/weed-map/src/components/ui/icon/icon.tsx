interface IconProps {
  class?: string;
  icon: string;
  filled?: boolean;
}
export const Icon = ({ class: _class, icon, filled }: IconProps) => <i class={[_class, 'material-symbols-outlined', filled && 'filled']}>{icon}</i>;
