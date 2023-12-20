import express from 'express'
import { signin,deleteUser,getUsersData, updateUser,signout,addUser} from '../controllers/adminController.js';
const router = express.Router()

router.post("/signin",signin)
router.post("/admin-home",getUsersData )
router.patch("/admin-updateUser",updateUser )
router.post("/admin-addUser",addUser )
router.delete("/deleteUser/:email",deleteUser )
router.get("/admin-signout", signout)

export default router;