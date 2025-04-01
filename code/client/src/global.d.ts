declare module '@splinetool/react-spline' {
    import type { FC } from 'react';

    type SplineEvent = {
        target: unknown;
        detail?: unknown;
    };

    interface SplineProps {
        scene: string;
        onLoad?: (spline: unknown) => void;
        onMouseDown?: (event: SplineEvent) => void;
        onMouseUp?: (event: SplineEvent) => void;
        onMouseHover?: (event: SplineEvent) => void;
    }

    const Spline: FC<SplineProps>;
    export default Spline;
}
