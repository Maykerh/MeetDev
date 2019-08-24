class Validations {
    async isValid(schema, params, res) {
        const isValid = await schema.isValid(params);

        if (!isValid) {
            return res.status(400).json({ error: "Store validation failed" });
        }

        return true;
    }
}

export default Validations;
