import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});


// Individual test
it('has an initial room name', () => {
    let app = shallow(<App/>);
    expect(app.state().roomName).toBe('room0');
});

// Tests grouped into a suite
describe('room change tests', () => {
    test('initial room name', () => {
        // Get the instance to access attributes directly
        const app = shallow(<App/>).instance();
        expect(app.state.roomName).toBe('room0')
    });

    test('room change', () => {
        const app = shallow(<App/>).instance();
        expect(app.state.roomName).toBe('room0');
        app.onRoomChange('room1');
        expect(app.state.roomName).toBe('room1');
    });
});

// Tests grouped into a suite with shared setup
describe('room change + beforeEach() tests', () => {
    let app = null;
    beforeEach(() => {
        app = shallow(<App/>).instance();
    });
    it('should have initial room name', () => {
        // Get the instance to access attributes directly
        expect(app.state.roomName).toBe('room0')
    });

    it('should change the room name', () => {
        expect(app.state.roomName).toBe('room0');
        app.onRoomChange('room1');
        expect(app.state.roomName).toBe('room1');
    });
});
