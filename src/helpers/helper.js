export const capitalizeFirstLetter = (str) => {
    return str && str
    .split(' ') // Split the string by spaces into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(' '); // Join the words back into a single string
  };
export const  isJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
export const limitText = (text, maxLength) => {
  if (text && text.length <= maxLength) return text;
  return text ?  text.slice(0, maxLength) + '...':'';
};

export const stripHtmlTags = (inputString) =>{
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputString, 'text/html');
  return doc.body.textContent || "";
}

export const calculateReadTime = (blogText) =>{
  if (!blogText || typeof blogText !== "string") return "Invalid text";

  const wordsPerMinute = 200; // Average reading speed
  const words = blogText.split(/\s+/).filter(word => word.length > 0); // Split by spaces and filter out empty strings
  const wordCount = words.length;

  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute); // Round up to the nearest minute
  return `${readTimeMinutes} min read`;
}

export const  formatBlogDate =(date) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  return formattedDate.replace(',', ''); // Removes the comma after the month
}

export const getBlogTags =(tags) =>{
  return tags.split(',').map(tag => tag.trim());
}

export const getIconID =(type) =>{
  switch (type) {
    case 'STANDARD':
      return 5;
      break;
     case 'PREMIUM':
      return 4;
      break;
    case 'PRIME':
      return 3;
      break;
    case 'REGULAR':
      return null;
      break;
    case 'EXCLUSIVE':
      return 2;
      break;
    case 'ELITE':
      return 1;
      break;
 
  }
}