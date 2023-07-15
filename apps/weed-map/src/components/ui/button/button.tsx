import { PropFunction, component$ } from '@builder.io/qwik';
import { Icon } from '@ui/icon';

interface ButtonProps {
  iconPosition?: 'start' | 'end';
  label?: string;
  icon?: string;
  onClick$?: PropFunction<() => void>;
  variant?: 'bordered' | 'filled' | 'ghost';
  color?: 'primary' | 'secondary' | 'error';
}

export const Button = component$(
  ({
    icon,
    iconPosition = 'start',
    label,
    variant = 'bordered',
    ...rest
  }: ButtonProps) => {
    const iconCmp = icon && <Icon icon={icon} />;

    return (
      <button
        {...rest}
        class={[
          `rounded-md  flex items-center text-primary-800`,
          label ? 'px-4 py-2' : 'p-2',
          variant === 'bordered' && `border-2 border-primary-800`,
          variant === 'filled' && `bg-primary-100`,
        ]}
      >
        {icon && iconPosition === 'start' && iconCmp}
        {label && (
          <span
            class={[`font-bold`, iconPosition === 'start' ? 'ml-4' : 'mr-4']}
          >
            {label}
          </span>
        )}
        {icon && iconPosition === 'end' && iconCmp}
      </button>
    );
  }
);
