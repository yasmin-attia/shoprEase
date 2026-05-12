import { useEffect, useState } from "react";
import { API } from "../../../apis/API";
import { errorhandeler } from "../../../utills/errorHandle";
import CartSection from "../../../components/Carts/CartSection";

export default function Carts() {
  const [carts, setCarts] = useState([]);

  //fetch userss
  useEffect(function () {
    async function fetchCarts() {
      try {
        const response = await API.get(`/Carts`);
        //    console.log(response.data);
        setCarts(response.data.carts);
      } catch (error) {
        errorhandeler(error);
      }
    }
    fetchCarts();
  }, []);

  return (
    <>
      <div>
        <CartSection carts={carts} />
      </div>
    </>
  );
}
