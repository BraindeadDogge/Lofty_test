const getJson = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const getJsonData = async () => {
  try {
    const json1 = await getJson("/i/1.json");
    if (!json1.key) {
      throw new Error("No key");
    }

    const json2 = await getJson("/i/2.json");
    return json2.key2;
  } catch (error) {
    console.error(error);
  }
};

getJsonData();
