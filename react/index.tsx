const React = {
    createElement: (tag, props, ...children) => {
        if (typeof (tag) === 'function') {
            return tag(props);
        } else {
            const element = { tag, props: { ...props, children } };
            return element;
        }
    }
}

const states=[];

var stateCursor = 0;

const useState = (initialState) => {
    const PRIVATE_CURSOR = stateCursor;
    states[PRIVATE_CURSOR] = states[PRIVATE_CURSOR] || initialState;
    const setState = (newState) => {
        states[PRIVATE_CURSOR] = newState; //Changing the state by keeping the cursor private.
        rerender();        // This is known as Closure, just like private variable in modules.
    }
    stateCursor++;
    return [states[PRIVATE_CURSOR], setState];
}



const App = () => {
    const [name, setName] = useState('Mohit')
    return (
        <div className="my-react">
            <Heading name={name}/>
            <Input name={name} setName={setName} />
            <Para />
            <Count />
            <List />
        </div>
    );
}


const Count =() => {
    const [count, setCount] =useState(0)
    return(
        <div> 
            <h2>Counter: {count}</h2>
            <button onclick={_e=>
            {setCount(count+1);}
            }
            >+</button>
            <button onclick={_e=>
            {setCount(count-1);}
            }
            >-</button>
        </div>
    );
}

const Input = ({ name, setName }) => (
    <input
        value={name}
        type="text"
        placeholder="Enter Name"
        onchange={e => 
            {
                setName(e.target.value)
            }
        }
    >
    </input>
)
const Heading = ({name}) => (
    <h1>Hello {name}</h1>
)
const Para = () => (
    <p>This is a simple implementation of What React library does for us.</p>
)
const List = () => (
    <div>
        <ul>
            <li> 1 </li>
            <li> 2 </li>
            <li> 3 </li>
        </ul>
    </div>
)

const render = (reactElement, container) => {

    const actualDomElement = document.createElement(reactElement.tag);
    if (["string", "number"].includes(typeof (reactElement))) {
        container.appendChild(document.createTextNode(String(reactElement)));
        return;
    }
    if (reactElement.props) {
        Object.keys(reactElement.props)
            .filter(p => p !== 'children')
            .forEach(p => {
                actualDomElement[p] = reactElement.props[p];
            })
    }
    if (reactElement.props.children) {
        reactElement.props.children.forEach(child => {
            render(child, actualDomElement);
        })
    }
    container.appendChild(actualDomElement);
};

const rerender = () => {
    stateCursor=0;
    document.getElementById("myRoot").innerHTML="";
    render(<App />, document.getElementById('myRoot'));
}
render(<App />, document.getElementById('myRoot'));
