import '@testing-library/jest-dom/extend-expect';
import DataService from '../../services/DataService';
import mockAxios from 'jest-mock-axios';

const API_URL = process.env.REACT_APP_BACK_API;

describe('AuthService', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('create listing', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const title = "Listing Title";
    const price = 6.54;
    const location = "V9V9V9";
    const status = "AVAILABLE";
    const category = "ELECTRONICS";
    const forCharity = false;
    const withCredentials = true;
    dataService.createListing(title, price, location, category, forCharity)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'listings', 
      {title, price, location, status, category, forCharity}, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('create listing fails', async () => {
    const dataService = new DataService();

    const title = "Listing Title";
    const price = 6.54;
    const location = "V9V9V9";
    const status = "AVAILABLE";
    const category = "ELECTRONICS";
    const forCharity = false;
    const withCredentials = true;
    dataService.createListing(title, price, location, category, forCharity);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'listings', 
      {title, price, location, status, category, forCharity},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('update listing', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const title = "Listing Title";
    const price = 6.54;
    const location = "V9V9V9";
    const status = "SOLD";
    const buyerUsername = "Testuser";
    const forCharity = false;
    const withCredentials = true;
    dataService.updateListing(id, title, price, location, status, buyerUsername, forCharity)
        .catch(catchFn);

    expect(mockAxios.patch).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {title, price, location, status, buyerUsername, forCharity}, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('update listing fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const title = "Listing Title";
    const price = 6.54;
    const location = "V9V9V9";
    const status = "SOLD";
    const buyerUsername = "Testuser";
    const forCharity = false;
    const withCredentials = true;
    dataService.updateListing(id, title, price, location, status, buyerUsername, forCharity);

    expect(mockAxios.patch).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {title, price, location, status, buyerUsername, forCharity}, 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('delete listing', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const withCredentials = true;
    dataService.deleteListing(id)
        .catch(catchFn);

    expect(mockAxios.delete).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('delete listing fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const withCredentials = true;
    dataService.deleteListing(id);

    expect(mockAxios.delete).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get sorted listings', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const minPrice = 1;
    const maxPrice = 100; 
    const status = "AVAILABLE";
    const sortBy = "price";
    const isDescending = false; 
    const pullLimit = 10;
    const pageOffset = 2;
    const withCredentials = true;
    dataService.getSortedListings(minPrice, maxPrice, status, sortBy, isDescending, pullLimit, pageOffset)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings?pullLimit=' + pullLimit + '&pageOffset=' + pageOffset + '&minPrice=' + 
      minPrice + '&maxPrice=' + maxPrice + '&status=' + status + '&sortBy=' + sortBy + '&isDescending=' + isDescending, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get sorted listings fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getSortedListings();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings?', 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get listing', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const withCredentials = true;
    dataService.getListing(id)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get listing fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const withCredentials = true;
    dataService.getListing(id);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/' + id, 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get seller listing', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getSellerListings();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/me', 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

  });

  test('get seller listing fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getSellerListings();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'listings/me', 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('update user', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const location = "V9V9V9"
    const withCredentials = true;
    dataService.updateUserData(location)
        .catch(catchFn);

    expect(mockAxios.patch).toHaveBeenCalledWith(API_URL + 'users/me',
      {location}, 
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('update user fails', async () => {
    const dataService = new DataService();

    const location = "V9V9V9"
    const withCredentials = true;
    dataService.updateUserData(location);

    expect(mockAxios.patch).toHaveBeenCalledWith(API_URL + 'users/me',
      {location}, 
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get my user data', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const withCredentials = true;
    dataService.getMyUserData()
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/me',
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get my user data fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getMyUserData();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/me',
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get user data', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 5;
    const withCredentials = true;
    dataService.getUserData(id)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/' + id,
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get user data fails', async () => {
    const dataService = new DataService();

    const id = 5;
    const withCredentials = true;
    dataService.getUserData(id);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/' + id,
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get my user search data', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const withCredentials = true;
    dataService.getUserSearchHistory()
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/me/searches',
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get my user search data fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getUserSearchHistory();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'users/me/searches',
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('search', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const query = "laptop";
    const withCredentials = true;
    dataService.search(query)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'search?search=' + query,
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('search fails', async () => {
    const dataService = new DataService();

    const query = "laptop";
    const withCredentials = true;
    dataService.search(query);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'search?search=' + query,
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get reviews', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const withCredentials = true;
    dataService.getReviews(id)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'review/' + id,
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get reviews fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const withCredentials = true;
    dataService.getReviews(id);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'review/' + id,
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get ratings', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const withCredentials = true;
    dataService.getRatings(id)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'rating/' + id,
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get ratings fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const withCredentials = true;
    dataService.getRatings(id);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'rating/' + id,
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('create review', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const reviewContent = "Works great!";
    const withCredentials = true;
    dataService.createReview(id, reviewContent)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'review/' + id,
      {reviewContent},
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('create review fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const reviewContent = "Works great!";
    const withCredentials = true;
    dataService.createReview(id, reviewContent);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'review/' + id,
      {reviewContent},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('create rating', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const ratingValue = 5;
    const withCredentials = true;
    dataService.createRating(id, ratingValue)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'rating/' + id,
      {ratingValue},
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('create rating fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const ratingValue = 5;
    const withCredentials = true;
    dataService.createRating(id, ratingValue);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'rating/' + id,
      {ratingValue},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get recommendations', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const withCredentials = true;
    dataService.getRecommendations()
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'recommendations',
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get recommendations fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getRecommendations();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'recommendations',
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('ignore recommendation', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 21;
    const ignore = true;
    const withCredentials = true;
    dataService.ignoreRecommendation(id)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'recommendations/' + id + '/ignore',
      {ignore},
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('ignore recommendation fails', async () => {
    const dataService = new DataService();

    const id = 21;
    const ignore = true;
    const withCredentials = true;
    dataService.ignoreRecommendation(id);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'recommendations/' + id + '/ignore',
      {ignore},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get chats', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const withCredentials = true;
    dataService.getChats()
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'messages/chats',
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get chats fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getChats();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'messages/chats',
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('create new chat', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const listingId = 21;
    const withCredentials = true;
    dataService.createChat(listingId)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'chats/',
      {listingId},
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('create new chat fails', async () => {
    const dataService = new DataService();

    const listingId = 21;
    const withCredentials = true;
    dataService.createChat(listingId);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'chats/',
      {listingId},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get chat messages', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 101;
    const withCredentials = true;
    dataService.getChatMessages(id)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'messages/' + id,
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get chat messages fails', async () => {
    const dataService = new DataService();

    const id = 101;
    const withCredentials = true;
    dataService.getChatMessages(id);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'messages/' + id,
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get chat information', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 101;
    const withCredentials = true;
    dataService.getChatInformation(id)
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'chats/' + id,
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get chat information fails', async () => {
    const dataService = new DataService();

    const id = 101;
    const withCredentials = true;
    dataService.getChatInformation(id);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'chats/' + id,
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('send message', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const id = 101;
    const content = "Is this available?";
    const withCredentials = true;
    dataService.sendMessage(id, content)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'messages/' + id,
      {content},
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('send message fails', async () => {
    const dataService = new DataService();

    const id = 101;
    const content = "Is this available?";
    const withCredentials = true;
    dataService.sendMessage(id, content);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'messages/' + id,
      {content},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('create charity', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const name = "Next Charity"; 
    const status = "OPEN";
    const fund = 0;
    const logo_url = "testing"; 
    const end_date = "2024-08-21";
    const num_listings = 0;
    const withCredentials = true;
    dataService.createCharity(name, logo_url, end_date)
        .catch(catchFn);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'charity',
      {name, status, fund, logo_url, end_date, num_listings},
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('create charity fails', async () => {
    const dataService = new DataService();

    const name = "Next Charity"; 
    const status = "OPEN";
    const fund = 0;
    const logo_url = "testing"; 
    const end_date = "2024-08-21";
    const num_listings = 0;
    const withCredentials = true;
    dataService.createCharity(name, logo_url, end_date);

    expect(mockAxios.post).toHaveBeenCalledWith(API_URL + 'charity',
      {name, status, fund, logo_url, end_date, num_listings},
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });

  test('get charities', async () => {
    const dataService = new DataService();

    let catchFn = jest.fn();

    const withCredentials = true;
    dataService.getCharities()
        .catch(catchFn);

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'charity',
      {withCredentials}
    );

    // simulating a server response
    let responseObj = { status: 200 };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  });

  test('get charities fails', async () => {
    const dataService = new DataService();

    const withCredentials = true;
    dataService.getCharities();

    expect(mockAxios.get).toHaveBeenCalledWith(API_URL + 'charity',
      {withCredentials}
    );

    // simulating an non-axios error response
    const err = new Error('Fake Error');
    mockAxios.mockError(err);
  });
});