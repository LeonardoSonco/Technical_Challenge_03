
export function restaurantById(idRestaurant:string){
    const getByIdResrautent = `
    query GetRestaurantById($id:ID!) {
      fitMe(id: $id) {
        objectId
        name
        location
        image
        rating
        deliveryTime
        topDishes{
          ... AllDishes
        }
      }
    }
    
    fragment AllDishes on Dish{
      objectId
      name
      description
      price
    }
    `;

     const GET_RESTAURANTS_BY_ID={
        operationName: "GetRestaurantById",
        query: getByIdResrautent,
        variables:{
            id :idRestaurant
        }
      }


      return GET_RESTAURANTS_BY_ID
}



