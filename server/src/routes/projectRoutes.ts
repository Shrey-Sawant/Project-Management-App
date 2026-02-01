import { Router } from "express";
import { getProjects,createProject } from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/create", createProject);


export default router; 