"use client"
import '../globals.css';
import React, { useState, useRef, useEffect, useReducer, act } from 'react';
import HomeTemplate from '../components/HomeTemplate'
import Canvas from '../components/canvas'
import { stat } from 'fs';
export default function Home() {
    return (
        <HomeTemplate
            title="Mouse Locater"
            childComponent={<Playground />}
        />
    );
}

const ACTION: Action = {
    ADD: 'add',
    UNDO: 'undo',
    REDO: 'redo',
    DELETE: 'delete'
}

function redraw_canvas(canvas: HTMLCanvasElement, strokes: Strokes, drawUpto: number) {
    const context = canvas.getContext('2d')
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drawUpto; i++) {
        const stroke = strokes[i]
        context.beginPath();
        context.moveTo(stroke[0].x, stroke[0].y);
        stroke.forEach((point: pointer, index: number) => {
            if (index > 0) {
                context.lineTo(point.x, point.y);
            }
            context.stroke()
        });
    }
    context.closePath()

}

function Playground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lastAction, setLastAction] = useState<String | null>(null);
    const [drawUpto, setDrawUpto] = useState<number>(0)
    function strokesReducer(state: Strokes, action: StrokeActionProp): Strokes {
        switch (action.type) {
            case ACTION.ADD:
                setLastAction('add')
                return [...state.splice(0, drawUpto), action.payload]
            case ACTION.UNDO:
                setLastAction('undo')
                setDrawUpto(Math.max(drawUpto - 1, 0))
                return state
            case ACTION.REDO:
                setLastAction('redo')
                setDrawUpto(Math.min(drawUpto + 1, state.length))
                return state
            case ACTION.DELETE:
                setLastAction('delete')
                setDrawUpto(Math.max(drawUpto - 1, 0))
                const new_state = [...state]
                new_state.splice(action.payload-1, 1)
                return new_state
            default:
                return state
        }

    }
    const [strokes, dispatch_strokes] = useReducer(strokesReducer, [])
    useEffect(() => {
        // draw strokes
        if (lastAction && lastAction != "add" && canvasRef.current) {
            const canvas = canvasRef.current
            redraw_canvas(canvas, strokes, drawUpto)
        }
    }, [lastAction, strokes, drawUpto])
    useEffect(() => {
        setDrawUpto(strokes.length)
    }, [strokes])

    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Canvas
                canvasRef={canvasRef}
                addStrokes={(newStroke: Stroke) => {
                    dispatch_strokes({ type: 'add', payload: newStroke })
                }
                }
            />
            <Board
                strokes={strokes.length}
                drawUpto={drawUpto}
                undo={() => dispatch_strokes({ type: 'undo' })}
                redo={() => dispatch_strokes({ type: 'redo' })}
                del={(index: number) => dispatch_strokes({ type: 'delete', payload: index })}
            />
        </div>
    )
}

function Board({ strokes, drawUpto, undo, redo, del }: boardProp): JSX.Element {
    const active_strokes = Array.from({ length: drawUpto }, (_, index) => index + 1);
    const inactive_strokes = Array.from(
        { length: strokes-drawUpto},
        (_, index) => drawUpto+index + 1
    );
    return (
        <div className='w-1/3 py-2 h-full flex flex-col bg-sky-50 rounded-sm'>
            <div className='text-center  h-10'>Dashboard</div>
            <div className='flex-1 max-h-72 overflow-y-auto px-5 border-2 border-gray-300'>
                {strokes} strokes
                <br />
                <button className='bg-blue-200 w-full m-1 p-1 rounded-md border-1'
                    onClick={undo}
                >
                    undo
                </button>
                <button className='bg-blue-200  w-full m-1 p-1 rounded-md border-1'
                    onClick={redo}
                >
                    redo
                </button>
                <button className='bg-red-200  w-full m-1 p-1 rounded-md border-1'>
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
