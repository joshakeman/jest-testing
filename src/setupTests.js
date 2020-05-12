/* Global initialization for tests

See: https://github.com/Bloblblobl/rumble-react/blob/master/README2.md#initializing-test-environment

*/
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Add mock scrollIntoView because jsdom doesn't have it
// See: https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = function() {};