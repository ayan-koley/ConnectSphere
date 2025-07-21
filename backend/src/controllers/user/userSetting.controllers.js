import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import UserSetting from "../../models/user/userSetting.models.js";
import User from "../../models/user/user.models.js";

const changeTheme = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const setting = await UserSetting.findOne({
    userId: user._id,
  });
  if (!setting) {
    throw new ApiError(404, "User setting not found");
  }
  if (setting.theme === "light") {
    setting.theme = "dark";
  } else {
    setting.theme = "light";
  }
  await setting.save();
  res.status(200).json(new ApiResponse(200, "Theme changed successfully"));
});

const updateLanguage = asyncHandler(async (req, res) => {
  const { language } = req.body;
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const setting = await UserSetting.findOneAndUpdate(
    {
      userId: user._id,
    },
    {
      language,
    },
    {
      new: true,
    }
  );
  if (!setting) {
    throw new ApiError(404, "User setting not found");
  }
  res.status(200).json(new ApiResponse(200, "Language changed successfully"));
});

const updateCountry = asyncHandler(async (req, res) => {
  const { country } = req.body;
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const setting = await UserSetting.findOneAndUpdate(
    {
      userId: user._id,
    },
    {
      country,
    },
    {
      new: true,
    }
  );
  if (!setting) {
    throw new ApiError(404, "User setting not found");
  }
  res.status(200).json(new ApiResponse(200, "Country changed successfully"));
});

const getUserSetting = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const setting = await UserSetting.findOne({
    userId: user._id,
  });
  if (!setting) {
    throw new ApiError(404, "User setting not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { setting }, "User setting retrieved successfully")
    );
});

export { changeTheme, updateLanguage, updateCountry, getUserSetting };
