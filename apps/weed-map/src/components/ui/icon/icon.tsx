interface IconProps {
  class?: string;
  icon: string;
}
export const Icon = ({ class: _class, icon }: IconProps) => (
  <i class={_class + ' material-symbols-outlined'}>{icon}</i>
);
