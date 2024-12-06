export const TruncateText = (text, maxLength) => {
    if (text != undefined && text.length > maxLength) {
      return text.substring(0, maxLength) + '..';
    }
    return text;
  };

export const getToken = () => {
    return localStorage.getItem('token');
}