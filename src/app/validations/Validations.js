class Validations {
    error = null;

    async isValid(schema, params) {
        var me = this;

        await schema.validate(params).catch(function(err) {
            me.setError(err);
        });
    }

    sendError(res) {
        return res
            .status(401)
            .json({
                error: 'Validation failed',
                message: this.getError().message
            })
            .then(this.setError(null));
    }

    setError(msg) {
        this.error = msg;
    }

    getError() {
        return this.error;
    }
}

export default Validations;
