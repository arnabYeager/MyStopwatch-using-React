import { useState, useEffect, useRef } from "react";

// Stopwatch component definition
export function Stopwatch() {

    // State to track if the stopwatch is running or not
    const [isRunning, setIsRunning] = useState(false);

    // State to track the elapsed time in milliseconds
    const [elapsedTime, setElapsedTime] = useState(0);

    // useRef to hold the interval ID for later clearing
    const intervalIdRef = useRef(null);

    // useRef to store the start time of the stopwatch
    const startTimeRef = useRef(0);

    // useEffect to handle side effects: starting and stopping the interval when the stopwatch runs or stops
    useEffect(() => {
        if (isRunning) {
            // If the stopwatch is running, set an interval to update the elapsed time every 10 milliseconds
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current); // Update elapsed time based on current time and the starting time
            }, 10); // Interval set to 10 milliseconds for accurate timekeeping
        }

        // Cleanup function to clear the interval when the component unmounts or when isRunning changes to false
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]); // This effect depends on the isRunning state

    // Start function to begin or resume the stopwatch
    const start = () => {
        setIsRunning(true); // Set the state to indicate the stopwatch is running
        startTimeRef.current = Date.now() - elapsedTime; // Set the start time, taking into account the elapsed time if the stopwatch was paused
    };

    // Stop function to pause the stopwatch
    const stop = () => {
        setIsRunning(false); // Set the state to indicate the stopwatch is not running
    };

    // Reset function to clear the stopwatch and reset everything to 0
    const reset = () => {
        setElapsedTime(0); // Reset elapsed time to 0
        setIsRunning(false); // Stop the stopwatch
    };

    // Function to format the elapsed time into hours, minutes, seconds, and milliseconds
    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); // Convert milliseconds to hours
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); // Convert milliseconds to minutes
        let seconds = Math.floor((elapsedTime / 1000) % 60); // Convert milliseconds to seconds
        let milliseconds = Math.floor((elapsedTime % 1000) / 10); // Convert to milliseconds (in hundredths of a second)

        // Format each time component to always have two digits
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        // Return the formatted time string
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    };

    // Render the stopwatch UI
    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div> {/* Display the formatted time */}
            <div className="controls">
                <button className="start-btn" onClick={start}>Start</button> {/* Start button */}
                <button className="stop-btn" onClick={stop}>Stop</button> {/* Stop button */}
                <button className="reset-btn" onClick={reset}>Reset</button> {/* Reset button */}
            </div>
        </div>
    );
}
