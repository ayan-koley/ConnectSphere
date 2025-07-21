import { IPinfoWrapper } from "node-ipinfo";

const ipinfo = new IPinfoWrapper(process.env.IPINFO_TOKEN);

export const IP = async(req, res, next) => {
    const ip =  req.headers['x-forwarded-for']?.split(",")[0] ||
                req.socket?.remoteAddress ||
                req.connection?.remoteAddress;
    // find location
    const geoLocation = await Promise.resolve(ipinfo.lookupIp(ip))
    .then((resolve) => resolve)
                        .catch((err) => {
                            console.error(err.message); 
                            req.coordinates = null;
                            return next()
                        });
    const [ latitude, longitude ] = geoLocation.loc.split(",")
    req.coordinates = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
    }
    next();
}