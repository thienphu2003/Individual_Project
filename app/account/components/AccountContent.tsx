"use client";

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, user, subscription } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, router, isLoading]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({ url: "/api/create-portal-link" });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error)?.message);
      }
      setLoading(false);
    }
  };
  return (
    <div className="mn-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No Active Plan</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>${subscription?.prices?.products?.name}</b> plan
          </p>
          <Button
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
            disabled={loading || isLoading}
          >
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
