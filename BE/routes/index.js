import authRoute from './authRoute';

const initRoutes = (app) => {
    app.use("/api/auth", authRoute);

    return app.use('/', (req, res) => {
        res.status(200).json({ message: "Hello" });
    })
}

export default initRoutes;