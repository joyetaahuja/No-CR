export const baseApiURL = () => {
  
  console.log(process.env.REACT_APP_APILINK, "testing");
  return process.env.REACT_APP_APILINK;
};
