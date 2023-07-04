import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AnalyticsList from "./components/AnalyticsList";
import CreateAnalytics from "./components/CreateAnalytics";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-nav mr-auto flex-row">
            <Link to="/" className="nav-link">
              Analytics
            </Link>
            <Link to="/create-analytics" className="nav-link">
              Create Analytics
            </Link>                     
          </div>
        </nav>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<AnalyticsList />} />
            <Route path="/create-analytics" element={<CreateAnalytics />} />            
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
