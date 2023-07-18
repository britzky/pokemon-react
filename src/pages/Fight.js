import { useLocation } from "react-router-dom";

export const Fight = () => {
    const location = useLocation();
    const selectedTrainer = location.state.selectedTrainer;

  return (
    <main>
        <h1>{selectedTrainer.name}</h1>
    </main>
  )
}
