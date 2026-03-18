import { createContext, useState, useEffect } from "react";
import main from '../config/AarogyaAi'

export const Context = createContext();

const ContextProvider =(props) =>{
    const [input , setInput] = useState(""); //use to save the input data 
    const [recentPrompt , setRecentPrompt] = useState(""); //after sending prompt to ai , recent will store the value of input
    const [previousPrompts , setPreviousPrompts] = useState([]); // declared as an array , used fro storing all the history input
    const [showResult , setShowResult] = useState(false); //for hiding greeting  tesxt and card ,and after this they will display the result
    const [loading , setLoading] = useState(false); 
    const [resultData , setResultData] = useState("") //display our result on webPage

    // this delayPara function is formed to add typing effect
    const delayPara =(index ,nextWord ) =>{
        setTimeout(function() {
            setResultData(prev => prev + nextWord);
        }, 75*index)

    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async(prompt ) =>{
    //    await main(input)
        setResultData("")
        setLoading(true)
        setShowResult(true)
     
        //use this if and else so when i click on recent and click the prompt then it will open that prompt and response
        let response;
        if(prompt !== undefined){
            response = await main(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPreviousPrompts(prev =>[...prev , input])
            setRecentPrompt(input)
            response = await main(input)
        }

        let responseArray = response.split("**");
        // we change let newResponse to let newResponse = "" to avoid the word undefined which is coming in first line of every Response
        let newResponse="";
        for(let i=0 ; i<responseArray.length; i++){
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i =0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i , nextWord + " ")
        }

        setLoading(false)
        setInput("")
        // console.log("hey bro")

    }
    // const onSent = async (prompt) => {
    //     const currentPrompt = prompt || input; // Use prompt parameter if provided, otherwise use input
        
    //     if (!currentPrompt.trim()) return; // Don't send empty prompts
        
    //     setResultData("");
    //     setLoading(true);
    //     setShowResult(true);
    //     // Update recent prompt and add to history
    //     setRecentPrompt(currentPrompt);
    //     setPreviousPrompts(prev => [...prev, currentPrompt]);
        
    //     try {
    //         const response = await main(currentPrompt);
    //         setResultData(response);
    //     } catch (error) {
    //         console.error("Error calling main function:", error);
    //         setResultData("Sorry, there was an error processing your request.");
    //     } finally {
    //         setLoading(false);
    //         setInput(""); // Clear input after sending
    //     }
    // };
    // useEffect(() => {
    //     Only call this if you want an initial prompt on component mount
    //     onSent("what is reactjs ?");
    // }, []);

    // onSent("what is reactjs ?")
    
    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider