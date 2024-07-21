import '../globals.css';
import HomeTemplate from '../components/HomeTemplate'
export default function Home() {
    return (
        <HomeTemplate
            title="Mouse Locater"
            childComponent={<Playground />}
        />
    );
}

function Playground() {
    return (
        <div className='w-full h-full flex-grow bg-gray-200 gap-5 p-5 flex items-center justify-center'>
            <Sensor />
            <Board />
        </div>
    )
}

function Sensor() {
    return (
        <div className='w-2/3 h-full bg-white rounded-sm border-2 border-red-300'>
        </div>
    )
}
function Board() {
    return (
        <div className='w-1/3 h-full bg-sky-50 rounded-sm'>
            <div className='text-center'>Dashboard</div>
            <Location_board />
        </div>
    )
}
function Location_board() {
    return (
        <h2 className='py-10 px-5 border-2 border-gray-300'>
            x : 49
            <br />
            y : 50
        </h2>
    )
}
