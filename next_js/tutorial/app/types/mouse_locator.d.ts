interface pointer {
    x: number;
    y: number;
}
type Stroke = pointer[];
type Strokes = pointer[][];
interface boardProp {
    strokes: stroke;
    undo: () => void;
    redo: () => void;
}
type StrokeActionProp =
    | { type: 'add'; payload: Stroke }
    | { type: 'undo'}
    | { type: 'redo'};

type Action = {
      ADD: 'add',
      UNDO: 'undo',
      REDO: 'redo'
}
interface canvasProp {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    addStrokes: (strokes: pointer[]) => void;
}
