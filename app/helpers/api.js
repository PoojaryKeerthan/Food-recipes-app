import axios from "axios";
import { Cheerio } from "cheerio";

async function scrapeData() {
    const url = 'https://example.com/products';
  
    try {
      const { data } = await axios.get(url);
      const $ = Cheerio.load(data);
  
      const products = [];
      $('.product-item').each((i, el) => {
        const title = $(el).find('.product-title').text().trim();
        const price = $(el).find('.product-price').text().trim();
        products.push({ title, price });
      });
  
      console.log(products);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  