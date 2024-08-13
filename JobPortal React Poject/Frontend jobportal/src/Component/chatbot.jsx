import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Create and append the Botpress script
    const botpressScript = document.createElement('script');
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    // Create and append the Botpress config script
    const configScript = document.createElement('script');
    configScript.src = "https://mediafiles.botpress.cloud/9cc91e69-1739-4614-bc6e-4d5035c29992/webchat/v2/config.js";
    configScript.async = true;
    document.body.appendChild(configScript);

    // Cleanup function to remove scripts when the component unmounts
    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(configScript);
    };
  }, []);

  return null; 
};

export default Chatbot;
