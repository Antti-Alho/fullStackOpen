import React from "react";
import Part from "./Part"

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <div>
      {courseParts.map( part => <Part coursePart={part}/>)}
    </div>
  );
};

export default Content;