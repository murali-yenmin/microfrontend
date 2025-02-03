import React from 'react'; 
import PrimaryButton from './components/primaryButton';

function App() {
  return (
    <div className="App">
         <PrimaryButton
        label="Primary button"
        onClick={() => console.log("Primary button clicked")}
      />
    </div>
  );
}

export default App;
