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

interface stroke_pointer {
    layer: number;
    stroke: number;
}
type DrawingState = Layer[];

interface boardProp {
    strokes: number;
    undo: () => void;
    redo: () => void;
    // del: (index: number) => void;
}
interface canvasProp {
    canvasRef: React.RefObject<HTMLCanvasElement[]>;
    addStroke: (stroke: Stroke) => void;
    layersCount: number;
}
