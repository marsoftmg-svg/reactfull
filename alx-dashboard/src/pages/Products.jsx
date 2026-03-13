import { useDispatch, useSelector } from 'react-redux';
import {
  setFilter, setSort, setSearch, selectFilteredProducts
} from '../store/productsSlice';

const CATEGORIES = ['all', 'Elektronika', 'Odziez', 'Dom i ogrod', 'Sport'];

function Products() {
  const dispatch  = useDispatch();
  const products  = useSelector(selectFilteredProducts);  // memoized selector
  const { filterCategory, sortBy, sortDir, searchQuery } =
    useSelector(s => s.products);
 
  const handleSort = col => {
    dispatch(setSort({
      sortBy:  col,
      sortDir: sortBy === col && sortDir === 'asc' ? 'desc' : 'asc',
    }));
  };

return (
    <div className='page'>
      <h1>Produkty</h1>
      <div className='controls'>
        <input
          placeholder='Szukaj produktu...'
          value={searchQuery}
          onChange={e => dispatch(setSearch(e.target.value))}
          className='search-input'
        />
        <div className='filter-tabs'>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={filterCategory === cat ? 'active' : ''}
              onClick={() => dispatch(setFilter(cat))}
            >
              {cat === 'all' ? 'Wszystkie' : cat}
            </button>
          ))}
        </div>
      </div>
      <table className='data-table'>
        <thead>
            <tr>
            {['name','category','price','stock','sold'].map(col => (
              <th key={col} onClick={() => handleSort(col)}>
                {col} {sortBy === col ? (sortDir === 'asc' ? '🔼' : '🔽') : ''}
              </th>
            ))}
            </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
                <td>{p.name}</td>
                <td><span className='badge-cat'>{p.category}</span></td>
                <td>{p.price.toLocaleString()} PLN</td>
                <td>{p.stock}</td>
                <td>{p.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
)
}

export default Products;