import { MatcherFunction } from '@testing-library/react';

type Query = (f: MatcherFunction) => HTMLElement;

const withMarkup =
  (query: Query) =>
  (text: string): HTMLElement =>
    query((_: string, node: Element | null) => {
      const hasText = (node: HTMLElement) => node.textContent === text;
      if (!node) return false;
      const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child as HTMLElement));
      return hasText(node as HTMLElement) && childrenDontHaveText;
    });

export default withMarkup;
