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
          that your browser is not allowing popups on this site. To fix this issue, there are
          several things that you can try:
        </p>

        <ul>
          <li>
            If you are on Safari/iOS, use <b>Brave/Chrome/Firefox</b> browser instead
          </li>
          <li>
            If you are on Safari/iOS, allow Pop-ups and Cookies on Safari/iOS.
            <ul>
              <li>
                Go to iOS Settings{' '}
                <img
                  width="32px"
                  height="32px"
                  src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Settings.png"
                />{' '}
                &gt; Search Safari{' '}
                <img
                  width="32px"
                  height="32px"
                  src="https://km.support.apple.com/resources/sites/APPLE/content/live/IMAGES/0/IM26/en_US/safari-120.png"
                />{' '}
                &gt; General &gt; Disable <b>Block Pop-ups</b>
              </li>
              <li>
                Go to iOS Settings{' '}
                <img
                  width="32px"
                  height="32px"
                  src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/app_icons/Settings.png"
                />{' '}
                &gt; Search Safari{' '}
                <img
                  width="32px"
                  height="32px"
                  src="https://km.support.apple.com/resources/sites/APPLE/content/live/IMAGES/0/IM26/en_US/safari-120.png"
                />{' '}
                &gt; Privacy &amp; Security &gt; Disable <b>Block All Cookies</b>
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
