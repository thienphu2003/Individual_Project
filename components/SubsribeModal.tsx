"use client";

import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
  return priceFormat;
};
const SubscribeModal: React.FC<ModalProviderProps> = ({ products }) => {
  const subscribeModel = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModel.onClose();
    }
  };
  const handleCheckOut = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }
    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: sessionId });
    } catch (err) {
      toast.error((err as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };
  let content = <div className="text-center">No Products Available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No Prices Available</div>;
          }
          return product.prices.map((price) => (
            <Button
              onClick={() => handleCheckOut(price)}
              disabled={isLoading || price.id === priceIdLoading}
              key={price.id}
              className="mb-4"
            >{`Subscribe for ${formatPrice(price)} a ${
              price.interval
            }`}</Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already Subscribed</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotit Premium"
      isOpen={subscribeModel.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
