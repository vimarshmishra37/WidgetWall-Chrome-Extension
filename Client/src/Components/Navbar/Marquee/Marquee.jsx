/* eslint-disable react/prop-types */
import MarqueeItem from "./MarqueeItem";

const Marquee = ({text}) => {
  return (
    // <div className="container">
      <MarqueeItem text={text} from={"-50%"} to={"400%"} />
    // </div>
  );
};

export default Marquee;