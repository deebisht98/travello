import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verify.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you're logged in and you can delete your account");
// });
// router.get("/checkuser/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you're logged in and you can delete all accounts");
// });
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);

export default router;
