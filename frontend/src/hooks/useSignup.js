import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import SERVER_URL from '../utils/SERVER_URL.js';

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (fullName.length < 3) {
    toast.error('Full name must be at least 3 characters long');
    return false;
  }

  if (!/^[a-z]{3,16}$/.test(username)) {
    toast.error(
      'Username must be 3-16 lowercase letters only (no numbers or symbols)',
    );
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
    toast.error('Password must contain at least one letter and one number');
    return false;
  }

  if (!['male', 'female'].includes(gender.toLowerCase())) {
    toast.error("Gender must be either 'male' or 'female'");
    return false;
  }

  return true;
}
