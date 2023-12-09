import { Router } from "express";
import { repoCloneHandler } from "../controllers/clone-repo.controller";

const router = Router();

router.post('/clone-repo', repoCloneHandler);

export default router;