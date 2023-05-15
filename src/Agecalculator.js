import React, {useState} from 'react';

export default function Agecalculator(){
    const [dateValue, setDateValue] = useState({});
    
    const currentDetails =()=> setInterval(()=>{
        const currentDate = new Date();
        let temp = {
            years: currentDate.getFullYear(),
            months: currentDate.getMonth() + 1, 
            days: currentDate.getDate(),
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            seconds: currentDate.getSeconds()
        };
        setDateValue(temp);
    }, 1000);

    const handleCalculate = ()=>{ 
        currentDetails();
    }

    const handleReset = ()=>{
        clearInterval(currentDetails())
        setDateValue({});
        console.log('clean');
    }

    return (
    <div className=''>
        <div>
            <label for="birthday">Enter your Birthday: </label>
            <input type='date' id='birthday' 
            onChange={(e)=>setDateValue(e.target.value)} required/>
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
        <div>
            <button type='button' onClick={handleCalculate}>Calculate</button>
            <button type='reset' onClick={handleReset}>Reset</button>
        </div>
    </div>
        
    );
}

