import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getSingleProductList } from "../../../redux/action/productAction";
import { Params, useParams } from "react-router-dom";
import LazyLoadImage from "../../../reusable/LazyLoadImage";
import { CartType } from "../../../component/enums/enum";
import Loader from "../../../component/Loader/Loader";

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const routes = useParams<Params<any>>();
  const { singleProduct,loading } = useAppSelector((state) => state.product);
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getSingleProductList(routes?.id as string));
  }, [dispatch, routes?.id]);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  const addToCart = (data: any) => {
    dispatch({
        type: CartType.ADD_CART,
        payload: { data }
    })
}

const changeQty = (_id: string, quantity: number) => {
    if (quantity < 1) {
        dispatch({
            type: CartType.REMOVE_CART,
            payload: {
                _id
            }
        })
    } else {
        dispatch({
            type: CartType.CHANGE_QUANTITY,
            payload: { _id, quantity }
        })
    }
}

  const { _id, prodImg, prodName, brandName, categoryName, sellingPrice, isPrescription } :any =
    singleProduct;

  return (
    loading ? (
		<Loader />
	) :
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Container for Product Information */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        
        {/* Product Image */}
        <div className="md:w-1/2 p-6 flex justify-center">
          <LazyLoadImage
            src={prodImg?.url}
            alt={prodName}
            className="rounded-lg w-64 h-64 object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl max-sm:text-xl font-semibold text-gray-800">{prodName}</h1>
            <p className="text-xl max-sm:text-sm text-gray-500 mt-2">{brandName}</p>
            <p className="text-sm text-gray-400 mt-1">Category: {categoryName}</p>
            <p className="text-2xl max-sm:text-xl text-gray-700 mt-4">Price: ₹{sellingPrice}</p>
            {isPrescription && (
              <p className="text-sm text-red-500 mt-2">
                * Prescription Required
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="w-full">
								{cart?.find((c) => c?._id === _id) ? (
									cart?.map((c) =>
										c?._id === _id ? (
											<div key={c?._id} className="flex justify-between items-center">
												<button
													onClick={() => changeQty(c?._id, c?.quantity - 1)}
													className="bg-primary w-[45px] h-[30px]  rounded-tl-md  rounded-bl-md text-white text-center"
												>
													-
												</button>
												<input
													type="text"
													value={c?.quantity}
													className="border text-center w-full outline-none h-[30px] border-primary"
												/>
												<button
													onClick={() => changeQty(c?._id, c?.quantity + 1)}
													className="bg-primary w-[45px] h-[30px]  rounded-tr-md  rounded-br-md text-white text-center"
												>
													+
												</button>
											</div>
										) : null
									)
								) : (
									<button
										onClick={() => addToCart(singleProduct)}
										className="bg-primary w-full mt-2 px-6 py-2 rounded-md text-white text-center"
									>
										+ Add To Cart
									</button>
								)}
							</div>
        </div>
      </div>

      {/* Extra Content */}
      <div className="mt-12 w-full max-w-4xl">
        {/* Product Description */}
        <h2 className="text-2xl font-semibold text-gray-800">Product Description</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. 
          Praesent volutpat velit nec metus mattis, id pulvinar lacus dictum. Fusce vehicula dapibus massa, 
          at gravida ante placerat in. Donec non libero in tortor fringilla finibus.
        </p>

        {/* Usage Instructions */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Usage Instructions</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">
          Aliquam erat volutpat. Suspendisse potenti. Nullam ac justo efficitur, feugiat purus id, aliquet nunc. 
          Suspendisse ut purus et lacus auctor fermentum sit amet vel tortor. Cras aliquam nibh vel risus commodo 
          suscipit. Vivamus euismod justo eget tellus pretium, eu tempor mi aliquet.
        </p>

        {/* Customer Reviews */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Customer Reviews</h2>
        <div className="text-gray-600 mt-2 leading-relaxed">
          <p>"Great product! Highly recommended." - John Doe</p>
          <p>"Works as expected. Excellent value for money." - Jane Smith</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
