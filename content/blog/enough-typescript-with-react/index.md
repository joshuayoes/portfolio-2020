---
title: Enough Typescript With React To Get Started
date: "2020-11-30T04:37:00.000Z"
thumbnail: "./thumbnail.jpg"
# description: ""
---

According the [Stack Overflow 2020 Developer Survey](https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted), Typescript was rated the second most loved programming language by developers.

Typescript is becoming an essential part of the front-end development ecosystem, to the point where a [Typescript template is an official part of create-react-app](https://create-react-app.dev/docs/adding-typescript/) for starting new React projects.

Often with tutorials, I find that they have try to cover too many topics too early. I like having a few tools under my belt to get my feet wet and then build up more sophisticated knowledge as I brush up against more complex use cases. So today we are going attempt to cover the most common use cases for Typescript with React to have a foundation to build from.

## Props

In my experience, having statically typed props is easily the best part about using Typescript with React.

Often times, unless you are consuming a high quality library, you will not have much documentation when working in a production codebase. Typescript allows you to see at a glance what a React component is capable of by giving you a glossary of what props it accepts and what types they are.

Additionally, Typescript provides guard rails to prevent you from passing invalid or misspelled props into a React component by throwing an error. As a codebase scales and becomes maintained by multiple developers, not everyone will be familiar with every aspect of a codebase, so this helps keep developers productive by getting immediate feedback instead of chasing down runtime errors.

Let's review how you might add types to the props of a vanilla Javascript functional component.

```javascript
import React from 'react';

export const Counter = (props) => {
  const { label, count, onIncrement } = props;

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={() => onIncrement())}>
        Increment
      </button>
    </div>
  );
};
```

In order to type this component, we need to add an interface.

```typescript
import React from 'react';

// An interface is the most common type used for Props.
// You might think of it as an object that describes
// what type of value is accepted for each property.
interface Props {
  label: string;
  count: number;
  onIncrement: () => void;
};

// We can add types to function arguments such as Props like this
const Counter = (props: Props) => {
  const { label, count, onIncrement } = props;

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={() => onIncrement()}>
        Increment
      </button>
    </div>
  );
};
```

Hopefully those of you that are familiar with PropTypes should feel at home here.

## Common Types

For those unfamiliar with Typescript, we are going to do a review of the most common types we might come across in props.

### Primitive Types

Typescript has a set of base types to help build more complex types from.

If you are familiar with Javascript primitive types, the `string`, `number`, `boolean`, `null`, and `undefined` keywords should all feel familiar.

Arrays can be described by adding `[]` brackets to the end of a type such as `string[]`.

Objects can be used via the `object` keyword, but more frequently you will things such as interfaces to describe the shape of the object.

Another important type for us to know is `any`. Essentially, `any` is an escape hatch that tells Typescript "I don't care what this type is" and lets the type be used in any way. When you are first starting out, `any` can be useful as a placeholder if you cannot figure out a more complicated type. However, it should be used sparingly because you lose out on most of the benefits of using Typescript in a project.

### Optional Properties

Often times, we will have props that are not required in a component. For example: we might want to add a default label to our previous component example.

```typescript
[...]
export const Counter = (props: Props) => {
  const { label = "Count", count, onIncrement } = props;
[...]
```

However, if we do not update the Props interface, Typescript will throw an error if we do not pass in the label prop.

We can mark it as optional in the interface by adding a question mark to the `label` prop like so:

```typescript
interface Props {
  label?: string;
  count: number;
  onIncrement: () => void;
};
```

### Union Types

Another way we might have described an optional prop is like so:

```typescript
interface Props {
  label: string | undefined;
  count: number;
  onIncrement: () => void;
};
```

The `|` union operator is very similar to how the OR `||` operator works in Javascript, where you can describe that a prop is a `string` or `undefined`.

### Function types

If you are unfamiliar with Typescript, you may have been confused by the onIncrement type so far.

Let's break the type down bit-by-bit. The `() =>` describes that this prop is a function that accepts no arguments. The `void` keyword describes this prop's return type; in this case it should not return anything. In other words, `onIncrement` will accept a callback or lambda function.

Here is an example of the correct usage of this prop

```javascript
const [count, setCount] = useState(0);

[...]

<Counter
  onIncrement={() => setCount(count + 1)}
  count={count}
/>
```

## Typing Functional Components

Now that we have the basics of Typescript down, let's look at some of the common types we will work with from React.

For functional components, we will often use the `React.FC` type from the React namespace.

Let's look at a different example for a typical use case:

```typescript
import React from 'react';

interface Props {
  className?: string;
}

// Our React.FC type annotation goes here
const Layout: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={className}>
      <header>
        <img src="./logo.png" alt="Logo" />
      </header>
      <main>
        {children}
      </main>
      <footer>© 2020</footer>
    </div>
  )
};
```

We could also use the `React.FunctionalComponent` type as well but `React.FC` is more concise and common to see.

`React.FC` gives us some guarantees about how this function should be used, but it also notably adds the `children` prop by default to whatever component you are working with.

You likely have noticed that we've used functional components up to this point for our examples but haven't used the `React.FC` type, and that is because our counter component example did not use `children` as a prop. Some developers feel it is bad practice to use this type when your component does not accept `children` as a prop, but some prefer the readability this type provides. Ultimately this is up to your personal preference.

`React.FC` also introduces another Typescript concept, which is generics. In this case `Props` is passed into `React.FC` as a generic by calling `React.FC<Props>`. You can think of a generic as a function argument that types or interfaces can accept. In this case, our Layout component only expects `className` as an optional string prop and will throw an error if you pass in any other props.

## Typing Class Components

Up to this point, we have used functional component, but Typescript also works well with class components. Let's refactor our `Counter` example from earlier into a class component.

```typescript
import React from 'react';

interface Props {
  label: string;
}

interface State {
  counter: number;
}

class Counter extends React.Component<Props, State>{
  readonly state: State = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <span>
          {this.props.label}: {this.state.count}
        </span>
        <button type="button" onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    )
  }
}
```

As you can see, the `React.Component` type accepts two generics, `Props` and `State`. This allows us to statically type the state object as well as props.

## Learn More

As you begin learning Typescript with React, you will continue to brush up against new language features, but hopefully now you are equipped with enough tools to get up and running with your own projects!

The following resources were a excellent references for writing this article and I would recommend reading through them for a deeper understanding of Typescript and how to use React with it:

- [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [React & Redux in TypeScript - Complete Guide](https://github.com/piotrwitek/react-redux-typescript-guide)
