export function generateUsername(firstName = "user") {
    console.log("firstname ", firstName);
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const shortDate = `${day}${month}`; // e.g., 1807 for 18 July
    const random = Math.floor(100 + Math.random() * 900); // 3-digit
    return `${firstName.toLowerCase()}_${shortDate}${random}`;
}
