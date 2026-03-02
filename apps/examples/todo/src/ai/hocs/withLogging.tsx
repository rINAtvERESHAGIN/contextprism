import { debounce } from 'lodash';
import React from 'react';

// HOC с поддержкой вызова оригинальных обработчиков
export const withLogging = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  name: string,
  description = ''
) => {
  const WithLogging: React.FC<P> = (props: P) => {
    const {
      onMouseEnter: originalOnMouseEnter,
      onMouseLeave: originalOnMouseLeave,
      onClick: originalOnClick,
      onSelect: originalOnSelect,
      ...restProps
    } = props as any; // any — чтобы не усложнять типизацию для примера

    const log = debounce((eventType: string) => {
      console.log(
        name,
        description || WrappedComponent.name || 'Component',
        '---------',
        eventType
      );
    }, 300);

    const handleMouseEnter = (e: React.MouseEvent) => {
      log('mouseEnter');
      originalOnMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      log('mouseLeave');
      originalOnMouseLeave?.(e);
    };

    const handleClick = (e: React.MouseEvent) => {
      log('click');
      originalOnClick?.(e);
    };

    const handleSelect = (e: React.SyntheticEvent) => {
      log('textSelect');
      originalOnSelect?.(e);
    };

    return (
      <WrappedComponent
        {...(restProps as P)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onSelect={handleSelect}
      />
    );
  };

  WithLogging.displayName = `WithLogging(${name})`;

  return WithLogging;
};

/* перечисление компонентов которые могут потребоваться в чате


попробовать чаты организовывать по путям*/
