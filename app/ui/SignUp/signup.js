"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "./styles.module.css";
import Image from "next/image";
import { MdOutlineMail, MdPassword } from "react-icons/md";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "email") {
      setEmailError("");
    } else if (id === "username") {
      setUsernameError("");
    } else if (id === "password") {
      setpassword("");
    }
  };

  const onSignup = async () => {
    try {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
      const isUsernameValid = user.username.length >= 3;

      if (!isUsernameValid || !user.username.length) {
        console.log("d");
        setUsernameError("Username must be greater than 3 letters");
        return;
      }

      if (!isEmailValid || !user.email.length) {
        console.log("f");
        setEmailError("Invalid email format");
        return;
      }

      if (!user.password.length) {
        setpassword("Please Enter Password");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          // onClick={() => window.open("https://www.carbontrail.net/", "_blank")}
        >
          {/* <Image
            src={"/CarbonTrailWhiteLogo.webp"}
            alt=""
            width="135"
            height="75"
          /> */}
        </div>
        <h1 className={styles.heading}>{loading ? "Processing" : "Signup"}</h1>
        <hr className={styles.separator} />
        <div className={styles.inputParent}>
          <label className={styles.label} htmlFor="username">
            <Image
              className={styles.userImage}
              src={"/User.svg"}
              alt=""
              width="20"
              height="20"
            />{" "}
            Username
          </label>
          <input
            className={styles.input}
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => handleInputChange(e)}
            placeholder="Username"
          />
          {usernameError ? (
            <span className={styles.error}>{usernameError}</span>
          ) : null}
        </div>

        <div className={styles.inputParent}>
          <label className={styles.label} htmlFor="email">
            <MdOutlineMail /> Email
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
          {emailError ? (
            <span className={styles.error}>{emailError}</span>
          ) : null}
        </div>

        <div className={styles.inputParent}>
          <label className={styles.label} htmlFor="password">
            <MdPassword /> Password
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
          {password ? <span className={styles.error}>{password}</span> : null}
        </div>

        <button
          className={styles.submitButton}
          onClick={() => {
            console.log("isEmailValid");
            onSignup();
          }}
        >
          Signup
        </button>
        <div style={{ textAlign: "center", fontSize: 12 }}>Or</div>


        <p className={styles.signin}>
          Already have an account?{" "}
          <Link className={styles.link} href="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
