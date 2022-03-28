export const BASE_URL =
  process.env.REACT_APP_NODE_ENV !== 'production'
    ? `${process.env.REACT_APP_DEV_LINK}`
    : `${process.env.REACT_APP_PROD_LINK}`;
