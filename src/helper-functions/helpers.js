/**
 * @param {string} iso time string
 * @returns a human readable date/ time string
 */
const timeFormatter = (time) => { 
    //convert to time date object
    const newDate = new Date(`${time}`);
    // make array of just the date and time, omitting the GMT time and time zone info
    let dateTime = newDate.toString().split(" ").splice(0, 5);

    // extract date from date time and format into human readable string
    let date = dateTime.splice(0, 4);
    date[2] += ",";
    date = date.join(" ");

    // extract hours from time string and convert to 12-hr format
    // also determine AM/ PM
    let hours = dateTime.join("").split(":")[0];
    const amPm = hours > 12 ? "PM" : "AM";
    hours = hours > 12 ? hours - 12 : hours;

    //extract minutes from time string
    let minutes = dateTime.join("").split(":")[1];

    return `${date} ${hours}:${minutes}${amPm}`;
};


/**
 *
 * @param {string} a string of 10 digits
 * @returns a human readable formatted phone # string
 */
const phoneNumberFormatter = phone => {
    return `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;
};

/**
 * takes a phone number in any format and extracts the digits 
 * @param {string} phone 
 * @returns string of 10 digits 0-9 
 */
const phoneNumberExtractor = phone => {
    let digits = '';
    for (let char of phone) {
        if (/[0-9]/.test(char)) digits += char;
    }
    return digits;
}

/**
 * takes in a string and determines
 * if there are 10 valid phone number digits in it
 * @param {string} phone 
 * @returns {boolean} true/ false if phone # is valid
 */
const phoneNumberValidator = phone => {
    
    //if no phone number inputted
    if (!phone) return false;

    //pull all digits out of user's input and check if there's 10 digits
    let nums = [];
    for (let c of phone) {
        if (/[0-9]/.test(c)) {
            nums.push(c);
        }
    }

    return nums.length === 10 ? nums : false;
}

/**
 * checks if email is in the format string@string.string
 * @param {string} email 
 * @returns {boolean} true/ false if email is valid
 */
const emailValidator = (email) => {
    let regEx = /^\S+@\S+\.\S+$/;
    return regEx.test(email) ? true : false;
}

/**
 * Takes in the time and date from form inputs and converts them 
 * into ISO format for backend.
 * @param {string} date 
 * @param {string} time 
 * @returns ISO time/date string 
 */
const dateTimeToTimeStamp = (date, time) => `${date} ${time}`;





/**
 * get todays date in correct format to set min values in date picker
*/ 
const getTodaysDate = () => {
    const today = new Date();
    const day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (month < 10) month = "0" + month;

    return `${year}-${month}-${day}`;
};

//format open / close times for info section
//ADD THIS TO HELPER FUNCTIONS
const hoursFormatter = (open, close) => {
    open = open.split(":");
    close = close.split(":");
    let openHours =
        open[0] > 12
            ? `${open[0] - 12}:${open[1]}PM`
            : `${open[0]}:${open[1]}AM`;
    let closeHours =
        close[0] > 12
            ? `${close[0] - 12}:${close[1]}PM`
            : `${close[0]}:${close[1]}AM`;

    return `${openHours} - ${closeHours}`;
};


export {
    timeFormatter,
    phoneNumberFormatter,
    phoneNumberValidator,
    phoneNumberExtractor,
    dateTimeToTimeStamp,
    emailValidator,
    getTodaysDate,
    hoursFormatter
};