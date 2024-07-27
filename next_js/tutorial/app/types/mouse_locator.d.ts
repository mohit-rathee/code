interface pointer {
    x: number;
    y: number;
}
interface Stroke {
    coordinates: pointer[];
    // style
    // color
    // width ...etc
};
interface Layer {
    strokes: Stroke[];
    length: number;
}
type DrawingState = Layer[];

interface boardProp {
    strokes: number;
    drawUpto: number;
    undo: () => void;
    redo: () => void;
    del: (index: number) => void;
}
type StrokeActionProp =
    | { type: 'add'; payload: Stroke }
    | { type: 'undo' }
    | { type: 'redo' }
    | { type: 'delete'; payload: number };

type Action = {
    ADD: 'add',
    UNDO: 'undo',
    REDO: 'redo',
    DELETE: 'delete'
}
interface canvasProp {
    layerStackRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement[]>;
    addStrokes: (strokes: pointer[]) => void;
    layersCount: number;
}
