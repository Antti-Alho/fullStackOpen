import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({setgood, setbad, setneutral, good, neutral, bad}) => {
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setgood(good + 1)} text={"good"}/>
      <Button handleClick={() => setneutral(neutral + 1)} text={"neutral"}/>
      <Button handleClick={() => setbad(bad + 1)} text={"bad"}/>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const StatisticsLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if (good || neutral || bad) {

    const all = good+bad+neutral;
    const average = ((good-bad) / all)
    const positive = ((good) / all * 100 ).toString() + " %"
    
    return(
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text={"good"} value={good}/>
            <StatisticsLine text={"neutral"} value={neutral}/>
            <StatisticsLine text={"bad"} value={bad}/>
            <StatisticsLine text={"all"} value={all}/>
            <StatisticsLine text={"average"} value={average}/>
            <StatisticsLine text={"positive"} value={positive}/>
          </tbody>
        </table>
      </div>
    )
  }

  return(
    <div>
      <h2>statistics</h2>
      <p> No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback 
        setgood={setGood} 
        setbad={setBad} 
        setneutral={setNeutral}
        good={good}
        neutral={neutral}
        bad={bad}
      />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
