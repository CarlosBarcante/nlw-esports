interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

function App() {
  return (<div>
    <Button title="enviar 1" />
    <Button title="enviar 2" />
    <Button title="enviar 3" />
  </div>)
}

export default App
