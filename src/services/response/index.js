// Imports here.
exports.success = (res, status) => (entity) => {
  if (entity) { // TODO: Turn this into a switch statement
    return res.status(status || 200).json(entity)
  }
  return null
}

exports.notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

exports.errorHandler = (res, error) => (entity) => {

}

// NOTE: Could put error Handling in here too.
// Utilty library.
// NOTE: Could write tests aginst single unit functionality.
