"use client"
import '../globals.css';
import React, { useState, useCallback } from 'react';
import HomeTemplate from '../components/HomeTemplate'
export default function Home() {
    return (
        <HomeTemplate
            title="Mouse Locater"
            childComponent={<Playground />}
        />
    );
}

interface pointer_type {
    x: number;
    y: number;
}
interface boardProp {
    location: pointer_type;
}

function Playground() {
    const [location, setLocation] = useState<pointer_type>({ x: 0.0, y: 0.0 })
    const handleMouseEvent = useCallback((event: React.MouseEvent) => {
        const newLocation = {
            x: event.clientX,
            y: event.clientY,
        };
        setLocation(newLocation);
    }, []); // Dependencies array is empty, so this callback will not change

    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Sensor handleMouseMove={handleMouseEvent} />
            <Board location={location} />
            <Dot location={location} />
        </div>
    )
}

// Only be rendered once.
const Sensor: React.FC<any> = React.memo(({ handleMouseMove }: any) => {
    return (
        <div className='w-2/3 h-full bg-white rounded-sm border-2 border-red-300'
            onMouseMove={handleMouseMove}>
        </div>
    )
})
Sensor.displayName = 'memoised sensor'

function Dot({ location }: any) {
    return (<div className={'absolute w-1 h-1 bg-black rounded-full'}
        style={{
            top: `${location.y}px`,
            left: `${location.x}px`,
        }} />)

}
function Board({ location }: boardProp): JSX.Element {
    return (
        <div className='w-1/3 h-full bg-sky-50 rounded-sm'>
            <div className='text-center'>Dashboard</div>
            <h2 className='py-10 px-5 border-2 border-gray-300'>
                x : {location.x}
                <br />
                y : {location.y}
            </h2>
        </div>
    )
}
