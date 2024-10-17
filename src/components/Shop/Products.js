import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title='Pie'
          price={6}
          description='Steak Pie'
        />
          <ProductItem
              title='Chips'
              price={3}
              description='Plate of Chips'
          />
      </ul>
    </section>
  );
};

export default Products;
