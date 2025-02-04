import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import InputControl from "../../components/inputControl";
import { auth, db } from "../../firebase";

import styles from "./Signup.module.css";

function Signup() {
    //to navigate through pages
    const navigate = useNavigate();

    //Data we are taking from user
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");

    //ref for pushing data
    const userDataRef = collection(db, "userdata");

    //For authentication purpose
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //For Error Purpose
    const [errorMsg, setErrorMsg] = useState("");

    //For Button
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = async () => {
        // if (!name || !email || !password) {
        //     setErrorMsg("Fill all fields");
        //     return;
        // }
        // setErrorMsg("");

        // setSubmitButtonDisabled(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await addDoc(userDataRef, {
                name: name,
                username: username,
                contactNo: contactNo,
                gender: gender,
                age: age,
                bio: bio,
                email: email,
                experience: experience,
                userId: auth?.currentUser?.uid,
            });

            navigate("/home");
        } catch (err) {
            // setSubmitButtonDisabled(false);
            // setErrorMsg(err.message);
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Signup</h1>

                <InputControl
                    label="Name"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                />

                <InputControl
                    label="Username"
                    placeholder="Username/Display Name"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <InputControl
                    label="Contact No."
                    placeholder="Phone Number"
                    onChange={(e) => setContactNo(e.target.value)}
                />

                {/* <InputControl
                    label="Gender"
                    placeholder="Enter Gender"
                    onChange={(e) => setGender(e.target.value)}
                /> */}

                <InputControl
                    label="Age"
                    placeholder="Enter Age"
                    onChange={(e) => setAge(e.target.value)}
                />

                <label for="gender" className={styles.gender}>
                    Gender:
                </label>
                <select
                    id="gender"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <InputControl
                    label="Bio"
                    placeholder="Describe Yourself"
                    onChange={(e) => setBio(e.target.value)}
                />

                <InputControl
                    label="Experience"
                    placeholder="Experience"
                    onChange={(e) => setExperience(e.target.value)}
                />

                <InputControl
                    label="Email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputControl
                    label="Password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button
                        onClick={handleSubmission}
                        disabled={submitButtonDisabled}
                    >
                        Signup
                    </button>
                    <p>
                        Already have an account?{" "}
                        <span>
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
