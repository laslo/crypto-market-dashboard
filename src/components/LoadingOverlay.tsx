import { PropsWithChildren } from "react";

type LoadingOverlayProps = PropsWithChildren & {
  loading: boolean;
};

const LoadingOverlay = ({ loading, children }: LoadingOverlayProps) => (
  <div className="relative">
    {children}
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
        <p>Loading...</p>
      </div>
    )}
  </div>
);

export default LoadingOverlay;
