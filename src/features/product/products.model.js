import { UserModel } from "../Users/users.model.js"; 
export default class ProductModel{
    constructor(
        
        name,
        desc,
        imageUrl,
        category,
        price,
        size,
        id
    ){
        
        this.name=name;
        this.desc=desc;
        this.imageUrl=imageUrl;
        this.category=category;
        this.price=price;
        this.size=size;
        this._id=id;
    }
//     static GetAll(){
//         return products;
//     }
//     static add(product){
//         product.id=products.length+1;
//         products.push(product);
//         return product;
//     }

//     static get(id){
//         const product=products.find((p)=>p.id==parseInt(id));
//         return product;
//     }

//     static filter(minPrice,maxPrice,category){
//         const result=products.filter((product)=>{
//            return ((!minPrice || product.price>=minPrice) && 
//         (!maxPrice || product.price<=maxPrice) &&
//     (!category || product.category==category));
//         });
//         return result;
//     }


//     static rateProduct(userID,productID,rating){
//       const user=UserModel.getAll().find((u)=>u.id==userID);

//       if(!user){
//         return 'User not Found';
//       }

//       const product=products.find((p)=>p.id==productID);

//       if(!product){
//         return 'Product not found';
//       }

//       if(!product.ratings){
//         product.ratings=[];
//         product.ratings.push({
//           userID:userID,
//           rating:rating
//         });
//       }else{
//         const existingRatingIndex=product.ratings.findIndex((r)=>r.userID==userID);

//         product.ratings[existingRatingIndex]=({
//           userID:userID,
//           rating:rating
//         });
//       }
//     }
 }


// var products = [
//   new ProductModel(
//     1,
//     'Product 1',
//     'Description for Product 10',
//     'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
//     'category1',
//     19.99,
//     ['S','M']
    
//   ),
//   new ProductModel(
//     2,
//     'Product 2',
//     'Description for Product 2',
//     'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
//     'category2',
//     29.99,
//     ['M','XL'],
//   ),
//   new ProductModel(
//     3,
//     'Product 3',
//     'Description for Product 3',
//     'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
//     'category3',
//     39.99,
//     ['M','XL','S']

//   ),
// ];