module.exports = function(app) {
    app.post("/beacon/create", (req, res) => {
        console.log("Creating Beacon");
    });
}