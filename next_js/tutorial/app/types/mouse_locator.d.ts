interface pointer {
    x: number;
    y: number;
}
interface boardProp {
    strokes: pointer[][];
    undo: () => void;
}
interface strokeState {
    []
}
type StrokeAction =
    | { type: 'add'; payload: Stroke }
    | { type: 'undo'};

interface canvasProp {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    setLocation: (Location: pointer) => void;
    addStrokes: (strokes: pointer[]) => void;
}
