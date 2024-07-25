/* eslint-disable react/prop-types */
import MarqueeItem from "./MarqueeItem";

const Marquee = ({text}) => {
  return (
      <MarqueeItem text={text} from={"-50%"} to={"400%"} />
  );
};

export default Marquee;