const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log(error.errors.map((err) => err.message));
        res.status(400).json(error.errors.map((err) => err.message));
    }
}

module.exports = {validateSchema}