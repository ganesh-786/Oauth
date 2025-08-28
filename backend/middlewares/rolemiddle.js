export const roleAuth = (...allowusers) => {
  return (req, res, next) => {
    if (!allowusers.includes(req.user.role)) {
      res.status(400).json({ message: "Access Denied" });
    }
    next();
  };
};
