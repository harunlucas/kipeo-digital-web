import { createElement, type ElementType, type ComponentPropsWithoutRef, type ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...rest
}: ContainerProps<T>) {
  const Tag = as ?? "div";

  return createElement(
    Tag,
    { className: `mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12 ${className}`, ...rest },
    children,
  );
}
