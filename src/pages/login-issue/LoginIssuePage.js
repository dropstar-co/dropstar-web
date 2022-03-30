import './LoginIssuePage.css';

import React from 'react';

const LoginIssuePage = () => {
  return (
    <>
      <h4 className="page-title">Troubleshoot</h4>
      <h1>Login issue</h1>
      <div>
        <p>
          Currently, DropStar platform login requires <b>Pop-ups</b> and <b>Cookies</b>. We detected
          that your browser is not allowing popups on this site or in any website. To fix this
          issue, there are several things that you can try:
        </p>

        <ul>
          <li>
            If you are on Safari/iOS, use <b>Brave/Chrome/Firefox</b> browser instead
          </li>
          <li>
            If you are on Safari/iOS, allow Pop-ups and Cookies on Safari/iOS.
            <ul>
              <li>
                Go to Settings &gt; Safari &gt; General &gt; Disable <b>Block Pop-ups</b>
              </li>
              <li>
                Go to Settings &gt; Safari &gt; Privacy &amp; Security &gt; Disable{' '}
                <b>Block All Cookies</b>
              </li>
            </ul>
          </li>
          <li>
            If you are on Brave/Chrome/Firefox, check that <b>Cookies</b> and <b>Pop-ups</b> are
            enabled for this site
          </li>
          <li>Check that you are not using a private tab</li>
        </ul>
      </div>
    </>
  );
};

export default LoginIssuePage;
