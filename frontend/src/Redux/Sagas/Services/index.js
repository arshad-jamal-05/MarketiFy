// Use this function if payload has only text data (no file field) for create record
export async function createRecord(collection, payload) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization:
            localStorage.getItem("token") ??
            import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: JSON.stringify(payload),
      },
    );
    response = await response.json();
    return response?.data;
  } catch (error) {
    console.log(
      `Error While Creating Record in API Calling Services : ${error}`,
    );
    return [];
  }
}

// Use this function if payload has form data (contains atleast 1 file field) for create record
export async function createMultipartRecord(collection, payload) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}`,
      {
        method: "POST",
        headers: {
          authorization:
            localStorage.getItem("token") ??
            import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: payload,
      },
    );
    response = await response.json();
    return response?.data;
  } catch (error) {
    console.log(
      `Error While Creating Record in API Calling Services : ${error}`,
    );
    return [];
  }
}

export async function getRecord(collection) {
  try {
    let url = `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}`;
    if (collection === "cart" || collection === "wishlist" || (localStorage.getItem("role") === "Buyer" && collection === "checkout")){
      url = `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}/user/${localStorage.getItem("userid")}`;
    }
    let response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization:
            localStorage.getItem("token") ??
            import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
      },
    );
    response = await response.json();
    return response?.data;
  } catch (error) {
    console.log(
      `Error While Getting Record in API Calling Services : ${error}`,
    );
    return [];
  }
}

// Use this function if payload has only text data (no file field) for update record
export async function updateRecord(collection, payload) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}/${payload._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization:
            localStorage.getItem("token") ??
            import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: JSON.stringify(payload),
      },
    );
    response = await response.json();
    return response?.data;
  } catch (error) {
    console.log(
      `Error While Updating Record in API Calling Services : ${error}`,
    );
    return [];
  }
}

// Use this function if payload has form data (contains atleast 1 file field) for update record
export async function updateMultipartRecord(collection, payload) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}/${payload.get("_id")}`,
      {
        method: "PUT",
        headers: {
          authorization:
            localStorage.getItem("token") ??
            import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
        body: payload,
      },
    );
    response = await response.json();
    return response?.data;
  } catch (error) {
    console.log(
      `Error While Updating Record in API Calling Services : ${error}`,
    );
    return [];
  }
}

export async function deleteRecord(collection, payload) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_SERVER}/api/${collection}/${payload._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization:
            localStorage.getItem("token") ??
            import.meta.env.VITE_APP_PUBLIC_TOKEN,
        },
      },
    );
    response = await response.json();
    return response?.data;
  } catch (error) {
    console.log(
      `Error While Deleting Record in API Calling Services : ${error}`,
    );
    return [];
  }
}
