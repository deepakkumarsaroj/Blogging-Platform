import jwt from "jsonwebtoken";

// Middleware to verify JWT token and attach user info to `req.user`
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expecting token as: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info (e.g., id, isAdmin)
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
