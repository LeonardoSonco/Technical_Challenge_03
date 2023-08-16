export function REGISTER_USER(username:string,password:string,email:string) {
  const registerUser = `
    mutation SignUp($username: String!, $password: String!,$email: String!){
      signUp(input: {
        fields: {
          username: $username
          password: $password
          email: $email,
          
        }
      }){
        viewer{
          user{
            objectId
            username
            email
            createdAt
          }
          sessionToken
        }
      }
    }
`;

  const REGISTER_QUERY = {
    operationName: "SignUp",
    query: registerUser,
    variables:{
      username: username,
      password: password,
      email: email
      
    }
  }; 

  return REGISTER_QUERY
}

