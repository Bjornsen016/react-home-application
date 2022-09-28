// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signOut, signInWithCustomToken } from "firebase/auth";

import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDvfjmimWXUFV-wA7_3qEnloUBhAFEdq8U",
	authDomain: "homehub-362408.firebaseapp.com",
	databaseURL: "https://homehub-362408-default-rtdb.firebaseio.com",
	projectId: "homehub-362408",
	storageBucket: "homehub-362408.appspot.com",
	messagingSenderId: "947980141023",
	appId: "1:947980141023:web:e28118bd0544068f87046a",
	measurementId: "G-QRT1KZ8SN4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

const loginWithCustomToken = async (token) => {
	try {
		await signInWithCustomToken(auth, token);
	} catch (err) {
		console.error(err);
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, db, logout, loginWithCustomToken };
