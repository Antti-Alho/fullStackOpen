import React from "react";

const App: React.FC<{ courseName: string}> = ({courseName}) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default App;