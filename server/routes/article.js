const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const imagesHelper = require("../helpers/images");

router.get("/", articleController.getArticles);
router.get("/:articleId", articleController.getOneArticle);
// router.post("/",
// imagesHelper.multer.single('image'),
// imagesHelper.sendUploadToGCS,
// articleController.addArticle);
router.put("/:articleId", articleController.updateArticle);
router.delete("/:articleId", articleController.deleteArticle);

module.exports = router;
