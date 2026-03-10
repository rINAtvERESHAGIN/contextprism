import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

export interface UseToContextPrismProps<T> {
  name: string;
  value: T;
  config?: { descriptions: string; path?: string };
}

/**
 *
 * @param props
 *
 * Хук выступает в роли прокси, обновляя зависимые значения - для контекста беседы с ai
 *
 * [] - обязательнро добавить debounce для всех изменений
 */
// export function useToContextPrism<T>(props: UseToContextPrismProps<T>): void {
export function useToContextPrism<T>(
  name: string,
  value: T,
  config?: { descriptions: string; path?: string }
): void {
  const [userContext, setUserContext] = useState<T | null>(null);

  const [, cancel] = useDebounce(
    () => {
      setUserContext({ name, value, config });
    },
    400,
    [value]
  );

  useEffect(() => {
    console.log('userContext', userContext);
  }, [userContext]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);
}
