const express = require("express");
const { requireSingIn } = require("../controllers/userController");
const {
  createprofileController,
  getProfileDataController,
  createAboutController,
  getAllAboutContoller,
  getUserAboutController,
  deleteAboutController,
  updateAboutDataController,
  getAboutDataController,
  updateprofileController,
  createUserLookingForDataController,
  getUserLookingForDataController,
  updateUserLookingForDataController,
  createUserGamesPlayedController,
  getUserGamesPlayedController,
  deleteGameController,
  likeUserController,
  dislikeUserController,
  getMatchesController,
  getPotentialMatchesController,
  getMessagesController,
  markMessagesAsReadController,
  sendMessageController,
} = require("../controllers/userAboutController");
const {
  getUserProfileController,
} = require("../controllers/getUserProfileController");

const router = express.Router();

// Existing routes...
router.post("/create-about", requireSingIn, createAboutController);
router.post("/create-profile", requireSingIn, createprofileController);
router.post("/create-looking-for", requireSingIn, createUserLookingForDataController);
router.post("/create-usergamesplayed", requireSingIn, createUserGamesPlayedController);

router.get("/get-profile-data", requireSingIn, getProfileDataController);
router.get("/get-about-data", requireSingIn, getAboutDataController);
router.get("/get-all-users", requireSingIn, getUserProfileController);
router.get("/get-user-looking-for-data", requireSingIn, getUserLookingForDataController);
router.get("/get-user-gamesplayed-data", requireSingIn, getUserGamesPlayedController);

router.put("/update-profile-data", requireSingIn, updateprofileController);
router.put("/update-about-data", requireSingIn, updateAboutDataController);
router.put("/update-looking-for-data", requireSingIn, updateUserLookingForDataController);
router.delete("/delete-game/:gameId", requireSingIn, deleteGameController);

// Match routes
router.post("/like-user", requireSingIn, likeUserController);
router.post("/dislike-user", requireSingIn, dislikeUserController);
router.get("/matches", requireSingIn, getMatchesController);
router.get("/potential-matches", requireSingIn, getPotentialMatchesController);

// New chat routes
router.get("/messages/:matchId", requireSingIn, getMessagesController);
router.post("/messages/read", requireSingIn, markMessagesAsReadController);
router.post("/send-message", requireSingIn, sendMessageController);

module.exports = router;