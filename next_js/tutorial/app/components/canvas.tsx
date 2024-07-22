"use client"
import React, { useCallback, useRef, useState, useEffect } from "react";

const Canvas: React.FC<any> = React.memo(({ setLocation, canvasRef, setStrokes }: canvasProp) => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [currentStroke, setCurrentStroke] = useState<pointer[]>([])
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);


    const isDrawingRef = useRef(isDrawing)
    const currentStrokeRef = useRef(currentStroke)
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            setContext(ctx)
        }
    }, [canvasRef])
    useEffect(() => {
        isDrawingRef.current = isDrawing;
        currentStrokeRef.current = currentStroke;
    }, [currentStroke, isDrawing]);

    // handleMouseDown
    const startDrawing = useCallback((event: React.MouseEvent) => {
        console.log('startDrawing')
        const canvas = canvasRef.current
        const rect = canvas?.getBoundingClientRect() || { left: 0, top: 0 };
        const startingPoint = {
            x: Number((event.clientX - rect.left).toFixed(2)),
            y: Number((event.clientY - rect.top).toFixed(2)),
        };
        setIsDrawing(true)
        setCurrentStroke([startingPoint])
        context?.beginPath()
        context?.moveTo(startingPoint.x, startingPoint.y);
    }, [context,canvasRef])
    //function handleMouseEvent
    const draw = useCallback((event: React.MouseEvent) => {
        if (!context) return;
        const canvas = canvasRef.current
        const rect = canvas?.getBoundingClientRect() || { left: 0, top: 0 };
        const newPoint = {
            x: Number((event.clientX - rect.left).toFixed(2)),
            y: Number((event.clientY - rect.top).toFixed(2)),
        };
        setLocation(newPoint);
        if (isDrawingRef.current) {
            context.lineTo(newPoint.x, newPoint.y);
            context.stroke();
            setCurrentStroke((currentStroke) => [...currentStroke, newPoint])
        }
    }, [context, setLocation,canvasRef])

    // handleMouseUp
    const stopDrawing = useCallback((event: React.MouseEvent) => {
        console.log('stopDrawing')
        setIsDrawing(false)
        const canvas = canvasRef.current
        const rect = canvas?.getBoundingClientRect() || { left: 0, top: 0 };
        const stopingPoint = {
            x: Number((event.clientX - rect.left).toFixed(2)),
            y: Number((event.clientY - rect.top).toFixed(2)),
        };
        context?.moveTo(stopingPoint.x, stopingPoint.y)
        context?.stroke()
        context?.closePath();
        const newStroke = [...currentStrokeRef.current, stopingPoint]
        setStrokes(newStroke)
    }, [context, setStrokes,canvasRef])

    return (
        <NewCanvas
            startDrawing={startDrawing}
            draw={draw}
            stopDrawing={stopDrawing}
            canvasRef={canvasRef}
        />
    )
})
Canvas.displayName = 'memoised_canvas'

const NewCanvas = React.memo(({ startDrawing, draw, stopDrawing, canvasRef }: any) => {
    console.log('canvas recreated')
    return (
        <canvas className='bg-white rounded-sm border-2 border-red-300'
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            //TODO make it react to resizes
            width={800}
            height={550}
        />
    )
})
NewCanvas.displayName = 'new_canvas'

export default Canvas
