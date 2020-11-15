---
title: Redux Toolkit - The best state management library you already know
date: "2020-11-12T04:37:00.000Z"
thumbnail: "./thumbnail.jpg"
description: "React famously has a plethora of state management solutions, including but not limited to: Reudx, React Context, MobX, react-query, SWR, Zustard, and many many more."
---

React famously has a plethora of state management solutions, including but not limited to:

- Redux
- React Context
- MobX
- react-query
- SWR
- Zustard
- and many, many more...

However, most React developers have likely run across a component like this:

```javascript
import React from "react";
import { connect } from "react-redux";
import { increment, decrement } from '../redux.js'

const Counter => ({ count, increment, decrement }) => (
  <>
    <div>{count}</div>
    <div>
      <button onClick={this.props.increment}>Increment</button>
      <button onClick={this.props.decrement}>Decrement</button>
    </div>
  </>
);

const mapStateToProps = (state) => ({ count: state });
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(increment())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

Or Redux logic like this

```javascript
import { createStore, combineReducers } from "@reduxjs/toolkit"

const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"

export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({ counter })
const store = createStore(rootReducer)
```

When I was first learning Redux, this code was hard for me to reason about. It was challenging because the logic is a bit verbose and spread out.

The purpose of the Flux design pattern is to centralize logic for updating state so it is easy to understand where state updates are coming from.

However, even the most well-intentioned solutions can introduce new problems. In this case, we have solved the issue of centralizing our state logic in one place, but we have introduced a new problem: updating state here means updating 4 pieces of logic to get our state to update: the constant, the reducer, the action creator and the dispatcher. And given that the React website itself says that it is built to design simple views for each state in your application, that is a lot of work to do a core purpose of the library.

# Enter Redux Toolkit

Redux Toolkit solves this issue with a new abstraction: createSlice. createSlice wraps constants, action creators, and reducers into one place. Instead of updating your logic in four places, you can do it in two: the slice and the dispatcher.

```javascript
import { createSlice, configureStore } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
})

export const { increment, decrement } = counterSlice.actions

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})
```

Notice how much shorter this is?

There are a few things that are new here that we should break down about slices.

## Auto Reducer Actions

The increment and decrement actions are what you would expect, they look like this when you unfurl them:

```javascript
const increment = () => {
  type: "counter/increment"
}
```

For every function you add the reducers object in the slice, it will create an action with a generated constant.

The constant displayed here is a departure from traditional constants which usually come in SCREAMING_SNAKECASE. In Redux Toolkit, each slice takes a "name" property for the slice and concatenates it with the name of each action defined in the reducer. The main advantage of this is that you don't need to enforce your own naming convention, and it allows developers to clearly see which slice every dispatched action is coming from.

## Immer

Another benefit of Redux Toolkit is that Immer is added to the Redux store out of the box. For those unfamiliar, Immer is a library that allows you to directly mutate state object properties within a slice without any of the risks that normally come with it. Immer makes sure that any mutations are actually returned as new immutable copies to prevent side effects. This allows for much more readable logic in our slices.

Here is an slightly less contrived example of a traditional Redux reducer.

```javascript
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'UPDATE_TODO'

export const addTodo = ({ id, text }) => { type: ADD_TODO, payload: { id, text } }
export const toggleTodo = (id) => { type: ADD_TODO, payload: id }

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

export default todos
```

The ES6 spread operator is useful here for copying the existing state without mutating it, but it can be verbose and pollute the purpose of a state change for those unfamiliar with the convention. With Immer, we can directly change what we want without boilerplate.

```javascript
import { createSlice } from "@reduxjs/toolkit"

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo(state, action) {
      const { id, text } = action.payload
      // because of immer, we can directly mutate this array
      state.push({ id, text, completed: false })
    },
    toggleTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        // Immer makes this is a safe operation
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, toggleTodo } = todosSlice.actions

export default todosSlice.reducer
```

## Simplified Store Setup

In addition to Immer, Redux Toolkit includes other useful middleware out of the box such as redux-thunk, for performing async operations, and serializable-state-invariant-middleware, for ensuring that non-serializable data types aren't dispatched to the store (such as non primitive types like Maps or Sets). Additionally, it also includes configuration for Redux DevTools by default.

So store setup goes from this:

```javascript
import { applyMiddleware, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers"

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
```

And is simplfied to this:

```javascript
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';

export store = configureStore({
    reducers: rootReducer
})
```

## Easy Typescript Types

One of my favorite parts of Redux Toolkit is how easy it is to use with Typescript as well. Let's go back to our todo example:

```javascript
import { createSlice, configureStore } from "@reduxjs/toolkit"

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo(state, action) {
      const { id, text } = action.payload
      state.push({ id, text, completed: false })
    },
    toggleTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, toggleTodo } = todosSlice.actions

const store = configureStore({
  reducer: {
    counter: todosSlice.reducer,
  },
})
```

In order to get end-to-end type safety, we only need to add a few type annotations:

```javascript
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit"

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// It is easiest to type initialState by extracting it into a variable so we can add a type annotation,
// but you could also cast it in the createSlice initialState property as well
const initialState: Todo[] = []

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // add the PayloadAction type to the action argument, which accepts the payload type as a generic
    addTodo(state, action: PayloadAction<Todo>) {
      const { id, text } = action.payload
      state.push({ id, text, completed: false })
    },
    toggleTodo(state, action: PayloadAction<Todo>) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, toggleTodo } = todosSlice.actions

const store = configureStore({
  reducer: {
    counter: todosSlice.reducer,
  },
})

// We can use this in our useSelector hook or mapStateToProps connect function for full type safety
export type RootState = ReturnType<typeof store.getState>

// example usage
// const mapStateToProps = (state: RootState) => { todos: state.todos };
// const todos = useSelector((state: RootState) => state.todos);
```

# Conclusion

Aside from it's improved developer experience, the best part of Redux Toolkit is that most React developers are familiar with Redux, so adopting this library has a very low opportunity cost.

There is more to cover that Redux Toolkit has to offer such as [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) and [createEntityManager](https://redux-toolkit.js.org/api/createEntityAdapter), but I believe this is enough to illustrate how Redux Toolkit addresses some of Redux's weaknesses as a state management solution. You can dive deeper into any of the concepts in [Redux Toolkit documentation](https://redux-toolkit.js.org/).

Shout outs to [Mark Erikson](https://twitter.com/acemarke) doing a lot of great work with Redux Toolkit and updating Redux's documentation!
