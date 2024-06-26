import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CartActions } from "@/redux/reducers/CartSlice";

interface CartProp{
     remove : ()=> void
}

type state = {
  Cart: { items: []; totalAmount: number; totalQuantity: number };
};

type item = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const Cart:React.FC<CartProp> = ({remove}) => {
  const dispatch = useDispatch();
  const Items = useSelector((state: state) => state.Cart.items);
  const TotalPrice = useSelector((state: state) => state.Cart.totalAmount);

  console.log(Items)
  const AddItem = (data: item) => {
    dispatch(CartActions.AddToCart(data));
  };

  const RemoveItem = (data: string) => {
    dispatch(CartActions.RemoveFromCart(data));
  };

  return (
    <>
      <div
        className={`fixed top-0  inset-0 z-50 overflow-y-auto  left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex  items-center justify-center`}
      >
        <div
          className={`relative  flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
        >
          <div onClick={remove} className="ml-[200px] md:ml-[400px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-2 p-2">
            {Items.length == 0 && <h1>No Items </h1>}
            {Items.map((Item: item) => {
              return (
                <div className="flex justify-between border-b-2">
                  <div className="flex gap-2">
                    <div className="bg-gray-200 aspect-video md:w-[150px] md:mt-0 mt-5 md:h-[150px] w-[80px]  h-[60px] rounded-lg overflow-hidden">
                      <img
                        src={Item.image}
                        alt="photo"
                        className="p-2 w-full h-full"
                      />
                    </div>
                    <div className=" py-6">
                      <h1 className="text-center">{Item.name}</h1>
                      <p className="text-start py-7 ">X {Item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 py-6">
                    <div>
                      <span className="h-6 text-sm">₹ </span>{" "}
                      {Item.price * Item.quantity}
                    </div>
                    <div className="flex gap-2 py-5">
                      <button 
                       onClick={() => {
                        AddItem(Item);
                      }}
                      className="md:text-2xl md:px-4 md:py-2 px-1 py-[0.15rem] border border-black hover:bg-black hover:text-white">
                        +
                      </button>
                      <button
                        onClick={() => {
                          RemoveItem(Item._id);
                        }}
                        className="md:backdrop:text-2xl border-black md:px-4 px-1 py-[0.15rem] md:py-2 border hover:bg-black hover:text-white"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {Items.length > 0 && (
            <>
              <div className="flex justify-center">
                <h1 className="text-xl">
                  Your Total is <span className="h-6">₹ </span> {TotalPrice}
                </h1>
              </div>
              <div className="flex py-2 justify-center gap-2">
                <div>
                  <button className="md:p-3 p-1  md:text-lg bg-lightdark text-black rounded-xl ">
                    Buy Now
                  </button>
                </div>
                <div>
                  <button className="md:p-3 p-1  md:text-lg text-black bg-light  rounded-xl">
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
