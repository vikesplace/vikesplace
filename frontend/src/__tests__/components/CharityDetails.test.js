import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CharityDetails from '../../components/CharityDetails';
import { SAMPLE_CHARITY } from '../../testSetup/TestData';


describe('CharityDetails component', () => {
  test('loads page logo 1', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "1"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo 2', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "2"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo 3', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "3"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo 4', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "4"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo 5', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "5"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo 6', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "6"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo 7', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "7"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });

  test('loads page logo unknown', async () => {
    const charity = {
        name: SAMPLE_CHARITY.name,
        funds: SAMPLE_CHARITY.funds,
        numListings: SAMPLE_CHARITY.numListings,
        status: SAMPLE_CHARITY.status,
        endDate: SAMPLE_CHARITY.endDate,
        logoUrl: "12345"        
    };
    render(
        <Router>
          <CharityDetails charity={charity} />
        </Router>
      );

    expect(screen.getByText(SAMPLE_CHARITY.name)).toBeInTheDocument();
  });
});