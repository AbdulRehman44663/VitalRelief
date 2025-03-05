import useStore from "@/store";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function withAuth(WrappedComponent, options = {}) {
  return function AuthComponent(props) {
    const router = useRouter();
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const [loading, setLoading] = useState(true);

    const {
      requireAuth = true,
      publicAccess = false,
      redirectAuthenticatedTo = "/",
      redirectUnauthenticatedTo = "/",
    } = options;

    useEffect(() => {
      const timer = setTimeout(() => {
        if (requireAuth && !isAuthenticated) {
          router.push(redirectUnauthenticatedTo);
        } else if (!requireAuth && isAuthenticated && !publicAccess) {
          router.push(redirectUnauthenticatedTo);
        } else {
          setLoading(false);
        }
        // else if (
        //   !requireAuth &&
        //   isAuthenticated &&
        //   redirectAuthenticatedTo !== router.pathname
        // ) {
        //   router.push(redirectAuthenticatedTo);
        // } else {
        //   setLoading(false);
        // }
        // setLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }, [isAuthenticated, requireAuth, router]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-svh loader-container">
          <Spin size="large" />
        </div>
      );
    }

    // Only render the component if the authentication state matches the requirement
    if (
      (requireAuth && isAuthenticated) ||
      (!requireAuth && !isAuthenticated) ||
      publicAccess
    ) {
      return <WrappedComponent {...props} />;
    }

    // return null;
  };
}
