export default function Board({ strokes, undo, redo/* , del  */}: boardProp): JSX.Element {
    return (
        <div className='w-1/5 py-2 h-full flex flex-col bg-sky-50 rounded-sm'>
            <div className='text-center  h-10'>Dashboard</div>
            <div className='flex-1 max-h-96 overflow-y-auto px-5 border-2 border-gray-300'>
                {strokes} strokes
                <br />
                <button className='bg-blue-200 w-full my-1 py-1 rounded-md border-1'
                    onClick={undo}
                >
                    undo
                </button>
                <button className='bg-blue-200  w-full my-1 py-1 rounded-md border-1'
                    onClick={redo}
                >
                    redo
                </button>
            </div>
        </div>
    )
}
