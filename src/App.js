import { nanoid } from "nanoid";
import { useState } from "react";
import './components/Clock/Clock.css'
import './components/FormInput/FormInput.css'

import Clock from "./components/Clock/Clock";
import FormInput from "./components/FormInput/FormInput";

function App() {
  const [clocks, setClocks] = useState([]);

  function handleFormSubmit(form) {
    setClocks((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        name: form.name,
        userTimezone: form.userTimezone,
      },
    ]);
  }

  function getClockIndex(id) {
    const index = clocks.findIndex((clock) => clock.id === id);

    return index;
  }

  function handleDeleteClick(id) {
    const index = getClockIndex(id);

    const updatedClocks = [
      ...clocks.slice(0, index),
      ...clocks.slice(index + 1),
    ];

    setClocks(updatedClocks);
  }

  return (
    <div className="App-container">
      <FormInput onFormSubmit={handleFormSubmit} />
      <div className="App-clocks-container">
        {clocks.map((clock) => {
          return (
            <Clock
              key={clock.id}
              id={clock.id}
              name={clock.name}
              userTimezone={clock.userTimezone}
              onDeleteClick={handleDeleteClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
