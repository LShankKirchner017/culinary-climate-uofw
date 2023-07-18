async function getTastyApi() {
const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
const options = {
method: 'GET',
headers: {
    'X-RapidAPI-Key': '1b0bb19499msh05d0b2dc53cd501p14c09bjsnefe3bf5139b3',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}