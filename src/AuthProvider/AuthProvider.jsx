/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const register = (email, password) => {
    try {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setErr(e.message);
    }
  };
  const updateUserName = async (name) => {
    return await updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  const value = {
    register,
    err,
    loading,
    updateUserName,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
