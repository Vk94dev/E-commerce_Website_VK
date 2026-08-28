import api from "./axios";


// Register User
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get Logged-in User
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  // dispatch(logout());
  return response.data;
};



export const updateProfile = async (formData) => {
  const response = await api.put("/auth/profile", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
  return response.data;
};

/* ==========================================
   PRODUCT APIs
========================================== */

// Get All Products
export const getAllProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });
  return response.data;
};

// Get Product By ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Search Products
export const searchProducts = async (keyword) => {
  const response = await api.get("/products/search", {
    params: {
      keyword,
    },
  });
  return response.data;
};

/* ==========================================
   CATEGORY APIs
========================================== */

// Get All Categories
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};


// contact 

export const contactToAdmin = async (data) => {
  const response = await api.post("/contact", data);
  return response.data;
}





/* ==========================================
   CART APIs
========================================== */

// Get Cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Add To Cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
  });
  console.log("res add to cart =  ", response)

  return response.data;
};

// Update Cart Quantity
export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, {
    quantity,
  });

  return response.data;
};

// Remove Cart Item
export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};

/* ==========================================
   WISHLIST APIs
========================================== */

// Get Wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

// Add Wishlist
export const addWishlistItem = async (productId) => {
  const response = await api.post("/wishlist", {
    productId,
  });
  return response.data;
};

// Remove Wishlist
export const removeWishlistItem = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};


export const moveToCart = async (productId) => {
  const response = await api.post(`/wishlist/move/${productId}`);
  return response.data;
}

/* ==========================================
   ORDER APIs
========================================== */

// Create Order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Get My Orders
export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

// Get Single Order
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.put(`/orders/${id}/cancel`)
  return response.data;
}

/* ==========================================
   PAYMENT APIs
========================================== */

// Create Razorpay Order
export const createPaymentOrder = async (amount) => {
  const response = await api.post("/payment/create-order", {
    amount,
  });
  return response.data;
};

// Verify Payment
export const verifyPaymentAPI = async (paymentData) => {
  const response = await api.post("/payment/verify", paymentData);
  return response.data;
};




// review 

export const getProductReviews = async (productId, page = 1) => {
  const response = await api.get(`/reviews/${productId}?page=${page}&limit=10`)
  return response.data;
}

export const addReview = async (productId, reviewData) => {
  const response = await api.post(`/reviews/${productId}`, reviewData);
  return response.data;
}

export const updateReview = async (productId, reviewData) => {
  const response = await api.put(`/reviews/${productId}`, reviewData);
  return response.data;
}

export const deleteReview = async (productId) => {
  const response = await api.delete(`/reviews/${productId}`);
  return response.data;
}














// admin

export const adminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
}

export const createProduct = async (formData) => {
  try {
    const response = await api.post("/admin/product/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    // console.log(response.data);
    return response.data;
  }
  catch (err) {
    // console.log(err);
    console.log(err.message);
  }
}


export const getAllOrders = async () => {
  const response = await api.get("/orders/admin");
  //  console.log("data = ",response.data)
  return response.data;
}

export const updateOrderStatus = async ({ id, status }) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
}



export const deleteOrder = async (id) => {
  const response = await api.put(`/orders/${id}/cancel`);
  return response.data;
}

export const getAllUsers = async () => {
  const response = await api.get("/admin/users")
  return response.data;
}


export const createCategories = async () => {

}

export const updateProduct = async (id, formData) => {
  const res = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}


