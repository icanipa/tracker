export default function handler(req, res) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const time = new Date().toISOString();

    // Log the data (you can use a database instead of console.log)
    console.log(`IP: ${ip} | Time: ${time} | User-Agent: ${userAgent}`);

    // Redirect to the target website
    res.writeHead(302, { Location: "https://destination.com" });
    res.end();
}