const axiosPayload = (url, data, method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("dstoken")} `,
    },
    url,
    data,
  };
};

export const axiosFormDataType = (url, data, method) => {
  return {
    method: method,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("dstoken")} `,
    },
    url,
    data,
  };
};

export default axiosPayload;
