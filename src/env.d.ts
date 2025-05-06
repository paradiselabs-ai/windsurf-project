/// <reference types="astro/client" />

declare module '*.svg?component' {
  const component: typeof import('astro').AstroComponent;
  export default component;
}
