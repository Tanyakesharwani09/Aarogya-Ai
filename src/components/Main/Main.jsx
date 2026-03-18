import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import "./Main.css";
import { assets } from "../../assets/assets";

const Main = () => {

    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);

    // ✅ Clean Dark Mode Toggle
    const onChangeBtn = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <div className="main">

            {/* ================= NAVBAR ================= */}
            <div className="nav">
                <p>Aarogya - Ai</p>

                <div className="top-right">
                    <img
                        onClick={onChangeBtn}
                        src={assets.darkMode_icon}
                        alt="dark"
                        className="dark-mode-icon"
                        style={{ cursor: "pointer" }}
                    />
                    {/* <img src={assets.newLogo_icon} alt="logo" /> */}
                </div>
            </div>


            <div className="main-container">

                {/* ================= HOME SCREEN ================= */}
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Welcome to Aarogya AI</span></p>
                            <p>How are you feeling today?</p>
                        </div>

                        <div className="cards">

                            <div className="card">
                                <p>I have a headache and mild fever. What could it be?</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>What are the common side effects of paracetamol?</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Explain the early symptoms of diabetes</p>
                                <img src={assets.message_icon} alt="" />
                            </div>

                            <div className="card">
                                <p>Suggest a healthy diet plan for weight loss.</p>
                                <img src={assets.code_icon} alt="" />
                            </div>

                        </div>
                    </>
                ) : (

                    /* ================= RESULT SCREEN ================= */
                    <div className="result">

                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            <img src={assets.newLogo_icon} alt="" />

                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}

                        </div>

                    </div>
                )}

                {/* ================= SEARCH SECTION ================= */}
                <div className="main-bottom">

                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />

                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />

                            {input && (
                                <img
                                    onClick={() => onSent()}
                                    src={assets.send_icon}
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                />
                            )}
                        </div>
                    </div>

                    <p className="bottom-info">
                         Aarogya AI provides general health information and is not a substitute for professional medical advice. 
                        
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Main;