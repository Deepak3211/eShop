import { useContext } from "react"
import { GlobalState } from "../../../GlobalState"
import { Input } from 'semantic-ui-react';

const Filter = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search,setSearch] = state.productsAPI.search
  
  const handleCategory = (e) => {
    setCategory(e.target.value)
    setSearch('');
}
  return (
    <div className="filter__products">

      <div className="filter__left">
        <span>Filter</span>
        <select className="filter__product" name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          
          {categories.map(category => (
            <option value={"category=" + category._id} key={category._id}>{ category.name}</option>
            
          ))}
        </select>
      </div>
      <div className="search__middle">
       <Input className = 'search__products' icon = "search" placeholder = "Search Product" onChange={e=>setSearch(e.target.value.toLowerCase())}/>
      </div>
      <div className="sort__right">
        <span>Sort By: </span>
        <select className = 'sort__rightProducts'value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Popularity</option>
          <option value="sort=-price">Price: High--Low</option>
          <option value="sort=price">Price: Low--High</option>

          
        </select>
      </div>
    </div>
  )
}

export default Filter
