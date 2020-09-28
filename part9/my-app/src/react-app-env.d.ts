/// <reference types="react-scripts" />

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBaseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string
}

interface CoursePartMy extends CoursePartBaseDescription {
  name: "TiRa";
  dropoutsLastYear: number
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartMy;