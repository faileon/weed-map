import { PropFunction, QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { Icon } from '@ui/icon';
export type HTMLButtonProps = QwikIntrinsicElements['button'];

interface ButtonProps extends HTMLButtonProps {
  iconPosition?: 'start' | 'end';
  label?: string;
  icon?: string;
  iconFilled?: boolean;
  onClick$?: PropFunction<() => void>;
  variant?: 'bordered' | 'filled' | 'ghost';
  color?: 'primary' | 'secondary' | 'error';
  class?: string;
}

export const Button = component$(({ icon, iconPosition = 'start', label, variant = 'bordered', class: _class, iconFilled, ...rest }: ButtonProps) => {
  const iconCmp = icon && <Icon icon={icon} filled={iconFilled} />;
  const isIconOnly = !label && !!icon;

  return (
    <button
      {...rest}
      class={[
        `rounded-md  flex items-center `,
        label ? 'px-4 py-2' : 'p-2',
        variant === 'bordered' && `border-2 border-primary-600`,
        variant === 'filled' ? `bg-primary-700 text-primary-50 border-2 border-primary-800 hover:bg-primary-600` : `text-primary-600 hover:bg-primary-50`,
        isIconOnly && `rounded-full`,
        _class,
      ]}
    >
      {icon && iconPosition === 'start' && iconCmp}
      {label && <span class={[`font-bold`, iconPosition === 'start' ? 'ml-4' : 'mr-4']}>{label}</span>}
      {icon && iconPosition === 'end' && iconCmp}
    </button>
  );
});
