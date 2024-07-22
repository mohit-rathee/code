interface pointer {
    x: number;
    y: number;
}
interface boardProp {
    location: pointer;
    strokes: pointer[][];
}
interface canvasProp {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    setLocation: (Location: pointer) => void;
    setStrokes: (strokes:pointer[]) => void;

}
