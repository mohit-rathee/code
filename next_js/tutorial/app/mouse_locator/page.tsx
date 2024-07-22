"use client"
import '../globals.css';
import React, { useState, useCallback, useRef, useEffect} from 'react';
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

function Playground() {
    const [location, setLocationState] = useState<pointer>({ x: 0.0, y: 0.0 })
    const [strokes, setStrokesState] = useState<pointer[][]>([])
    const setLocation = useCallback((location: pointer) => {
        setLocationState(location);
    }, []);
    const setStrokes = useCallback((newStroke: pointer[]) => {
        setStrokesState((prevStrokes) => [...prevStrokes,newStroke]);
    }, []);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Canvas
                canvasRef={canvasRef}
                setLocation={setLocation}
                setStrokes={setStrokes}
            />
            <Board
                location={location}
                strokes={strokes}
            />
        </div>
    )
}

function Board({ location, strokes }: boardProp): JSX.Element {
    return (
        <div className='w-1/3 py-2 h-full flex flex-col bg-sky-50 rounded-sm'>
            <div className='text-center  h-10'>Dashboard</div>
            <h2 className='p-5 relative max-h-20 border-2 border-gray-300'>
                x : {location.x}
                <br />
                y : {location.y}
            </h2>
            <div className='flex-1 max-h-72 overflow-y-auto px-5 border-2 border-gray-300'>
                {strokes.length+1} strokes
            </div>

        </div>
    )
}
