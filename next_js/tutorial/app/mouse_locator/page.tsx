"use client"
import '../globals.css';
import React, { useState, useRef, useEffect, useReducer } from 'react';
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

const ACTION: Action = {
    ADD: 'add',
    UNDO: 'undo',
    REDO: 'redo'
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
                context.stroke()
            }
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
            default:
                return state
        }

    }
    const [strokes, dispatch_strokes] = useReducer(strokesReducer, [])
    useEffect(() => {
        // draw strokes
        if ((lastAction == "undo" || lastAction == "redo") && canvasRef.current) {
            const canvas = canvasRef.current
            redraw_canvas(canvas, strokes, drawUpto)
        }
    }, [lastAction, strokes, drawUpto])
    useEffect(()=>{
        setDrawUpto(strokes.length)
    },[strokes])

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
                strokes={drawUpto}
                undo={() => dispatch_strokes({ type: 'undo' })}
                redo={() => dispatch_strokes({ type: 'redo' })}
            />
        </div>
    )
}

function Board({ strokes, undo, redo }: boardProp): JSX.Element {
    return (
        <div className='w-1/3 py-2 h-full flex flex-col bg-sky-50 rounded-sm'>
            <div className='text-center  h-10'>Dashboard</div>
            <div className='flex-1 max-h-72 overflow-y-auto px-5 border-2 border-gray-300'>
                {strokes} strokes
                <br />
                <button className='bg-blue-200 m-1 p-1 rounded-md border-1'
                    onClick={undo}
                >
                    undo
                </button>
                <button className='bg-blue-200 m-1 p-1 rounded-md border-1'
                    onClick={redo}
                >
                    redo
                </button>
            </div>
        </div>
    )
}
