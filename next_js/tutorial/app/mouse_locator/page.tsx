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

function redrawLayer(layerCanvas: any, strokeCount: number, layerData: Layer) {
    const context = layerCanvas.getContext('2d')
    if (!context) return;
    context.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
    for (let i = 0; i < strokeCount; i++) {
        const stroke = layerData.strokes[i]
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

function redraw(canvasRef: any, lastAction: any, layersStack: DrawingState, layer: Layer, strokePointer: stroke_pointer) {
    if (canvasRef.length == 0) return
    if (lastAction == "add" && strokePointer.stroke == 1 && strokePointer.layer != 0) {
        // redraw top and 2nd top layer if possible
        const topLayerIndex = strokePointer.layer
        const topLayerCanvas = canvasRef.current[topLayerIndex]
        redrawLayer(topLayerCanvas, strokePointer.stroke, layer)
        const secondTopLayerCanvas = canvasRef.current[topLayerIndex - 1]
        const secondTopLayerData = layersStack[topLayerIndex - 1]
        const strokeCount = secondTopLayerData.strokes.length
        redrawLayer(secondTopLayerCanvas, strokeCount, secondTopLayerData)

    }
}


const initialLayerState: Layer = {
    strokes: [],
    length: 0,
};

const initialStrokePointer: stroke_pointer = {
    layer: 0,
    stroke: -1
}

function Playground() {
    const canvasRef = useRef<HTMLCanvasElement[]>([]);
    const [lastAction, setLastAction] = useState<String | null>(null);
    const [strokePointer, setStrokePointer] = useState<stroke_pointer>(initialStrokePointer)
    const [layersStack, setLayersStack] = useState<DrawingState>([])
    const [layer, setLayer] = useState<Layer>(initialLayerState)
    function undo() {
        setLastAction('undo')
        console.log('undo')
        const prevStrokeIndex = strokePointer.stroke - 1;
        const prevLayerIndex = strokePointer.layer - 1
        // Already at oldest change
        if (prevStrokeIndex < -1 && prevLayerIndex < 0) {
            console.log('oldest change')
            return
        }
        // undo previous layer
        if (prevStrokeIndex < -1) {
            // To save the current layer before loading prevLayer
            // TODO: add current layer into layersStack
            if (layer.length != 0) {
                setLayersStack([...layersStack, layer])
            }
            const prevLayer = layersStack[prevLayerIndex]
            // Point to 2nd last el in prevlayer
            setStrokePointer({
                layer: prevLayerIndex,
                stroke: Math.max(prevLayer.strokes.length - 2, 0)
            })
            setLayer(prevLayer)
        } else { // undo current layer
            setStrokePointer({
                ...strokePointer,
                stroke: prevStrokeIndex
            })
            return
        }
    }
    function redo() {
        setLastAction('redo')
        console.log('redo')
        const nextStrokeIndex = strokePointer.stroke + 1
        const nextLayerIndex = strokePointer.layer + 1
        const maxStroke = layer.strokes.length
        const maxLayer = layersStack.length
        // Already at newest change
        if (nextStrokeIndex == maxStroke && nextLayerIndex == maxLayer) {
            console.log('newest change')
            return
        }
        // redo next layer
        if (nextStrokeIndex > maxStroke) {
            const nextLayer = layersStack[nextLayerIndex]
            setLayer(nextLayer)
            setStrokePointer({
                layer: nextLayerIndex,
                stroke: 0
            })
        } else {
            // redo current layer
            setStrokePointer({
                ...strokePointer,
                stroke: nextStrokeIndex
            })
            return
        }
    }
    function add(stroke: Stroke) {
        setLastAction('add')
        const new_length = (layer.length + stroke.coordinates.length)
        if (new_length >= THRESHOLD_VALUE) {
            // add new empty layer
            setLayersStack([...layersStack.splice(0, strokePointer.layer), layer])
            const nextLayer: Layer = {
                length: stroke.coordinates.length,
                strokes: [stroke]
            }
            setLayer(nextLayer)
            setStrokePointer({
                layer: strokePointer.layer + 1,
                stroke: 1
            })
        } else {
            const newLayerState: Layer = {
                length: new_length,
                strokes: [...layer.strokes.splice(0, strokePointer.stroke), stroke]
            }
            setLayer(newLayerState)
            setStrokePointer({
                layer: strokePointer.layer,
                stroke: strokePointer.stroke + 1
            })
        }
    }
    // TODO delete stroke by taking layer & stroke index
    //     setLastAction('delete')
    useEffect(() => {
        // draw strokes
        redraw(canvasRef, lastAction, layersStack, layer, strokePointer)
    }, [lastAction, layer, strokePointer])

    console.log('stacklayers')
    console.log(layersStack)
    console.log('strokes in current layer')
    console.log(layer)
    console.log('strokePointer')
    console.log(strokePointer)
    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Board
                undo={undo}
                redo={redo}
            // del={(index: number) => dispatch({ type: 'delete', payload: index })}
            />
            <Canvas
                lastLayerIndex={strokePointer.layer}
                canvasRef={canvasRef}
                addStroke={add}
            />
        </div>
    )
}
