import {useReducer} from 'react';

    //Reducer function accepts two parameter i.e current state and action that we pass into the dispatch function
    // const reducermethod = (currentState, action) =>{ }
const reducerFunction = (state, action) => {
  if(action.type == 'INCREMENT') {
    // console.log("State", state, )
    // console.log("Action",action)
    return {count : state.count + 1};
}
  if(action.type == 'DECREMENT') {
    return {count: state.count - 1 };
  }

  if(action.type == 'GREET'){
    return state.greet
  }
  
}


const Reducer = () => {
    //useReducer hook accepts two parameter i.e reducer function and initial state
    // const [state, dispatch] = useReducer(reducerMethod, initialValue);

    //Incase of single initial value
    // const [count, setCount ] = useReducer(reducerFunction,  0)

    //Incase of object state and dispatch
    const [state, dispatch ] = useReducer(reducerFunction, {count: 17, greet: 'Hey there !'})

    //Reducer function accepts two parameter i.e current state and action
    // const reducermethod = (currentValue, action) =>{ }

    //Passing type instead of passing type in jsx
    const greetings = () => {
      dispatch({type: 'GREET'})
    }

  return (
    <div>
      <h2>useReducer experiment</h2>
      <div>
        <button type='button' onClick={greetings()}>Say hi!</button>
        <span>{state.greet}</span>

      </div>

      <button type='button' onClick={() => dispatch({type:'INCREMENT'})}>+</button>
      <span>{state.count}</span>
      <button type='button' onClick={() => dispatch({type: 'DECREMENT'})}>-</button>
    </div>
  )
}

export default Reducer