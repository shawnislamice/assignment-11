import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/logout`,
      { user: user?.email },
      {
        withCredentials: true,
      }
    );
    console.log(data);
    setLoading(true);
    return signOut(auth);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const loggedUser = { email: currentUser?.email };
      if (currentUser) {
        await axiosSecure.post("/jwt", loggedUser);
        setLoading(false);
      } else {
        const { data } = await axiosSecure.get("/logout");
        // setUser(null)
        console.log(data);
        setLoading(false);
      }
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  const values = {
    createUser,
    signIn,
    signInWithGoogle,

    loading,
    setLoading,
    user,
    setUser,
    logOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
