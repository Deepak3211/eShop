import { useContext } from "react"
import { GlobalState } from "../../../GlobalState"
import { Button } from 'semantic-ui-react';
const LoadMore = () => {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;
  return (
    <div className="load__more">
      {
     result<page *5 ? "": <Button size = 'massive' className ='load__moreBtn' color = 'instagram' onClick={() =>setPage(page + 1)}>Load More</Button>
      }
      
    </div>
  )
}

export default LoadMore
