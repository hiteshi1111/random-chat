export function formatTimestamp(timestamp, type){
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

export const formatDateForMessage = (date) => {
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, '0');
    const day = String(date?.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const isToday = (inputDate) => {
    const today = new Date();
    return formatDateForMessage(today) === formatDateForMessage(inputDate);
}

export const isYesterday = (inputDate) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return formatDateForMessage(yesterday) === formatDateForMessage(inputDate);
}