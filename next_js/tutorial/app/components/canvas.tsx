"use client";
import React, { useRef, useState, useEffect } from "react";

function Canvas({ canvasRef, addStroke, layersCount }: canvasProp) {
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [currentStroke, setCurrentStroke] = useState<pointer[]>([])
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);


    const isDrawingRef = useRef(isDrawing)
    const currentStrokeRef = useRef(currentStroke)
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvasArr = canvasRef.current
        const topmostCanvas = canvasArr[canvasArr.length - 1]
        if (topmostCanvas) {
            const ctx = topmostCanvas.getContext('2d')
            if (ctx) ctx.globalAlpha = 1;
            setContext(ctx)
        }
    }, [canvasRef, canvasRef.current?.length])
    useEffect(() => {
        isDrawingRef.current = isDrawing;
        currentStrokeRef.current = currentStroke;
    }, [currentStroke, isDrawing]);

    // handleMouseDown
    const startDrawing = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current[canvasRef.current.length - 1]
        const context = canvas.getContext('2d')
        setContext(context)
        const rect = canvas?.getBoundingClientRect() || { left: 0, top: 0 };
        const startingPoint = {
            x: Number((event.clientX - rect.left).toFixed(2)),
            y: Number((event.clientY - rect.top).toFixed(2)),
        };
        setIsDrawing(true)
        setCurrentStroke([startingPoint])
        context?.beginPath()
        context?.moveTo(startingPoint.x, startingPoint.y);
    }

    //function handleMouseMove
    const draw = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;
        if (!context) return;
        const canvas = canvasRef.current[canvasRef.current.length - 1]
        const rect = canvas.getBoundingClientRect() || { left: 0, top: 0 };
        const newPoint = {
            x: Number((event.clientX - rect.left).toFixed(2)),
            y: Number((event.clientY - rect.top).toFixed(2)),
        };
        if (isDrawingRef.current) {
            context.lineTo(newPoint.x, newPoint.y);
            context.stroke();
            setCurrentStroke((currentStroke) => [...currentStroke, newPoint])
        }
    }

    // handleMouseUp
    const stopDrawing = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;
        setIsDrawing(false)
        const canvas = canvasRef.current[canvasRef.current.length - 1]
        const rect = canvas.getBoundingClientRect() || { left: 0, top: 0 };
        const stopingPoint = {
            x: Number((event.clientX - rect.left).toFixed(2)),
            y: Number((event.clientY - rect.top).toFixed(2)),
        };
        context?.moveTo(stopingPoint.x, stopingPoint.y)
        context?.stroke()
        context?.closePath();
        const newStroke: Stroke = {
            coordinates:[...currentStrokeRef.current, stopingPoint],
        }
        addStroke(newStroke);
    }
    return (
        <LayerStack
            startDrawing={startDrawing}
            draw={draw}
            stopDrawing={stopDrawing}
            canvasRef={canvasRef}
            layersCount={layersCount}
        />
    )
}

const LayerStack = ({ startDrawing, draw, stopDrawing, canvasRef, layersCount }: any) => {
    const layers_canvas = Array.from(
        { length: layersCount+1 },
        (_, index) => index
    );
    return (
        <div className="relative w-4/5 bg-white rounded-sm border-2 border-red-300" >
            {layers_canvas.map((index: number) => {
                if (index != layersCount) {
                    return (
                        <canvas className='absolute rounded-sm border-2 border-red-300'
                            ref={(el) => { canvasRef.current[index] = el }}
                            key={index}
                            width={947}
                            height={550}
                            style={{
                                background: 'transparent',
                            }}
                        />)
                } else {
                    return (
                        <canvas className='relative rounded-sm border-2 border-red-300'
                            ref={(el) => { canvasRef.current[layersCount] = el }}
                            key={layersCount}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            //TODO make it react to resizes
                            width={947}
                            height={550}
                            style={{
                                background: 'transparent',
                            }}
                        />)
                }
            })}
        </div>
    )
}

export default Canvas
