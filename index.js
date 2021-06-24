// All DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const customBtn = document.getElementById('custom')
const ifOdd = document.getElementById('ifOdd')
const asyncBtn = document.getElementById('async')

// initial State
const initialState = {
    value: 0
}

// declaration of Reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/custom':
            return {value: state.value + action.payload}
        default:
        return state
    }
}

// instantiate store
let store = Redux.createStore(counterReducer)

// define render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// any actions can go here
const addOne = () => {
    store.dispatch({type: 'counter/incremented'})
}

const subOne = () => {
    store.dispatch({type: 'counter/decremented'})
}

const customAction = () => {
    let payload = Number(document.getElementById('userInput').value)
    store.dispatch({
        type: 'counter/custom',
        payload: payload
    })
}

const asyncAction = () => {
    setTimeout(() => {
        store.dispatch({type: 'counter/incremented'})
    }, 1000)
}

const ifOddAction = () => {
    if(store.getState().value % 2 !== 0) {
        store.dispatch({type: 'counter/incremented'})
    }
}

// adding event listeners to dispatch actions
minusBtn.addEventListener('click', addOne)
plusBtn.addEventListener('click', subOne)
customBtn.addEventListener('click', customAction)
asyncBtn.addEventListener('click', asyncAction)
ifOdd.addEventListener('click', ifOddAction)

// call initial render
render()

// re-render every time state is changed.
store.subscribe(render)