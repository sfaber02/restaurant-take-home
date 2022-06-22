/**
 * @param {string} iso time string
 * @returns a human readable date/ time string
 */
const timeFormatter = (time) => {
    // extract date from time string
    const tempDate = new Date(time);
    const date = tempDate.toDateString();

    //extract hours from time string
    time = time.split("T")[1];
    let hours = time.split(":")[0];
    const amPm = hours > 12 ? "PM" : "AM";
    hours = hours > 12 ? hours - 12 : hours;

    //extract minutes from time string
    let minutes = time.split(":")[1];

    return `${date} ${hours}:${minutes}${amPm}`;
};



/**
 *
 * @param {string} a string of 10 digits
 * @returns a human readable formatted phone # string
 */
const phoneNumberFormatter = (phone) => {
    return `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;
};


const phoneNumberValidator = (phone) => {
    
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



module.exports = { 
    timeFormatter, 
    phoneNumberFormatter, 
    phoneNumberValidator,
};