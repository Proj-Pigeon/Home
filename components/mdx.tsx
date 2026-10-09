import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props: ComponentProps<'img'>) => {
      if (!props.width || !props.height) {
        return (
          <ImageZoom {...(props as any)}>
            <img
              {...props}
              className={`rounded-lg ${props.className ?? ''}`}
              loading={props.loading ?? 'lazy'}
            />
          </ImageZoom>
        );
      }

      return <ImageZoom {...(props as any)} />;
    },
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
