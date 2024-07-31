import '@testing-library/jest-dom/extend-expect';
import AuthService from '../../services/AuthService';
import mockAxios from 'jest-mock-axios';

const API_URL = process.env.REACT_APP_BACK_API;

describe('AuthService', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('login', async () => {
    const authService = new AuthService();

    let catchFn = jest.fn();

    const username = "TestUser";
    const password = "Password1!";
    const withCredentials = true;
    authService.login(username, password)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'login', 
      {username, password}, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('login fails', async () => {
    const authService = new AuthService();

    const username = "TestUser";
    const password = "Password1!";
    const withCredentials = true;
    authService.login(username, password);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'login', 
      {username, password}, 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('logout', async () => {
    const authService = new AuthService();

    authService.logout();
    
    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'logout', 
      {withCredentials});

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);
  });

  test('logout fails', async () => {
    const authService = new AuthService();

    authService.logout();

    const withCredentials = true;
    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'logout', 
      {withCredentials});

    // simulating an error response with empty response
    const err = {
      isAxiosError: true,
    };
    mockAxios.mockError(err);
  });

  test('register', async () => {
    const authService = new AuthService();

    const email = "test@uvic.ca";
    const callback = process.env.REACT_APP_FRONT_URL + "verify-account/";
    authService.register(email);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'request_account', 
      {email, callback}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);
  });

  test('register fails', async () => {
    const authService = new AuthService();

    const email = "test@uvic.ca";
    const callback = process.env.REACT_APP_FRONT_URL + "verify-account/";
    authService.register(email);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'request_account', 
      {email, callback}
    );

    // simulating an error response
    const err = {
      isAxiosError: true,
      response: {
        status: 400,
        statusText: 'Bad request'
      },
    };
    mockAxios.mockError(err);
  });

  test('verify', async () => {
    const authService = new AuthService();

    const jwt = "ThisRepresentsAJWT1234";
    const username = "TestUser";
    const password = "Password1!";
    const location = "V9V9V9";
    authService.verify(jwt, username, password, location);
    
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'verify_account', 
      {jwt, username, password, location}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);
  });

  test('verify fails', async () => {
    const authService = new AuthService();

    const jwt = "ThisRepresentsAJWT1234";
    const username = "TestUser";
    const password = "Password1!";
    const location = "V9V9V9";
    authService.verify(jwt, username, password, location);
    
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'verify_account', 
      {jwt, username, password, location}
    );

    // simulating an error response
    const err = {
      isAxiosError: true,
      response: {
        status: 404,
        statusText: 'Not found'
      },
    };
    mockAxios.mockError(err);
  });

  test('request password change', async () => {
    const authService = new AuthService();

    const email = "test@uvic.ca";
    const callback = process.env.REACT_APP_FRONT_URL + "password-update/";
    authService.requestPasswordChange(email);
    
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'request_reset', 
      {email, callback}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);
  });

  test('request password change fails', async () => {
    const authService = new AuthService();

    const email = "test@uvic.ca";
    const callback = process.env.REACT_APP_FRONT_URL + "password-update/";
    authService.requestPasswordChange(email);
    
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'request_reset', 
      {email, callback}
    );

    // simulating an error response
    const err = {
      isAxiosError: true,
      response: {
        status: 501,
        statusText: 'Not implemented'
      },
    };
    mockAxios.mockError(err);
  });

  test('complete password change', async () => {
    const authService = new AuthService();

    const jwt = "ThisRepresentsAJWT1234";
    const password = "Password1!";
    authService.completePasswordChange(jwt, password);
    
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'verify_reset', 
      {jwt, password}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);
  });

  test('complete password change fails', async () => {
    const authService = new AuthService();

    const jwt = "ThisRepresentsAJWT1234";
    const password = "Password1!";
    authService.completePasswordChange(jwt, password);
    
    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'verify_reset', 
      {jwt, password}
    );

    // simulating an error response
    const err = {
      isAxiosError: true,
      response: {
        status: 500,
        statusText: 'Internal Error'
      },
    };
    mockAxios.mockError(err);
  });
});