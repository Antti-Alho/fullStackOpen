import { sum } from 'lodash'

interface ExerciseCalculation {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  rating: 1 | 2 | 3
  disc: string
}

const getRating = (average: number, target: number): Rating => {
  if (average < target) {
    return {  
      rating: 1,
      disc:'Not good enough!'
    }
  } else if ( average > target && average < 5) {
    return {  
      rating: 2,
      disc: 'Try harder'
    }
  } else {
    return {  
      rating: 3,
      disc: 'close enough'
    }
  }
}

const calculateExercises = (dailyHours: Array<number>, target: number): ExerciseCalculation => {
  const average = sum(dailyHours)/dailyHours.length
  const rating = getRating(average, target)
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h > 0).length,
    success: dailyHours.find(hour => hour < target) === undefined,
    rating: rating.rating,
    ratingDescription: rating.disc,
    target: target,
    average: average
  }
}

try {
  let list: number[] = process.argv.slice(2).map(n => Number(n))
  if (list.some((n) => !isNaN(n))) {
    let target = list.reverse().pop()
    if (target) {
      console.log(calculateExercises(list, target))
    } else {
      throw new Error('I need some params to work with!')
    }
  } else {
    throw new Error('Not a number >:(')
  }
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}