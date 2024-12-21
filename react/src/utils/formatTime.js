export function formatTime(timestamp, type){
    if (!timestamp) return ''; 
    if (type === "time"){
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(new Date(timestamp));
    }
    if (type === "day"){
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(new Date(timestamp));
    }
    if (type === "both"){
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(new Date(timestamp));
    }
}