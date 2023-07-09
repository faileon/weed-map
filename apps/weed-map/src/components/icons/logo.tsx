interface LogoProps {
  class: string;
}
export const Logo = ({class: _class} : LogoProps) => (
  <i class={_class + " material-symbols-outlined"}>grass</i>
);
