import { Router } from "express";
import githubRouter from "./clone-repo.route";

const router = Router();

router.use('/github', githubRouter);

export default router;  