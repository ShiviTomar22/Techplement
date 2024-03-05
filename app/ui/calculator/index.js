"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";

const Logout = () => {

  const router = useRouter();

  const logout = async () => {
  

    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={() => logout()} className={styles.logout}>
      <MdLogout />
      Logout
    </button>
  );
};

export default function Calculator() {
  const [result, setResult] = useState("");

  const insertValue = (value) => {
    setResult((prevResult) => prevResult + value);
  };

  const clearResult = () => {
    setResult("");
  };

  const deleteResult = () => {
    setResult((prevResult) => prevResult.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (error) {
      setResult("error");
    }
  };

  return (
    <div className={styles.parent}>
      <div>
        <div className={styles.title}>Calculator</div>
        <div className={styles.calculator}>
          <div className={styles.display}>
            <input type="text" value={result} disabled />
          </div>
          <div className={styles.button}>
            <button onClick={clearResult}>AC</button>
            <button onClick={deleteResult}>DEL</button>
            <button onClick={() => insertValue("%")}>%</button>
            <button onClick={() => insertValue("/")}>/</button>
            <button onClick={() => insertValue("7")}>7</button>
            <button onClick={() => insertValue("8")}>8</button>
            <button onClick={() => insertValue("9")}>9</button>
            <button onClick={() => insertValue("*")}>*</button>
            <button onClick={() => insertValue("4")}>4</button>
            <button onClick={() => insertValue("5")}>5</button>
            <button onClick={() => insertValue("6")}>6</button>
            <button onClick={() => insertValue("-")}>-</button>
            <button onClick={() => insertValue("1")}>1</button>
            <button onClick={() => insertValue("2")}>2</button>
            <button onClick={() => insertValue("3")}>3</button>
            <button onClick={() => insertValue("+")}>+</button>
            <button onClick={() => insertValue("00")}>00</button>
            <button onClick={() => insertValue("0")}>0</button>
            <button onClick={() => insertValue(".")}>.</button>
            <button className={styles.eg} onClick={calculate}>
              =
            </button>
          </div>
        </div>
        <div className={styles.title}>
          <Logout />
        </div>
      </div>
    </div>
  );
}
