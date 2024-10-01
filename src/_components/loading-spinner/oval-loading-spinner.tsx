import { Oval } from "react-loader-spinner";

// COMPONENT: 로딩스피너
export default function OvalLoadingSpinner() {
  return (
    <Oval
      visible={true}
      height="40"
      width="40"
      color="blue"
      secondaryColor="blue"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
