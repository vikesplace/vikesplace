import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UsersCard from '../../components/UsersCard';
import { SAMPLE_SELLER } from '../../testSetup/TestData';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UsersCard component', () => {
  let useNavigateMock;

  beforeEach(() => {
    render(
      <Router>
        <UsersCard id={SAMPLE_SELLER.id} username={SAMPLE_SELLER.username} />
      </Router>
    );
  });
  
  test('component links to correct page', async () => {
    useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(jest.fn());

    fireEvent.mouseDown(document);

    waitFor(() => {
        expect(useNavigateMock).toHaveBeenCalledWith('/sellers/'+SAMPLE_SELLER.id);
    });

    jest.clearAllMocks();
  });

});