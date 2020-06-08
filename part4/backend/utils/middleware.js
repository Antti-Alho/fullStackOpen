
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else {
    return res.status(500).send({ error: 'Internal server error' })
  }
  // eslint-disable-next-line no-unreachable
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}