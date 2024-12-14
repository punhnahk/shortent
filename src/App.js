import posthog from "posthog-js";
import React from "react";
import UrlShortener from "./components/UrlShortener";

posthog.init("phc_tDi1S6OTLf6Plys9GtibFFzcXniz0Sx1mqrBRQUXUrH", {
  api_host: "https://us.i.posthog.com",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});

function App() {
  return (
    <div>
      <UrlShortener />
    </div>
  );
}

export default App;
