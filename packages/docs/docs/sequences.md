---
image: /generated/articles-docs-sequences.png
id: reusability
title: Reuse components using Sequences
sidebar_label: Reuse components
crumb: "The power of React"
---

```twoslash include example
import {interpolate, useCurrentFrame} from 'remotion'

const Title: React.FC<{title: string}> = ({title}) => {
    const frame = useCurrentFrame()
    const opacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'})

    return (
      <div style={{opacity}}>{title}</div>
    )
}
// - Title
```

Let's say we want to show two titles that both fade in after each other.

In order to make a title reusable, we first factor it out into it's own component.

```tsx twoslash
// @include: example-Title

export const MyVideo = () => {
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "7em",
      }}
    >
      <Title title="Hello World" />
    </div>
  );
};
```

Now we can use the `<Sequence>` component to limit the duration of the first title and time-shift the appearance of the second title.

```tsx twoslash
// @include: example-Title
// ---cut---
import { Sequence } from "remotion";

export const MyVideo = () => {
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "7em",
        backgroundColor: "white",
      }}
    >
      <Sequence durationInFrames={40}>
        <Title title="Hello" />
      </Sequence>
      <Sequence from={40}>
        <Title title="World" />
      </Sequence>
    </div>
  );
};
```

You should see two titles appearing after each other. Sequences which are not shown during a frame are unmounted.  
Sequences by default are absolutely positioned - you can use [`layout="none"`](/docs/sequence#layout) to disable that.

## See also

- [`<Sequence>` component](/docs/sequence)
