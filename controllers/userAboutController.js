const userAboutModel = require("../models/userAboutModel");
const userProfileModel = require("../models/userProfileModel");
const userLookingForModel = require("../models/lookingFormodel");
const userGamesPlayedModel = require("../models/userGamesPlayedModel");
const UserInteraction = require("../models/userInteractionModel");
const Match = require("../models/matchModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

//Create About
const createAboutController = async (req, res) => {
  try {
    const { educationQualification, location, smoking, drinks, gender, religion, occupation } = req.body;
    
    const existingAboutData = await userAboutModel.findOne({ user: req.auth._id });

    if (existingAboutData) {
      return res.status(400).json({
        success: false,
        message: "Data already exists!",
      });
    }
    
    const userAboutData = await userAboutModel({
      educationQualification,
      location,
      smoking,
      drinks,
      gender,
      religion,
      occupation,
      user: req.auth._id,
    }).save();
    
    res.status(201).send({
      success: true,
      message: "UserAboutData Created Successfully",
      userAboutData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post API",
      error,
    });
  }
};

//Get AboutData
const getAboutDataController = async (req, res) => {
  try {
    const aboutData = await userAboutModel.findOne({ user: req.auth._id });

    if (!aboutData) {
      return res.status(404).send({
        success: false,
        message: "About data not found",
      });
    }

    res.status(200).send({
      success: true,
      message: 'About Data',
      aboutData
    });
  } catch (error) {
    console.error("Error in GetAboutData:", error);
    res.status(500).send({
      success: false,
      message: "Error in GetAboutData",
      error: error.message,
    });
  }
};

//Update About
const updateAboutDataController = async (req, res) => {
  try {
    const { educationQualification, location, smoking, drinks, gender, religion, occupation } = req.body;
    const aboutData = await userAboutModel.findOne({ user: req.auth._id });

    if (!educationQualification && !location && !smoking && !drinks && !gender && !religion && !occupation) {
      return res.status(500).send({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    if (!aboutData) {
      return res.status(404).send({
        success: false,
        message: "AboutData not found",
      });
    }

    const updatedFields = {};
    if (educationQualification !== undefined) updatedFields.educationQualification = educationQualification;
    if (location !== undefined) updatedFields.location = location;
    if (smoking !== undefined) updatedFields.smoking = smoking;
    if (drinks !== undefined) updatedFields.drinks = drinks;
    if (gender !== undefined) updatedFields.gender = gender;
    if (religion !== undefined) updatedFields.religion = religion;
    if (occupation !== undefined) updatedFields.occupation = occupation;

    const updatedAboutData = await userAboutModel.findOneAndUpdate(
      { user: req.auth._id },
      {
        educationQualification: updatedFields.educationQualification || aboutData?.educationQualification,
        location: updatedFields.location || aboutData?.location,
        smoking: updatedFields.smoking || aboutData?.smoking,
        drinks: updatedFields.drinks || aboutData?.drinks,
        gender: updatedFields.gender || aboutData?.gender,
        religion: updatedFields.religion || aboutData?.religion,
        occupation: updatedFields.occupation || aboutData?.occupation,
      },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      success: true,
      message: "AboutData Updated Successfully",
      updatedAboutData,
    });
  } catch (error) {
    console.error("Error in update AboutData:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating AboutData",
      error: error.message,
    });
  }
};

//Create Profile
const createprofileController = async (req, res) => {
  try {
    const { bio, age, gamingName } = req.body;
    const existingProfileData = await userProfileModel.findOne({ user: req.auth._id });

    if (existingProfileData) {
      return res.status(400).json({
        success: false,
        message: "ProfileData already exists!",
      });
    }

    const userProfileData = await userProfileModel({
      bio,
      gamingName,
      age,
      user: req.auth._id
    }).save();
    
    res.status(201).send({
      success: true,
      message: "ProfileData Created Successfully",
      userProfileData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post API",
      error,
    });
  }
};

//Get ProfileData
const getProfileDataController = async (req, res) => {
  try {
    const userProfileData = await userProfileModel.findOne({ user: req.auth._id });

    if (!userProfileData) {
      return res.status(404).send({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).send({
      success: true,
      message: 'Profile Data',
      userProfileData
    });
  } catch (error) {
    console.error("Error in GetProfileData:", error);
    res.status(500).send({
      success: false,
      message: "Error in GetProfileData",
      error: error.message,
    });
  }
};

//UPDATE PROFILE
const updateprofileController = async (req, res) => {
  try {
    const { bio, age, gamingName } = req.body;
    const userProfile = await userProfileModel.findOne({ user: req.auth._id });

    if (!bio && !age && !gamingName) {
      return res.status(500).send({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    if (!userProfile) {
      return res.status(404).send({
        success: false,
        message: "Profile not found",
      });
    }

    const updatedFields = {};
    if (bio !== undefined) updatedFields.bio = bio;
    if (age !== undefined) updatedFields.age = age;
    if (gamingName !== undefined) updatedFields.gamingName = gamingName;

    const updatedProfile = await userProfileModel.findOneAndUpdate(
      { user: req.auth._id },
      {
        bio: updatedFields.bio || userProfile?.bio,
        age: updatedFields.age || userProfile?.age,
        gamingName: updatedFields.gamingName || userProfile?.gamingName
      },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Error in update profile:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating profile",
      error: error.message,
    });
  }
};

//Create lookingFor
const createUserLookingForDataController = async (req, res) => {
  try {
    const { availability, playMode, playStyle } = req.body;
    const existingUserLookingForData = await userLookingForModel.findOne({ user: req.auth._id });

    if (existingUserLookingForData) {
      return res.status(400).json({
        success: false,
        message: "Data already exists!",
      });
    }
    
    const userLookingForData = await userLookingForModel({
      availability,
      playMode,
      playStyle,
      user: req.auth._id,
    }).save();
    
    res.status(201).send({
      success: true,
      message: "Looking For Data Created Successfully",
      userLookingForData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post API",
      error,
    });
  }
};

//Get LookingForData
const getUserLookingForDataController = async (req, res) => {
  try {
    const userLookingForData = await userLookingForModel.findOne({ user: req.auth._id });

    if (!userLookingForData) {
      return res.status(404).send({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).send({
      success: true,
      message: 'Looking For Data',
      userLookingForData
    });
  } catch (error) {
    console.error("Error in GetLookingForData:", error);
    res.status(500).send({
      success: false,
      message: "Error in GetLookingForData",
      error: error.message,
    });
  }
};

//Update LookingFor
const updateUserLookingForDataController = async (req, res) => {
  try {
    const { availability, playMode, playStyle } = req.body;
    const userLookingForData = await userLookingForModel.findOne({ user: req.auth._id });

    if (!availability && !playMode && !playStyle) {
      return res.status(500).send({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    if (!userLookingForData) {
      return res.status(404).send({
        success: false,
        message: "Looking For Data not found",
      });
    }

    const updatedFields = {};
    if (availability !== undefined) updatedFields.availability = availability;
    if (playMode !== undefined) updatedFields.playMode = playMode;
    if (playStyle !== undefined) updatedFields.playStyle = playStyle;

    const updatedUserLookingForData = await userLookingForModel.findOneAndUpdate(
      { user: req.auth._id },
      {
        availability: updatedFields.availability || userLookingForData?.availability,
        playMode: updatedFields.playMode || userLookingForData?.playMode,
        playStyle: updatedFields.playStyle || userLookingForData?.playStyle
      },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      success: true,
      message: "Looking For Data Updated Successfully",
      updatedUserLookingForData,
    });
  } catch (error) {
    console.error("Error in update Looking For Data:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating Looking For Data",
      error: error.message,
    });
  }
};

// Create User Games Played
const createUserGamesPlayedController = async (req, res) => {
  try {
    const { gamesPlayed } = req.body;
    const userId = req.auth._id;

    if (!gamesPlayed || !Array.isArray(gamesPlayed)) {
      return res.status(400).json({
        success: false,
        message: "Games played data is required and must be an array"
      });
    }

    let userGames = await userGamesPlayedModel.findOne({ user: userId });

    if (!userGames) {
      userGames = new userGamesPlayedModel({
        user: userId,
        gamesPlayed: gamesPlayed
      });
    } else {
      gamesPlayed.forEach(game => {
        const isDuplicate = userGames.gamesPlayed.some(
          g => g.playedGameName.toLowerCase() === game.playedGameName.toLowerCase()
        );
        if (!isDuplicate) {
          userGames.gamesPlayed.push(game);
        }
      });
    }

    await userGames.save();

    return res.status(200).json({
      success: true,
      message: "Games played updated successfully",
      gamesPlayed: userGames.gamesPlayed
    });

  } catch (error) {
    console.error("Error in createUserGamesPlayedController:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update games played"
    });
  }
};

//Get User Games Played
const getUserGamesPlayedController = async (req, res) => {
  try {
    const gamesPlayed = await userGamesPlayedModel.findOne({ user: req.auth._id });

    if (!gamesPlayed) {
      return res.status(404).send({
        success: false,
        message: "User Games Played data not found",
      });
    }

    res.status(200).send({
      success: true,
      message: 'User Games Played data',
      gamesPlayed
    });
  } catch (error) {
    console.error("Error in User Games Played data:", error);
    res.status(500).send({
      success: false,
      message: "Error in User Games Played data",
      error: error.message,
    });
  }
};

// Delete Game from Games Played
const deleteGameController = async (req, res) => {
  try {
    const { gameId } = req.params;
    const userGamesData = await userGamesPlayedModel.findOne({ user: req.auth._id });

    if (!userGamesData) {
      return res.status(404).json({
        success: false,
        message: "User games data not found",
      });
    }

    const initialCount = userGamesData.gamesPlayed.length;
    userGamesData.gamesPlayed = userGamesData.gamesPlayed.filter(
      game => game._id.toString() !== gameId
    );

    if (userGamesData.gamesPlayed.length === initialCount) {
      return res.status(404).json({
        success: false,
        message: "Game not found in your list",
      });
    }

    await userGamesData.save();

    res.status(200).json({
      success: true,
      message: "Game deleted successfully",
      updatedGames: userGamesData.gamesPlayed,
    });

  } catch (error) {
    console.error("Error in deleteGameController:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting game",
      error: error.message,
    });
  }
};

// Like a user
const likeUserController = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.auth._id;

    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: "Target user ID is required"
      });
    }

    if (userId.toString() === targetUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot like yourself"
      });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Target user not found"
      });
    }

    const existingInteraction = await UserInteraction.findOne({
      user: userId,
      targetUser: targetUserId
    });

    if (existingInteraction) {
      return res.status(400).json({
        success: false,
        message: `You have already ${existingInteraction.action}ed this user`
      });
    }

    await UserInteraction.create({
      user: userId,
      targetUser: targetUserId,
      action: 'like'
    });

    const mutualLike = await UserInteraction.findOne({
      user: targetUserId,
      targetUser: userId,
      action: 'like'
    });

    if (mutualLike) {
      const newMatch = await Match.create({
        user1: userId,
        user2: targetUserId
      });

      return res.status(200).json({
        success: true,
        message: "It's a match!",
        match: newMatch
      });
    }

    res.status(200).json({
      success: true,
      message: "Like recorded successfully"
    });

  } catch (error) {
    console.error("Error in likeUserController:", error);
    res.status(500).json({
      success: false,
      message: "Error processing like",
      error: error.message
    });
  }
};

// Dislike a user
const dislikeUserController = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const userId = req.auth._id;

    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: "Target user ID is required"
      });
    }

    if (userId.toString() === targetUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot dislike yourself"
      });
    }

    const existingInteraction = await UserInteraction.findOne({
      user: userId,
      targetUser: targetUserId
    });

    if (existingInteraction && existingInteraction.action === 'dislike') {
      return res.status(400).json({
        success: false,
        message: "You have already disliked this user"
      });
    }

    if (existingInteraction) {
      existingInteraction.action = 'dislike';
      await existingInteraction.save();
    } else {
      await UserInteraction.create({
        user: userId,
        targetUser: targetUserId,
        action: 'dislike'
      });
    }

    res.status(200).json({
      success: true,
      message: "Dislike recorded successfully"
    });

  } catch (error) {
    console.error("Error in dislikeUserController:", error);
    res.status(500).json({
      success: false,
      message: "Error processing dislike",
      error: error.message
    });
  }
};

// Get all matches for a user
const getMatchesController = async (req, res) => {
  try {
    const userId = req.auth._id;

    const matches = await Match.find({
      $or: [{ user1: userId }, { user2: userId }],
      isActive: true
    })
    .populate('user1', 'username')
    .populate('user2', 'username')
    .sort({ createdAt: -1 });

    const formattedMatches = matches.map(match => {
      const otherUser = match.user1._id.toString() === userId.toString() ? match.user2 : match.user1;
      return {
        matchId: match._id,
        user: {
          id: otherUser._id,
          username: otherUser.username
        },
        matchedAt: match.createdAt
      };
    });

    res.status(200).json({
      success: true,
      matches: formattedMatches
    });

  } catch (error) {
    console.error("Error in getMatchesController:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving matches",
      error: error.message
    });
  }
};

// Get potential matches (users you haven't interacted with)
const getPotentialMatchesController = async (req, res) => {
  try {
    const userId = req.auth._id;

    const interactions = await UserInteraction.find({ user: userId });
    const interactedUserIds = interactions.map(i => i.targetUser);
    interactedUserIds.push(userId);

    const potentialMatches = await User.find({
      _id: { $nin: interactedUserIds },
      role: 'gamer'
    })
    .select('username')
    .limit(20);

    res.status(200).json({
      success: true,
      potentialMatches
    });

  } catch (error) {
    console.error("Error in getPotentialMatchesController:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving potential matches",
      error: error.message
    });
  }
};


// Get messages for a match
const getMessagesController = async (req, res) => {
  try {
    const { matchId } = req.params;
    const userId = req.auth._id;

    const match = await Match.findOne({
      _id: matchId,
      $or: [{ user1: userId }, { user2: userId }]
    });

    if (!match) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view these messages"
      });
    }

    const messages = await Message.find({ match: matchId })
      .sort({ timestamp: 1 })
      .populate('sender', 'username');

    res.status(200).json({
      success: true,
      messages
    });

  } catch (error) {
    console.error("Error in getMessagesController:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving messages",
      error: error.message
    });
  }
};

// Mark messages as read
const markMessagesAsReadController = async (req, res) => {
  try {
    const { matchId } = req.body;
    const userId = req.auth._id;

    await Message.updateMany(
      {
        match: matchId,
        receiver: userId,
        read: false
      },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: "Messages marked as read"
    });

  } catch (error) {
    console.error("Error in markMessagesAsReadController:", error);
    res.status(500).json({
      success: false,
      message: "Error marking messages as read",
      error: error.message
    });
  }
};


const sendMessageController = async (req, res) => {
  try {
    const { matchId, receiverId, content } = req.body;
    const senderId = req.auth._id;

    // Validation
    if (!matchId || !receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Verify match exists
    const match = await Match.findOne({
      _id: matchId,
      $or: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId }
      ],
      isActive: true
    });

    if (!match) {
      return res.status(403).json({
        success: false,
        message: "Invalid match or unauthorized"
      });
    }

    // Create message
    const message = await Message.create({
      match: matchId,
      sender: senderId,
      receiver: receiverId,
      content,
      timestamp: new Date()
    });

    // Update match last message
    await Match.findByIdAndUpdate(matchId, {
      lastMessage: content,
      lastMessageAt: new Date()
    });

    // Emit via Socket.io
    const io = req.app.get('io');
    io.to(matchId).emit('receiveMessage', message);
    io.to(senderId).emit('messageSent', message);
    io.to(receiverId).emit('receiveMessage', message);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      sentMessage: message
    });

  } catch (error) {
    console.error("Error in sendMessageController:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



module.exports = {
  createAboutController,
  getAboutDataController,
  updateAboutDataController,
  createprofileController,
  getProfileDataController,
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
  sendMessageController


};