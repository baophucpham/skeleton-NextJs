import { STORAGE_KEY } from "@/constants";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define the type for the component props
interface WithAuthProps {
  // You can add additional props here if needed
}

// HOC for protecting pages
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P & WithAuthProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

      if (!token) {
        router.push("/user/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <Spin size='large' />
        </div>
      );
    }

    // Render the wrapped component with the passed props
    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
