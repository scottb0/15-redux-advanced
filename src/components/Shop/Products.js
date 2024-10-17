import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT_DATA = [
    {
        id: 1,
        price: 6,
        title: 'Pie',
        description: 'Steak Pie'
    },
    {
        id: 2,
        price: 3,
        title: 'Chips',
        description: 'Plate of Chips'
    }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
          {DUMMY_PRODUCT_DATA.map(
              product => <ProductItem key={product.id}
                                      id={product.id}
                                      title={product.title}
                                      price={product.price}
                                      description={product.description}/>)}
      </ul>
    </section>
  );
};

export default Products;
