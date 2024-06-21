import { Router } from "express";
import controller from "../Controllers/controller";
const router = Router();

router.get("/videos/:user_id", controller.getVideos, (req, res) => {
    console.log('------IN get VIDEO ROUTER')
  res.status(200).send(res.locals.videos);
});
router.post("/videos", controller.postVideo, (req, res) => {
    console.log('------IN POST VIDEO ROUTER')
  res.status(200).send(res.locals.response);
});
// router.put("/videos", ApiController.editVideo, (req, res) => {
//   res.status(200).send(res.locals.response);
// });
router.get("/videos/comments/:video_id",controller.getComments, (req, res) => {
  console.log('------IN get COMMENTS ROUTER')
  res.status(200).send(res.locals.comments);
});
// router.post("/videos/comments", ApiController.postComment, (req, res) => {
//   res.status(200).send(res.locals.response);
// });

export default router;