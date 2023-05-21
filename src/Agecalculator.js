import React, {useRef, useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import birthdaySong from "./bSong.mp3";

export default function Agecalculator(){
    const [birthday, setBirthday] = useState("");
    const [dateValue, setDateValue] = useState({});
    const intervalId = useRef(null);            // useState hook can also be use to store the reference of setInterval() but the good practice is using useRef()

    let wanted = new Audio(birthdaySong);

    //function for calculating the age and also check the error bounderies
    const handleCalculate = ()=>{ 
        if(intervalId.current)                          //it will clean the previous setInterval reference
            clearInterval(intervalId.current);

        const birthArr = birthday.split("-").map(item => Number(item));     //getting the year,month,date from input date field
        const currentDate = new Date();

        //checking the error bounderies
        if(!birthArr[0] || birthArr[0]>currentDate.getFullYear()){
            setDateValue({});
            console.log("Enter valid Birthday !");
            toast.error('🦄Enter valid Birth date!');
            return;
        }
        if(birthArr[0] === currentDate.getFullYear()){
            if(birthArr[1] > (currentDate.getMonth()+1)){
                setDateValue({});
                console.log("Enter valid month !");
                toast.error('Enter valid month !');
                return;
            }else if(birthArr[1] === (currentDate.getMonth()+1) && birthArr[2] > currentDate.getDate()){
                setDateValue({});
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
        
        intervalId.current = setInterval(()=>{
            const currentDate = new Date();
            let temp = {
                years: currentDate.getFullYear() - birthArr[0],
                months: currentDate.getMonth() + 1 - birthArr[1], 
                days: currentDate.getDate() - birthArr[2],
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                seconds: currentDate.getSeconds()
            };
            let monthArr = [1,3,5,7,8,10,12];
            //condition for checking if days difference or month difference are negative or not
            if(temp.days<0 && temp.months>=0){                      // diff. of days are -ve and diff. of months are +ve 
                temp.months = temp.months -1;
                if(monthArr.includes(Number(birthArr[1])))          //condition to check if months are of 30 days or 31 days
                    temp.days = 31 + temp.days;
                else 
                    temp.days = 30 + temp.days;
            }else if(temp.days>=0 && temp.months<0){                // diff. of days are +ve and diff. of months are -ve
                temp.years = temp.years-1;
                temp.months = 12 + temp.months;
            }else if(temp.days<0 && temp.months<0){                 // diff. of days are -ve and diff. of months are -ve
                temp.years = temp.years-1;
                temp.months = 12+(temp.months -1);
                if(monthArr.includes(Number(birthArr[1])))          //condition to check if months are of 30 days or 31 days
                    temp.days = 31 + temp.days;
                else 
                    temp.days = 30 + temp.days;
            }
            setDateValue(temp);
        }, 1000);
   }

    //function for cleaning the field and reset to its default values
    const handleReset = ()=>{
        clearInterval(intervalId.current);
        intervalId.current = null;
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

