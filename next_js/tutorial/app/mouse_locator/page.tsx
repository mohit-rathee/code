"use client"
import '../globals.css';
import React, { useState, useCallback, useRef, useEffect, useReducer } from 'react';
import HomeTemplate from '../components/HomeTemplate'
import Canvas from '../components/canvas'
import { stat } from 'fs';
import { deflate } from 'zlib';
export default function Home() {
    return (
        <HomeTemplate
            title="Mouse Locater"
            childComponent={<Playground />}
        />
    );
}

function Playground() {
    const [lastAction, setLastAction] = useState<String|null>(null);
    function strokesReducer(state: pointer[][], action: StrokeActionProp) {
        switch (action.type) {
            case "add":
                setLastAction('add')
                return [...state, action.payload]
            case "undo":
                setLastAction('undo')
                if (state.length > 1) {
                    return state.slice(0, -1)
                } else {
                    return []
                }
            default:
                return state
        }

    }
    const [strokes, dispatch_strokes] = useReducer(strokesReducer, [])
    const addStroke = (newStroke: pointer[][]) => {
        dispatch_strokes({ type: 'add', payload: newStroke })
    }
    function undo() {
        dispatch_strokes({ type: 'undo' })
    }
    useEffect(() => {
        // draw strokes
        if (lastAction =="undo" && canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            if (!context) return;
            context.clearRect(0, 0, canvas.width, canvas.height);
            strokes.forEach((stroke: pointer[]) => {
                context.beginPath();
                context.moveTo(stroke[0].x, stroke[0].y);
                stroke.forEach((point: pointer, index: number) => {
                    if (index > 0) {
                        context.lineTo(point.x, point.y);
                        context.stroke()
                    }
                });
            })
            context.closePath()
        }
    }, [lastAction,strokes])

    const canvasRef = useRef<HTMLCanvasElement>(null);
    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Canvas
                canvasRef={canvasRef}
                addStrokes={addStroke}
            />
            <Board
                strokes={strokes}
                undo={undo}
            />
        </div>
    )
}

function Board({ strokes, undo }: boardProp): JSX.Element {
    return (
        <div className='w-1/3 py-2 h-full flex flex-col bg-sky-50 rounded-sm'>
            <div className='text-center  h-10'>Dashboard</div>
            <div className='flex-1 max-h-72 overflow-y-auto px-5 border-2 border-gray-300'>
                {strokes.length} strokes
                <br />
                <button className='bg-blue-200 m-1 p-1 rounded-md border-1'
                    onClick={undo}
                >
                    undo
                </button>
                <button className='bg-blue-200 m-1 p-1 rounded-md border-1'
                >
                    redo
                </button>
            </div>
        </div>
    )
}
