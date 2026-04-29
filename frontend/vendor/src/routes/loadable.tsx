import { Suspense, type ComponentType, type JSX } from "react";

const fallback = <div></div>;

export default function Loadable<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) {
  return (props: T) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
}