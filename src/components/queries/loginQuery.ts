
export function LOGIN_USER (username: string,password: string){
  const loginUser = `
  mutation LogIn($username: String!, $password: String!) {
    logIn(input: {
      username: $username
      password: $password
    }) {
      viewer {
        user {
          objectId
          username
        }
        sessionToken
      }
    }
  }
  `;


  const LOGIN_QUERY = {
    operationName: "LogIn",
    query: loginUser,
    variables:{
      username: username,
      password: password
    }
  };


  return LOGIN_QUERY;
}

