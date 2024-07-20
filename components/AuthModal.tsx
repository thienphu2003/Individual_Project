"use client";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeMinimal, ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect, useState } from "react";
const AuthModal = () => {
  const { onClose, isOpen, isOpenForSignUp } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [onClose, router, session]);
  return isOpenForSignUp ? (
    <Modal
      title="Welcome back"
      description="Sign up for an account"
      isOpen={isOpenForSignUp}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["github", "google", "facebook"]}
        magicLink
        view="sign_up"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      ></Auth>
    </Modal>
  ) : (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["github", "google", "facebook"]}
        magicLink
        view="sign_in"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      ></Auth>
    </Modal>
  );
};

export default AuthModal;
