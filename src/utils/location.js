export const getDeviceLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject({ code: 'unsupported' });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const areaName = await reverseGeocode(latitude, longitude);
                    resolve({ latitude, longitude, areaName });
                } catch (error) {
                    resolve({ latitude, longitude, areaName: '' });
                }
            },
            (error) => {
                const code = error.code === 1 ? 'denied' : error.code === 2 ? 'unavailable' : error.code === 3 ? 'timeout' : 'unknown';
                reject({ code });
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
        );
    });
};

const reverseGeocode = async (lat, lon) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=id`
    );
    if (!response.ok) throw new Error('Reverse geocoding failed');
    const data = await response.json();
    const address = data.address || {};
    return (
        address.suburb ||
        address.neighbourhood ||
        address.city_district ||
        address.district ||
        address.city ||
        address.town ||
        address.village ||
        ''
    );
};
