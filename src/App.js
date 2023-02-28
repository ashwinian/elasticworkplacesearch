import React from "react";
import WorkplaceSearchAPIConnector from "@elastic/search-ui-workplace-search-connector";
import {
  SearchProvider,
  SearchBox,
  Results,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import { EuiIcon } from '@elastic/eui';
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { useHistory } from "react-router-dom";

const renderInput = ({ getAutocomplete, getInputProps, getButtonProps }) => {
  return (
      <div className="search-box">
          <input
              {...getInputProps({
                  className: "search-box__input",
                  placeholder: "Search by text"
              })}
          />
          {getAutocomplete()}
      </div>
  )
}

const connector = new WorkplaceSearchAPIConnector({
  kibanaBase: "https://ultimate-se.kb.westeurope.azure.elastic-cloud.com:9243",
  enterpriseSearchBase: "https://ultimate-se.ent.westeurope.azure.elastic-cloud.com",
  redirectUri: "http://localhost:3000",
  clientId: "b6e345ce67fe4b2a0a7fbf41e0c135ac4813b9d6d2538ff0f67d5788442f0c13"
});

const config = {
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};


export default function WorkplaceSearch() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ authorizeUrl, isLoggedIn, logout }) => ({
          authorizeUrl,
          isLoggedIn,
          logout
        })}
      >
        {({ authorizeUrl, isLoggedIn, logout }) => {
          return (
            <div>
              {isLoggedIn ? (
                <button onClick={logout}>Log out</button>
              ) : (
                <a href={authorizeUrl}>Log in</a>
              )}
              <Layout
                header={<SearchBox 
                  searchAsYouType={true}
                  inputView={renderInput}
                  autocompleteSuggestions={{
                    sectionTitle: "Suggested Queries"
                }}
                />}
                bodyContent={<Results />}
                bodyFooter={<Paging />}
              />
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}