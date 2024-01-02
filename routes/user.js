import express  from "express";

import { getmyprofile ,login,logout,register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();



router.post("/login",login)

router.post("/register",register)

router.get("/my",isAuthenticated,getmyprofile)
router.get("/logout",logout)

// router.put("/userid/:id",updateuser)
// router.delete("/userid/:id",deleteuser)
//OR
// router.route("/userid/:id").get(getuserbyid).put(updateuser).delete(deleteuser);

export default router