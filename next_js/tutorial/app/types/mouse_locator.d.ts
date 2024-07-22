interface pointer {
    x: number;
    y: number;
}
interface boardProp {
    location: pointer;
    strokes: pointer[][];
}
interface canvasProp {
    setLocation: (Location: pointer) => void;
    setStrokes: (strokes:pointer[]) => void;

}
