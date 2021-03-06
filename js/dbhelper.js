/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
	  
	  // const port = 8000 // Change this to your server port
      //return `http://127.0.0.1:8000/js/restaurants.json`;
	   return `http://localhost:1337/restaurants`;
	  
  }
    /**
   * Database URL FOR REVIEWS.    
   */
   static get DATABASE_REVIEWS_URL() {         
       return `http://localhost:1337/reviews/?restaurant_id=`;
   }
    /**
   * Database URL FOR SUBMIT REVIEWS - With POST Parameter.    
   */
    static get DATABASE_SUBMIT_REVIEWS_URL() {
        return `http://localhost:1337/reviews/`;
    }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
          //const restaurants = json.restaurants;
        const restaurants = json;
        callback(null, restaurants);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

    /**
      * Fetch a restaurant reviews by its ID.
    */
    static fetchRestaurantReviewsById(id, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', DBHelper.DATABASE_REVIEWS_URL + id);
        xhr.onload = () => {
            if (xhr.status === 200) { // Got a success response from server!
                const json = JSON.parse(xhr.responseText);
                //const restaurants = json.restaurants;
                const restaurants = json;
                callback(null, restaurants);
            } else { // Oops!. Got an error from server.
                const error = (`Request failed. Returned status of ${xhr.status}`);
                callback(error, null);
            }
        };
        xhr.send();
    }
    /**
     * Post a restaurant reviews.
   */
    static postRestaurantReviewsById(id,name,rating,comments) {
        var data = {};
        data.restaurant_id = id;
        data.name = name;
        data.rating = rating;
        data.comments = comments;
        var json = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", DBHelper.DATABASE_SUBMIT_REVIEWS_URL, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            var review = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "201") {
                console.log(review);
            } else {
                console.error(review);
            }
        }
        xhr.send(json);
    }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
      //return (`http://127.0.0.1:8000/restaurant.html?id=${restaurant.id}`);
      return (`restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
 
   // return (`http://127.0.0.1:8000/img/${restaurant.photograph}`);
      return (`img/${restaurant.photograph}`+ "B.jpg");
    //return (`/restaurant/img/${restaurant.photograph}`);
	// return (``http://127.0.0.1:8000/img/${restaurant.photograph}`);
 
  }
   
    /**
       * Restaurant image URL.
       */
    static imageSrcsetForRestaurant(restaurant) {

        //<img srcset="1.jpg 1920w, 1B.jpg 1400w" src="1C.jpg" />

        return (`img/${restaurant.photograph}` + ".jpg 1920w," + `img/${restaurant.photograph}` + "C.jpg 1400w,");
        

    }

  /**
   * Map marker for a restaurant.
   */
   static mapMarkerForRestaurant(restaurant, map) {
    // https://leafletjs.com/reference-1.3.0.html#marker  
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
      })
      marker.addTo(newMap);
    return marker;
  } 
  /* static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  } */

}
