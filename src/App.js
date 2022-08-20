import { TodoApp } from "./components";

//меня учили, что в App.js лучше не писать логику, поэтому здесь только один главный компонент
function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
