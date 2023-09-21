import React, { useState } from 'react';

function Counter() {
  // Define a state variable 'count' with an initial value of 0
  const [count, setCount] = useState(0);

  // When the button is clicked, update the 'count' state
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
