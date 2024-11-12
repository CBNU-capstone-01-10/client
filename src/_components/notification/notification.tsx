// COMPONENT: 주의 알림창
import { notification } from "antd";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { AlertFilled } from "@ant-design/icons";

const GlobalNotificationStyle = createGlobalStyle`
  .ant-notification-notice {
      background-color: ${({ theme }) => theme.transparentCautionBgColor};
      box-shadow:  rgba(13, 38, 76, 0.19) 0px 9px 20px;
      overflow: hidden;
    }
`;
interface INotificationBannerProps {
  key: string;
  message: string;
  description: string;
}
export default function Notification({
  key,
  message,
  description,
}: INotificationBannerProps) {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (message && description) {
      api.open({
        key,
        message,
        description,
        duration: 3,
        placement: "bottom",
        icon: <AlertFilled style={{ color: "white" }} />,
      });

      return () => {
        api.destroy(key);
      };
    }
  }, [key, api, message, description]);

  return (
    <>
      <GlobalNotificationStyle />
      {contextHolder}
    </>
  );
}
