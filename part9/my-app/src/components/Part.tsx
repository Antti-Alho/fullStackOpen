import React from "react";

const Part: React.FC<{ coursePart: CoursePart}> = ({coursePart}) => {
  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <p>{coursePart.description} {coursePart.exerciseCount} {coursePart.name}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>{coursePart.description} {coursePart.exerciseCount} {coursePart.exerciseSubmissionLink} {coursePart.name}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>{coursePart.exerciseCount} {coursePart.groupProjectCount} {coursePart.name}</p>
        </div>
      );
      case "TiRa":
        return (
          <div>
            <p>{coursePart.exerciseCount} {coursePart.dropoutsLastYear} {coursePart.name} {coursePart.description}</p>
          </div>
        );
    default:
      return (
        <div>
          <p> something wrong with this course info</p>
        </div>
      );
  }

};

export default Part;