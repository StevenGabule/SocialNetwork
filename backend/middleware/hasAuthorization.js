const hasAuthorization = (req, res, next) => {
  if (req.params.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not authorized to make changes!"
    })
  }
  next();
}

module.exports = {
  hasAuthorization
}
