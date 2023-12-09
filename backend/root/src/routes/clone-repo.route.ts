import { Router } from "express";
import { repoCloneHandler } from "../controllers/github/repo-clone.controller";

const router = Router();

router.post('/clone-repo', repoCloneHandler);

export default router;