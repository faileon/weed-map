import { Icon } from '../ui/icon/icon';

interface LogoProps {
  class: string;
}
export const Logo = ({ class: _class }: LogoProps) => (
  <Icon class={_class} icon="grass" />
);
