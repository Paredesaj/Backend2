class ProductDTO {
    constructor({ id, title, code, price, stock, category, thumbnails, status }) {
      this.id = id;
      this.title = title;
      this.code = code;
      this.price = price;
      this.stock = stock;
      this.category = category;
      this.thumbnails = thumbnails;
      this.status = status;
    }
  }
  
  export default ProductDTO;
  