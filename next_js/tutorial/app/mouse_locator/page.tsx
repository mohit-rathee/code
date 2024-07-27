"use client"
import '../globals.css';
import React, { useState, useRef, useEffect, useReducer } from 'react';
import HomeTemplate from '../components/HomeTemplate'
import Canvas from '../components/canvas'
import Board from '../components/side_bar';
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
    // DELETE: 'delete'
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

const initialStrokePointer: stroke_pointer = {
    layer: 0,
    stroke: 0
}

function Playground() {
    const canvasRef = useRef<HTMLCanvasElement[]>([]);
    const [lastAction, setLastAction] = useState<String | null>(null);
    const [strokePointer, setStrokePointer] = useState<stroke_pointer>(initialStrokePointer)
    const [layersStack, setLayersStack] = useState<DrawingState>([])
    const [layer, dispatch] = useReducer(layerReducer, initialLayerState)
    function layerReducer(state: Layer, action: StrokeActionProp): Layer {
        switch (action.type) {
            case ACTION.ADD:
                setLastAction('add')
                if (state.length + action.payload.coordinates.length >= THRESHOLD_VALUE) {
                    setLayersStack([...layersStack.splice(0, strokePointer.layer), state])
                    return {
                        strokes: [action.payload],
                        length: action.payload.coordinates.length
                    }
                } else {
                    const new_length = (state.length +
                        action.payload.coordinates.length)
                    return {
                        length: new_length,
                        strokes: [...state.strokes.splice(0, strokePointer.stroke),
                        action.payload]
                    }
                }
            case ACTION.UNDO:
                setLastAction('undo')
                const prevStrokeIndex = strokePointer.stroke - 1;
                const prevLayerIndex = Math.max(strokePointer.layer - 1, 0)
                // Already at oldest change
                if (prevStrokeIndex < 0 && prevLayerIndex < 0) {
                    return state
                }
                // undo previous layer
                if (prevStrokeIndex < 0) {
                    // To save the current layer before loading prevLayer
                    // TODO: add current layer into layersStack
                    setLayersStack([...layersStack, state])
                    const prevLayer = layersStack[prevLayerIndex]
                    setStrokePointer({
                        layer: prevLayerIndex,
                        stroke: prevLayer.strokes.length
                    })
                    return prevLayer;

                } else { // undo current layer
                    setStrokePointer({
                        ...strokePointer,
                        stroke: prevStrokeIndex
                    })
                    return state
                }
            case ACTION.REDO:
                setLastAction('redo')
                const nextStrokeIndex = strokePointer.stroke + 1
                const nextLayerIndex = strokePointer.layer + 1
                const maxStroke = layersStack[strokePointer.layer].strokes.length
                const maxLayer = layersStack.length - 1
                // Already at newest change
                if (nextStrokeIndex > maxStroke && nextLayerIndex < maxLayer) {
                    return state
                }
                // redo next layer
                if (nextStrokeIndex > maxStroke) {
                    const nextLayer = layersStack[nextLayerIndex]
                    setStrokePointer({
                        layer: nextLayerIndex,
                        stroke: 0
                    })
                    return nextLayer
                } else{
                    // redo current layer
                    setStrokePointer({
                        ...strokePointer,
                        stroke: nextStrokeIndex
                    })
                    return state
                }
            default:
                return state
            // case ACTION.DELETE:
            //     setLastAction('delete')
            //     setStrokePointer(Math.max(strokePointer - 1, 0))
            //     const new_state = { ...state }
            //     new_state.strokes.splice(action.payload - 1, 1)
            //     return new_state
        }

    }
    useEffect(() => {
        // draw strokes
        if (lastAction && lastAction != "add" && canvasRef.current) {
            const canvas = canvasRef.current[canvasRef.current.length - 1]
            redraw_canvas(canvas, layer, strokePointer)
        }
    }, [lastAction, layer, strokePointer])
    useEffect(() => {
        setStrokePointer(layer.strokes.length)
    }, [layer])

    console.log(layer.length)
    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Board
                strokes={layer.strokes.length}
                undo={() => dispatch({ type: 'undo' })}
                redo={() => dispatch({ type: 'redo' })}
            // del={(index: number) => dispatch({ type: 'delete', payload: index })}
            />
            <Canvas
                layersCount={layersStack.length}
                canvasRef={canvasRef}
                addStrokes={(newStroke: pointer[]) => {
                    dispatch({ type: 'add', payload: { coordinates: newStroke } })
                }
                }
            />
        </div>
    )
}
