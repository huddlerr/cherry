import { db, auth } from "./firebase";

console.log("Firebase connected:", { db, auth });

function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Cherry is running 🍒</h1>
      <p>Local dev server on port 3001.</p>
      <p>Updated at {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default App;

