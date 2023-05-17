import React, {useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import birthdaySong from "./bSong.mp3";

export default function Agecalculator(){
    const [birthday, setBirthday] = useState("");
    const [dateValue, setDateValue] = useState({});
    const [intervalId, setIntervalId] = useState(0);
    
    let wanted = new Audio(birthdaySong)
    //function for calculating the age and also check the error bounderies
    const handleCalculate = ()=>{ 
        const birthArr = birthday.split("-").map(item => Number(item));     //getting the year,month,date from input date field
        const currentDate = new Date();

        //checking the error bounderies
        if(!birthArr[0] || birthArr[0]>currentDate.getFullYear()){
            console.log("Enter valid Birthday !");
            toast.error('🦄Enter valid Birth date!');
            return;
        }
        if(birthArr[0] === currentDate.getFullYear()){
            if(birthArr[1] > (currentDate.getMonth()+1)){
                console.log("Enter valid month !");
                toast.error('Enter valid month !');
                return;
            }else if(birthArr[1] === (currentDate.getMonth()+1) && birthArr[2] > currentDate.getDate()){
                console.log("Enter valid date !");
                toast.error('Enter valid date !');
                return;
            }
        }
        // if month and date is same then show Happy Birthday msg
        if(birthArr[1] === (currentDate.getMonth()+1) && birthArr[2] === currentDate.getDate()){
            toast('Happy Birthday');
            wanted.play();
        }
        
        const newIntervalId = setInterval(()=>{
            const currentDate = new Date();
            let temp = {
                years: currentDate.getFullYear() - birthArr[0],
                months: currentDate.getMonth() + 1 - birthArr[1], 
                days: currentDate.getDate() - birthArr[2],
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                seconds: currentDate.getSeconds()
            };
            setDateValue(temp);
        }, 1000);
        setIntervalId(newIntervalId);               //storing the reference of setInterval into useState for dynamic implementation
        
        return ()=> clearInterval(intervalId);
    }

    //function for cleaning the field and reset to its default values
    const handleReset = ()=>{
        clearInterval(intervalId);
        setDateValue({});
        setBirthday("dd-mm-yyyy");
    }

    return (
    <div className='age-calculator'>
        <div className='birthday-field'>
            <label for="birthday">Enter your Birthday: </label>
            <input type='date' id='birthday' 
            onChange={(e)=>setBirthday(e.target.value)} 
            value={birthday} required/>
        </div>

        {dateValue &&
            <ul>
                <li>{dateValue.years} Years</li>
                <li>{dateValue.months} Months</li>
                <li>{dateValue.days} Days</li>
                <li>{dateValue.hours} Hours</li>
                <li>{dateValue.minutes} Minutes</li>
                <li>{dateValue.seconds} Seconds</li>
            </ul>
        }
        <div className='calculate-reset'>
            <button className='calculate-btn' type='button' onClick={handleCalculate}>Calculate</button>
            <button className='reset-btn' type='reset' onClick={handleReset}>Reset</button>
        </div>
    </div>
    );
}

