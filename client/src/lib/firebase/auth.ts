import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./config";

export const signUp = async (name: string, email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // profile update
    if (auth.currentUser)
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    const currentUser = auth.currentUser;
    return currentUser;
  };

export async function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}
// logout the current logged in user and set state of user to be null
export async function logOut() {
    return signOut(auth);
}
export async function sendEmailVerificationLink() {
    if(!auth.currentUser) return null;
        return await sendEmailVerification(auth.currentUser);
}
export async function resetPassword(email: string) {
    return await sendPasswordResetEmail(auth, email);
}