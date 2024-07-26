interface pointer {
    x: number;
    y: number;
}
type Stroke = pointer[];
type Strokes = pointer[][];
interface boardProp {
    strokes: number;
    drawUpto: number;
    undo: () => void;
    redo: () => void;
    del: (index:number) => void;
}
type StrokeActionProp =
    | { type: 'add'; payload: Stroke }
    | { type: 'undo'}
    | { type: 'redo'}
    | { type: 'delete'; payload: number };

type Action = {
      ADD: 'add',
      UNDO: 'undo',
      REDO: 'redo',
      DELETE: 'delete'
}
interface canvasProp {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    addStrokes: (strokes: pointer[]) => void;
}
