"use client"
import '../globals.css';
import React, { useState, useCallback } from 'react';
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

    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Canvas
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

// Only be rendered once.

//function Dot({ location, handleMouseDown }: any) {
//    return (<div className={'absolute w-1 h-1 bg-black rounded-full'}
//        style={{
//            top: `${location.y}px`,
//            left: `${location.x}px`,
//        }}
//        onMouseDown={handleMouseDown}
//    />)
//
//}
function Board({ location, strokes }: boardProp): JSX.Element {
    return (
        <div className='w-1/3 h-full bg-sky-50 rounded-sm'>
            <div className='text-center'>Dashboard</div>
            <h2 className='py-10 px-5 border-2 border-gray-300'>
                x : {location.x}
                <br />
                y : {location.y}
            </h2>
            <h2 className='py-10 px-5 border-2 border-gray-300'>
                <ul>
                    {strokes.map((_stroke, index) => (
                        <li key={index}>{index+1} Stroke</li>
                    ))}
                </ul>
            </h2>

        </div>
    )
}
