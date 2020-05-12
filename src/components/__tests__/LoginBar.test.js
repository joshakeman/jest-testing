/**
 * @jest-environment jsdom
 */

import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

jest.mock('axios');

import LoginBar from '../LoginBar'


describe('LoginBar tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoginBar/>, div);
        ReactDOM.unmountComponentAtNode(div)
    });

    it('shows 2 buttons when logged out', () => {
        const loginBar = shallow(<LoginBar/>);
        expect(loginBar.find('.App-logo').length).toBe(1);
        expect(loginBar.find('.App-Button').length).toBe(2)
    });

    it('matches snapshot when logged out', () => {
        const loginBar = shallow(<LoginBar/>);
        expect(loginBar).toMatchSnapshot();
    });

    it('shows only logo when logged in', () => {
        const loginBar = shallow(<LoginBar/>);
        loginBar.setState({...loginBar.state, loggedIn: true});
        expect(loginBar.find('.App-logo').length).toBe(1);
        expect(loginBar.find('.App-Button').length).toBe(0)
    });

    it('matches snapshot when logged in', () => {
        const loginBar = shallow(<LoginBar/>);
        loginBar.setState({...loginBar.state, loggedIn: true});
        expect(loginBar).toMatchSnapshot();
    });



    it('Calls onLogin with proper credentials when login is clicked', async () => {
        // Prepare the test
        const onLoginMock = jest.fn();
        const ok = {data: {user_auth: "OK"}};
        let post = axios.post;
        post.mockImplementation((url, payload) => Promise.resolve(ok));
        let loginBar = shallow(<LoginBar url='' onLogin={onLoginMock}/>).instance();
        loginBar.setState({...loginBar.state, username: 'Bob', password: 'secret'});

        // Make sure all our assertions are actually called and the test doesn't bail out early
        expect.assertions(6);

        // Invoke the code under test - the handleLogin() function - and wait for it to finish
        await loginBar.handleLogin({preventDefault: jest.fn()});

        // Verify axios was called with the proper parameters
        expect(post.mock.calls.length).toBe(1);
        expect(post).toHaveBeenCalledTimes(1);
        const expectedArgs = ['/active_user', {username: 'Bob', password: 'secret'}];
        expect(post).toHaveBeenCalledWith(...expectedArgs);

        // Verify handleLogin() properly called the onLogin() callabck
        expect(onLoginMock.mock.calls.length).toBe(1);
        expect(onLoginMock).toHaveBeenCalledTimes(1);
        expect(onLoginMock).toHaveBeenCalledWith('OK');
    })
});