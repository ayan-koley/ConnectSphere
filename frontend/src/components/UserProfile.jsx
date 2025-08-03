import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthAvatar from "./Header/AuthAvatar";
import { Camera, User } from "lucide-react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const [avatarPreview, setAvatarPreview] = useState(
    user?.imageUrl || null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
        try {
            if(data.avatar) {
                const file = data.avatar;
                await user.setProfileImage({file});
            }
            user.update({
                firstName: data.firstName,
                lastName: data.lastName,
                imageUrl: data.avatar
            })
        } catch (err) {
            toast.error(err.message);
        }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="min-h-screen bg-accent py-8 px-4 rounded-xl ">
      <div className=" mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Update your personal information
          </h1>
        </div>

        <Card className="border-black shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <AuthAvatar className={'w-24 h-24 border-2 border-black'} src={avatarPreview} />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute -bottom-2 -right-2 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <Label className="text-sm text-gray-600">
                  Click the camera icon to change avatar
                </Label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue={user.firstName}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className=" font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue={user.lastName}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className=" font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  readOnly
                  defaultValue={user.emailAddresses}
                  className="border-gray-300 bg-gray-50 cursor-not-allowed"
                  placeholder="Your email address"
                />
                <p className="text-xs text-gray-500">
                  Email address cannot be changed
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 font-medium cursor-pointer"
                >
                  {isSubmitting ? "Updating Profile..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
