const bcrypt = require('bcrypt'); 

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async (pw, hashPassword) => {
    const result =await bcrypt.compare(pw, hashPassword);
    if (result) {
        console.log("Login successful")
    } else {
        console.log("Incorrect")
    }
}

// hashPassword('dunce');

login('dunce', '$2b$12$lz6UadqA19OmU8Mhl7.sZuVPIFsg2nqUXmqV/EXYXke9O8zvG86cG')

// $2b$12$rdT4T1I4ZskLu3HU2Z9jFOAe2Giu0zaZvGJ2e5czh1.A3VQyel7eq