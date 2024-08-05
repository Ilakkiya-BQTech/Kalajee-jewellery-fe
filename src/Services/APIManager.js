import config from "../config";
const DEFAULT_URL= config.BASE_URL
// const DEFAULT_URL = config.BASE_URL;


export const LoginAPI = async (username, password) => {
  try {
    const requestBody = {
      username: username,
      password: password
    };

    const loginResult = await fetch(DEFAULT_URL + "login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    if (!loginResult.ok) {
      
      throw new Error("Failed to login");
    }

    const resultData = await loginResult.json();
    console.log("Login Successful", resultData);
    return resultData;
  } catch (e) {
    console.error("Error in Login", e);
    return null;
  }
};


export const FetchItemsAPI = async () => {
  try {
    const response = await fetch(`${DEFAULT_URL}items/search`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response) {
      
      throw new Error("Failed to fetch items");
    }

    const resultData = await response.json();
    console.log("Current stock", resultData);
    return resultData;
  } 
   catch (error) {
    console.error('Error in FetchItemsAPI:', error);
    return { error: error.message };
  }
};

export const AllBoxesAPI = async () => {
  try {
    const response = await fetch(DEFAULT_URL + 'boxes/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response) {
      
      throw new Error("Failed to fetch all boxes");
    }

    const resultData = await response.json();
    console.log("Get all boxes api", resultData);
    return resultData;
  } 
   catch (error) {
    console.error('Error in AllBoxesAPI:', error);
    return { error: error.message };
  }
};
export const BoxByIDAPI = async (id) => {
  try {
    const response = await fetch(`${DEFAULT_URL}boxes/${id}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the box");
    }

    const resultData = await response.json();
    console.log("Get box by ID API", resultData);
    return resultData;
  } 
  catch (error) {
    console.error('Error in BoxByIDAPI:', error);
    return { error: error.message };
  }
};

export const UpdateBoxAPI = async (id, itemIds) => {
  try {
    const response = await fetch(`https://kjapi.binarysystems.in/api/v1/boxes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the box");
    }

    const resultData = await response.json();
    console.log("Update box API", resultData);
    return resultData;
  } 
  catch (error) {
    console.error('Error in UpdateBoxAPI:', error);
    return { error: error.message };
  }
};

export const CreateBoxAPI = async (parentId, itemIds, boxDescription) => {
  try {
    const response = await fetch(DEFAULT_URL + 'boxes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parentId: parentId,
        itemIds: itemIds,
        boxDescription: boxDescription
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create box");
    }

    const resultData = await response.json();
    console.log("Box created successfully:", resultData);
    return resultData;
  } catch (error) {
    console.error('Error in CreateBoxAPI:', error);
    return { error: error.message };
  }
};

// export const StockHistoryAPI = async () => {
//   try {
//     const response = await fetch(`${DEFAULT_URL}stock/search`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch all boxes stock history");
//     }

//     const resultData = await response.json();
//     console.log("Get all stockhistory api", resultData);
//     return resultData;
//   } catch (error) {
//     console.error('Error in StockHistoryAPI:', error);
//     return { error: error.message };
//   }
// };

export const StockHistoryAPI = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${DEFAULT_URL}stock/search?p=${page}&l=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch all boxes stock history");
    }

    const resultData = await response.json();
    console.log("Get all stock history API", resultData);
    return resultData;
  } catch (error) {
    console.error('Error in StockHistoryAPI:', error);
    return { error: error.message };
  }
};


export const GetItemsByIDAPI = async (id) => {
  try {
    const response = await fetch(`${DEFAULT_URL}items/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch item details");
    }

    const resultData = await response.json();
    console.log("Get all Item by ID API", resultData);
    return resultData;
  } catch (error) {
    console.error('Error in GetItemsByIDAPI:', error);
    return { error: error.message };
  }
};

export const DownloadPrice = async (itemIds) => {
  try {
    const response = await fetch(`${DEFAULT_URL}prices/download?itemIds=${itemIds.join(',')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const resultData = await response.json();
      console.log("Download Price", resultData);
      return resultData;
    } else {
      throw new Error(`Failed to download price: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in Download price API:', error);
    return { error: error.message };
  }
};
