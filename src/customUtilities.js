
module.exports = {
    toNumber: str => {
        return str ? parseInt(str) : null;
    },

    getCurrentYear: () => {
        const date = new Date();
        return date.getFullYear();
    }
};