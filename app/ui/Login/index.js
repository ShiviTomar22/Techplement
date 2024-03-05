"use client";
import Link from "next/link";
import React, {  useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from "./styles.module.css";
import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setpassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "email") {
      setEmailError("");
    } else if (id === "password") {
      setpassword("");
    }
  };



  const onLogin = async () => {
    try {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);

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
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/calculator");
    } catch (error) {
      console.log("Login failed", error);
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
      
        <h1 className={styles.heading}>{loading ? "Processing" : "Login"}</h1>
        <hr className={styles.separator} />

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
        <button className={styles.submitButton} onClick={onLogin}>
          Login
        </button>

        <div style={{ textAlign: "center", fontSize: 12 }}>Or</div>


        <p className={styles.signin}>
          Create an account{" "}
          <Link className={styles.link} href="/signup">
            {" "}
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
