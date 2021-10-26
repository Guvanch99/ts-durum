import {FC} from "react";
import { ListView, GridView } from '..'

import {useAppSelector} from "../../hooks/useAppSelector";

import './index.scss'


const ProductsList:FC<{view:boolean}> = ({ view }) => {
  //TODO
  const allProducts = useAppSelector(state => state.menu.filteredProducts)

  const ViewBar = view ? ListView : GridView

  return <ViewBar products={allProducts} />
}

export default ProductsList
