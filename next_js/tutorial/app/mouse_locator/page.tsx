"use client"
import '../globals.css';
import React, { useState, useRef, useEffect, useReducer, act } from 'react';
import HomeTemplate from '../components/HomeTemplate'
import Canvas from '../components/canvas'
export default function Home() {
    return (
        <HomeTemplate
            title="Mouse Locater"
            childComponent={<Playground />}
        />
    );
}

const THRESHOLD_VALUE = 200
const ACTION: Action = {
    ADD: 'add',
    UNDO: 'undo',
    REDO: 'redo',
    DELETE: 'delete'
}

function redraw_canvas(canvas: HTMLCanvasElement, strokes: Layer, drawUpto: number) {
    const context = canvas.getContext('2d')
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drawUpto; i++) {
        const stroke = strokes.strokes[i]
        const stroke_points = stroke.coordinates
        context.beginPath();
        context.moveTo(stroke_points[0].x, stroke_points[0].y);
        stroke_points.forEach((point: pointer, index: number) => {
            if (index > 0) {
                context.lineTo(point.x, point.y);
            }
            context.stroke()
        });
    }
    context.closePath()

}

const initialLayerState: Layer = {
    strokes: [],
    length: 0,
};

function Playground() {
    const canvasRef = useRef<HTMLCanvasElement[]>([]);
    const [lastAction, setLastAction] = useState<String | null>(null);
    const [drawUpto, setDrawUpto] = useState<number>(0)
    const [drawingStack, setDrawingStack] = useState<DrawingState>([])
    const [layer, dispatch] = useReducer(layerReducer, initialLayerState)
    function layerReducer(state: Layer, action: StrokeActionProp): Layer {
        switch (action.type) {
            case ACTION.ADD:
                setLastAction('add')
                //TODO: append layer to drawingStack when threshold reached
                if (state.length + action.payload.coordinates.length >= THRESHOLD_VALUE) {
                    setDrawingStack([...drawingStack, state])
                    //setDrawUpto(0)
                    return {
                        strokes: [action.payload],
                        length: action.payload.coordinates.length
                    }
                } else {
                    const new_length = (state.length +
                        action.payload.coordinates.length)
                    return {
                        length: new_length,
                        strokes: [...state.strokes.splice(0, drawUpto), action.payload]
                    }
                }
            case ACTION.UNDO:
                setLastAction('undo')
                if (drawUpto - 1 < 0) {
                    return drawingStack[drawingStack.length-1]

                } else {
                    setDrawUpto(drawUpto - 1)
                    return state
                }
            case ACTION.REDO:
                setLastAction('redo')
                setDrawUpto(Math.min(drawUpto + 1, state.strokes.length))
                return state
            case ACTION.DELETE:
                setLastAction('delete')
                setDrawUpto(Math.max(drawUpto - 1, 0))
                const new_state = { ...state }
                new_state.strokes.splice(action.payload - 1, 1)
                return new_state
            default:
                return state
        }

    }
    useEffect(() => {
        // draw strokes
        if (lastAction && lastAction != "add" && canvasRef.current) {
            const canvas = canvasRef.current[canvasRef.current.length - 1]
            redraw_canvas(canvas, layer, drawUpto)
        }
    }, [lastAction, layer, drawUpto])
    useEffect(() => {
        setDrawUpto(layer.strokes.length)
    }, [layer])

    console.log(layer.length)
    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Board
                strokes={layer.strokes.length}
                drawUpto={drawUpto}
                undo={() => dispatch({ type: 'undo' })}
                redo={() => dispatch({ type: 'redo' })}
                del={(index: number) => dispatch({ type: 'delete', payload: index })}
            />
            <Canvas
                layersCount={drawingStack.length}
                canvasRef={canvasRef}
                addStrokes={(newStroke: pointer[]) => {
                    dispatch({ type: 'add', payload: { coordinates: newStroke } })
                }
                }
            />
        </div>
    )
}

function Board({ strokes, drawUpto, undo, redo, del }: boardProp): JSX.Element {
    const active_strokes = Array.from({ length: drawUpto }, (_, index) => index + 1);
    const inactive_strokes = Array.from(
        { length: strokes - drawUpto },
        (_, index) => drawUpto + index + 1
    );
    return (
        <div className='w-1/5 py-2 h-full flex flex-col bg-sky-50 rounded-sm'>
            <div className='text-center  h-10'>Dashboard</div>
            <div className='flex-1 max-h-96 overflow-y-auto px-5 border-2 border-gray-300'>
                {strokes} strokes
                <br />
                <button className='bg-blue-200 w-full my-1 py-1 rounded-md border-1'
                    onClick={undo}
                >
                    undo
                </button>
                <button className='bg-blue-200  w-full my-1 py-1 rounded-md border-1'
                    onClick={redo}
                >
                    redo
                </button>
                <button className='bg-red-200  w-full my-1 py-1 rounded-md border-1'>
                    Delete
                </button>
                {active_strokes.map((number) => (
                    <button className='bg-red-300 m-1 p-1 rounded-md border-1'
                        key={number} onClick={() => del(number)}>
                        Button {number}
                    </button>
                ))}
                {inactive_strokes.map((number) => (
                    <button className='bg-red-200 m-1 p-1 rounded-md border-1'
                        key={number} onClick={() => del(number)}>
                        Button {number}
                    </button>
                ))}
            </div>
        </div>
    )
}
