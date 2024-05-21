export const verifyAccessToken = async (req, res, next) => {
    try {
        const access_token = req.cookies.accessToken;
        if (!access_token) {
            return res.status(401).json({ status: false, message: "Access token not found" });
        }
        const decoded = await jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(403).json({ status: false, message: "Invalid or expired access token" });
    }
}