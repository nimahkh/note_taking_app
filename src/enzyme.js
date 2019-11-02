import Enzyme, { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
export { shallow, mount, render };
export default Enzyme;
