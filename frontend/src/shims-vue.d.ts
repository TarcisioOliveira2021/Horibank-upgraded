declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'canvas-confetti' {
  const confetti: any;
  export default confetti;
}