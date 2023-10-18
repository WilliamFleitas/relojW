const { UserPreferences } = require("../../database");



export const changeAvatarVideoValue = async (preferenceId: string, avatarBool: boolean, didKey: string) => {
try {
   const withKeyObj = {
    didKey: didKey,
    avatarVideo: avatarBool
   }
   const noKeyObj = {
    avatarVideo: avatarBool
   }
   const preferenceObject = avatarBool ? withKeyObj : noKeyObj
   await UserPreferences.update(preferenceObject, {
    where: {
      userId: preferenceId,
    },
  });
  return "Preference Updated Correctly";
} catch (error: any) {
    throw new Error(error);
}
};