/// <reference types="vite/client" />

declare module "*.svg?react" {
  import { FunctionComponent } from "preact";
  import { JSX } from "preact/jsx-runtime";

  const content: FunctionComponent<JSX.SVGAttributes<SVGSVGElement>>;
  export default content;
}
