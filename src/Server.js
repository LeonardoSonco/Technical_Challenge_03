import { ApolloServer, gql } from "apollo-server";
import axios from "axios";

const typeDefs = gql`
  type Query {
    userData: userData
    getRestaurantAll: [Restaurant]
    getDish: [Dish]
    getRestaurantById(id: String!): Restaurant
  }

  type Mutation {
    registerUser(
      username: String!
      password: String!
      email: String!
      fullname: String!
    ): userData

    loginUser(username: String!, password: String!): userData
  }

  type userData {
    objectId: String
    username: String
    password: String
    email: String
    fullname: String
  }

  type Restaurant {
    objectId: String
    name: String
    rating: Float
    deliveryTime: String
    isExpensive: Boolean
    location: String
    image: String
    topDishes: [topdish]
  }

  type topdish {
    objectId: String
  }

  type Dish {
    objectId: String
    name: String
    description: String
    image: String
    price: Float
  }
`;

const headers = {
  "X-Parse-Application-Id": "lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh",
  "X-Parse-REST-API-Key": "8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08",
  "X-Parse-Revocable-Session": "1",
  "Content-Type": "application/json",
};

const resolvers = {
  Query: {
    getRestaurantAll: async () => {
      const url = "https://parseapi.back4app.com/classes/FitMe";

      try {
        const response = await axios.get(url, { headers });
        return response.data.results;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
      }
    },
    getDish: async () => {
      const url = "https://parseapi.back4app.com/classes/Dish";

      try {
        const response = await axios.get(url, { headers });
        return response.data.results;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
      }
    },
    getRestaurantById: async (_, { id }) => {
      const restaurantUrl = `https://parseapi.back4app.com/classes/FitMe/${id}`;

      try {
        const restaurantResponse = await axios.get(restaurantUrl, { headers });
        const restaurantData = restaurantResponse.data;

        return {
          objectId: restaurantData.objectId,
          name: restaurantData.name,
          location: restaurantData.location,
          topDishes: restaurantData.topDishes,
          rating: restaurantData.rating,
          deliveryTime: restaurantData.deliveryTime,
          isExpensive: restaurantData.isExpensive,
        };
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return null;
      }
    },
  },
  Mutation: {
    registerUser: async (_, { username, password, email, fullname }) => {
      const url = "https://parseapi.back4app.com/users";

      try {
        const response = await axios.post(
          url,
          { username, password, email, fullname },
          { headers }
        );
        const userData = response.data;
        return {
          objectId: userData.objectId,
          username: userData.username,
          email: userData.email,
          fullname: userData.fullname,
        };
      } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Error registering user.");
      }
    },
    loginUser: async (_, { username, password }) => {
      const url = "https://parseapi.back4app.com/login";

      try {
        const response = await axios.get(url, {
          params: {
            username: username,
            password: password,
          },
          headers: headers,
        });

        const userData = response.data;
        return {
          objectId: userData.objectId,
          username: userData.username,
          email: userData.email,
          fullname: userData.fullname,
        };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Error logging in.");
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
