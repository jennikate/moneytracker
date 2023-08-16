import axios from 'axios';

const PostSource = async ({ dataToSubmit, setIsLoading, url }) => {
  console.log('dataToSubmit', dataToSubmit)
  let apiResponse;
  setIsLoading(true);

  try {
    apiResponse = await axios.post(url, dataToSubmit);
  } catch (error) {
    console.log(error);
    apiResponse = { error: true };
  } finally {
    setIsLoading(false);
  }

  return (apiResponse);
};

export default PostSource;
