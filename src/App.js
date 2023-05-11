import './components/FormInput/FormInput.css';
import './components/Clock/Clock.css';
import './App.css';
import FormInput from "./components/FormInput/FormInput";
import Clock from "./components/Clock/Clock";

function App() {
  return (
    <div className="App">
      <FormInput>
        <Clock></Clock>
      </FormInput>
    </div>
  );
}

export default App;
