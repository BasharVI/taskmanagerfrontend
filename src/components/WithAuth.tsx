import React, { useEffect } from "react";
import { useRouter } from "next/router";

const WithAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const Router = useRouter();
    const user =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!user || !token) {
        Router.push("/login");
      } else {
        Router.push("/");
      }
    }, [Router, user, token]);

    return user && token ? <WrappedComponent {...props} /> : null;
  };

  AuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default WithAuth;
